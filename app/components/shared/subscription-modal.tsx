"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { PublicKey, Transaction } from "@solana/web3.js"
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
} from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2, ShieldCheck, Wallet2, ArrowRight, Lock } from "lucide-react"
import { useAuthStore } from "@/store/store"
import { USDC_MINT, TREASURY_ADDRESS } from "@/lib/solanaConfig"
import { useLoginFn, useMakeSubscription } from "@/service/user"
import { setToken } from "@/service/token"
import { shortenAddress } from "@/utils/constants"
import useTokenBalance from '@/hooks/useTokenBalance'

type Plan = "SNIPER BASIC" | "SNIPER PRO"

const PLAN_PRICES_USDC: Record<Plan, number> = {
  "SNIPER BASIC": 25,
  "SNIPER PRO": 50,
}

// USDC decimals (same across networks)
const USDC_DECIMALS = 6

interface SubscriptionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan: Plan | null
}

function Modal({ open, onOpenChange, children, className }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode; className?: string }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const modal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => onOpenChange(false)} />
      <div className={`relative mx-4 w-full max-w-2xl rounded-md ${className ?? ''}`} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  )

  if (typeof window === 'undefined') return null
  return createPortal(modal, document.body)
}

export default function SubscriptionModal({ open, onOpenChange, plan }: SubscriptionModalProps) {
  const router = useRouter()
  const { publicKey, connected, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const { hasLoggedIn, setLoggedIn, setPublicKey } = useAuthStore()
  const { mutateAsync: loginFn, isPending: loggingIn } = useLoginFn()
  const { mutateAsync: subscribeFn, isPending: subscribing } = useMakeSubscription()

  const [referral, setReferral] = useState("")
  const [isPaying, setIsPaying] = useState(false)
  const [treasuryValid, setTreasuryValid] = useState<boolean>(true)

  const { balance: usdcBalance, refetch: refetchUsdc } = useTokenBalance(publicKey ?? null, USDC_MINT, true)
  const priceUsdc = useMemo(() => (plan ? PLAN_PRICES_USDC[plan] : 0), [plan])

  const insufficientUSDC = useMemo(() => connected && priceUsdc > 0 && usdcBalance < priceUsdc, [connected, priceUsdc, usdcBalance])

  useEffect(() => {
    if (!TREASURY_ADDRESS) {
      setTreasuryValid(false)
      return
    }
    try {
      void new PublicKey(TREASURY_ADDRESS)
      setTreasuryValid(true)
    } catch {
      setTreasuryValid(false)
    }
  }, [])

 
  useEffect(() => {
   
  if (connected && publicKey && !hasLoggedIn) {
     const data = {
      publicKey: publicKey.toBase58()
    };
     loginFn(data, {
          onSuccess: (res) => {
            toast.success(res?.message || 'Login successful');
            setLoggedIn(true);
            console.log(res?.token)
            setToken(res?.token, 7)
                  const pubKeyStr = publicKey.toBase58();
          setPublicKey(pubKeyStr);
          },
          onError: (err) => {
            console.error('Login error', err);
            toast.error('An error occurred during login');
          }
        });
  }
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, publicKey])

  const pay = useCallback(async () => {
    if (!plan) return
    if (!connected || !publicKey) {
      toast.message("Connect your wallet to continue")
      return
    }
    setIsPaying(true)
    try {
      const recipient = new PublicKey(TREASURY_ADDRESS)
      const mint = new PublicKey(USDC_MINT)

      const amount = BigInt(priceUsdc * 10 ** USDC_DECIMALS)

      const tx = new Transaction()

      // Derive ATAs
      const userAta = await getAssociatedTokenAddress(mint, publicKey)
      const recipientAta = await getAssociatedTokenAddress(mint, recipient)

      // Ensure ATAs exist
      const [userAtaInfo, recipientAtaInfo] = await connection.getMultipleAccountsInfo([
        userAta,
        recipientAta,
      ])

      if (!userAtaInfo) {
        // Create user ATA (user pays)
        tx.add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            userAta,
            publicKey,
            mint
          )
        )
      }

      if (!recipientAtaInfo) {
        // Create recipient ATA (user pays for creation)
        tx.add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            recipientAta,
            recipient,
            mint
          )
        )
      }

      // Optional: pre-check user's USDC balance, and cache to UI
      try {
        const bal = await connection.getTokenAccountBalance(userAta)
        const uiAmount = bal?.value?.uiAmount || 0
        // setUsdcBalance(uiAmount)
        if (uiAmount < priceUsdc) {
          toast.error("Insufficient USDC balance")
          setIsPaying(false)
          return
        }
      } catch {
        // ignore; will fail on transfer anyway
      }

     
      tx.add(
        createTransferInstruction(
          userAta,
          recipientAta,
          publicKey,
          amount
        )
      )

      const sig = await sendTransaction(tx, connection, { skipPreflight: false })
  const latest = await connection.getLatestBlockhash()
  await connection.confirmTransaction({ signature: sig, ...latest }, "confirmed")

      toast.success("Payment confirmed on-chain")

      // Notify backend
      subscribeFn({ signature: sig, plan: "pro", referralCode: referral, publicKey: publicKey.toBase58() },{
        onSuccess: () =>{
      toast.success("Subscription activated")
  onOpenChange(false)
      router.push("/overview")
        },
        onError: () =>{
          toast.error('An Error Occurred')
        }
      })

    
    } catch (e: unknown) {
      console.error(e)
      const msg = e instanceof Error ? e.message : "Payment failed"
      toast.error(msg)
    } finally {
      setIsPaying(false)
    }
  }, [connected, connection, onOpenChange, plan, priceUsdc, publicKey, referral, router, sendTransaction, subscribeFn])

  // Fetch USDC balance when wallet connects or modal opens/plan changes
  useEffect(() => {
    
    if (publicKey) void refetchUsdc()
  }, [publicKey, connected, plan, open, refetchUsdc])
console.log(usdcBalance, 'usdc balance')
  return (
    <Modal open={open} onOpenChange={onOpenChange} className="bg-[#050d12] border border-[#FFFFFF12] text-white sm:max-w-2xl">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-xl flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#ff4c02]" />
            <span>{plan ? `Confirm ${plan}` : "Select a plan"}</span>
          </div>
          <button aria-label="Close" onClick={() => onOpenChange(false)} className="text-white opacity-80 hover:opacity-100">✕</button>
        </div>

        <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Summary */}
          <div className="rounded-lg border border-[#FFFFFF24] bg-[#0b141a] p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-70">Plan</p>
                <p className="font-semibold">{plan ?? '-'}</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-70">Amount</p>
                <p className="font-semibold flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-[#FFFFFF24] text-[10px]">$</span>
                  {priceUsdc} USDC
                </p>
              </div>
            </div>
            <div className="h-px bg-[#FFFFFF14]" />
            {connected ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2 opacity-80">
                    <Wallet2 className="w-4 h-4" /> Wallet
                  </span>
                  <span className="font-mono opacity-90">{shortenAddress(publicKey?.toBase58() ?? '')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-80">USDC Balance</span>
                  <span className={insufficientUSDC ? 'text-red-400' : 'opacity-90'}>{usdcBalance.toFixed(2)} USDC</span>
                </div>
                {/* <div className="flex items-center justify-between text-sm">
                  <span className="opacity-80">Recipient</span>
                  <span className="font-mono opacity-90">{treasuryValid ? shortenAddress(TREASURY_ADDRESS) : 'Not configured'}</span>
                </div> */}
                <div className="flex items-center gap-2 text-[11px] opacity-70">
                  <Lock className="w-3 h-3" />
                  Payment is secured on Solana; a small SOL network fee applies.
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <p className="opacity-80">Connect your wallet to proceed with payment.</p>
                <WalletMultiButton className="rounded-md border text-white hover:opacity-90 transition uppercase flex gap-3 items-center px-4 py-2" />
                {loggingIn && (
                  <div className="mt-1 flex items-center gap-2 text-xs opacity-80">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Syncing session…</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="rounded-lg border border-[#FFFFFF24] bg-[#0b141a] p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-xs opacity-80">Referral code (optional)</label>
              <Input
                placeholder="Enter referral code"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                className="bg-transparent border-[#FFFFFF24] focus-visible:ring-0 text-white"
              />
              {!treasuryValid && (
                <p className="text-xs text-red-400">Treasury address is not configured. Set NEXT_PUBLIC_TREASURY_ADDRESS.</p>
              )}
              {insufficientUSDC && (
                <p className="text-xs text-red-400">You don’t have enough USDC for this payment.</p>
              )}
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="text-sm opacity-80">Total due</div>
              <div className="font-semibold flex items-center gap-2">{priceUsdc} USDC</div>
            </div>
            <div className="h-px bg-[#FFFFFF14]" />

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => onOpenChange(false)} className="w-1/3 bg-transparent border border-[#FFFFFF24] text-white hover:bg-white/10">Cancel</Button>
              <Button
                onClick={pay}
                disabled={!connected || isPaying || subscribing || !plan || !treasuryValid || insufficientUSDC}
                className="w-2/3 bg-[#ff4c02] hover:bg-[#e63d00] text-white"
              >
                {isPaying || subscribing ? (
                  <span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Processing…</span>
                ) : (
                  <span className="inline-flex items-center gap-2">Pay {priceUsdc} USDC <ArrowRight className="w-4 h-4" /></span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
