"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { PublicKey, Transaction } from "@solana/web3.js"
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
} from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2, ShieldCheck, Wallet2, ArrowRight, Lock } from "lucide-react"
import { useAuthStore } from "@/store/store"
import { useLoginFn, useMakeSubscription } from "@/service/user"
import { setToken } from "@/service/token"
import { shortenAddress } from "@/utils/constants"

type Plan = "SNIPER BASIC" | "SNIPER PRO"

const PLAN_PRICES_USDC: Record<Plan, number> = {
  "SNIPER BASIC": 25,
  "SNIPER PRO": 50,
}

// Treasury / recipient address for receiving payments
const TREASURY_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_ADDRESS || "qoALXCmcmtDkPJ7wCpfHTY9deYmNnfQeNaU3Q1nyAz8"
const USDC_MINT = process.env.NEXT_PUBLIC_USDC_MINT || "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" // Mainnet USDC
const USDC_DECIMALS = 6

interface SubscriptionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan: Plan | null
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
  const [usdcBalance, setUsdcBalance] = useState<number>(0)
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

  // Ensure user is server-logged-in when wallet connects
  useEffect(() => {
    const doLogin = async () => {
      if (connected && publicKey && !hasLoggedIn) {
        try {
          const res = await loginFn({ publicKey: publicKey.toBase58() })
          if (res?.token) {
            setToken(res.token, 7)
          }
          setLoggedIn(true)
          setPublicKey(publicKey.toBase58())
        } catch (e: unknown) {
          console.error(e)
          const msg = e instanceof Error ? e.message : "Login failed"
          toast.error(msg)
        }
      }
    }
    doLogin()
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
        setUsdcBalance(uiAmount)
        if (uiAmount < priceUsdc) {
          toast.error("Insufficient USDC balance")
          setIsPaying(false)
          return
        }
      } catch {
        // ignore; will fail on transfer anyway
      }

      // Transfer USDC
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
      await subscribeFn({ signature: sig, plan, referralCode: referral })
      toast.success("Subscription activated")

      onOpenChange(false)
      router.push("/overview")
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
    const fetchBalance = async () => {
      try {
        if (!connected || !publicKey) return setUsdcBalance(0)
        const mint = new PublicKey(USDC_MINT)
        const ata = await getAssociatedTokenAddress(mint, publicKey)
        const info = await connection.getAccountInfo(ata)
        if (!info) return setUsdcBalance(0)
        const bal = await connection.getTokenAccountBalance(ata)
        setUsdcBalance(bal?.value?.uiAmount || 0)
      } catch {
        setUsdcBalance(0)
      }
    }
    fetchBalance()
  }, [connected, publicKey, plan, open, connection])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#050d12] border border-[#FFFFFF12] text-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#ff4c02]" />
            {plan ? `Confirm ${plan}` : "Select a plan"}
          </DialogTitle>
        </DialogHeader>

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
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-80">Recipient</span>
                  <span className="font-mono opacity-90">{treasuryValid ? shortenAddress(TREASURY_ADDRESS) : 'Not configured'}</span>
                </div>
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
              <DialogClose asChild>
                <Button variant="secondary" className="w-1/3 bg-transparent border border-[#FFFFFF24] text-white hover:bg-white/10">Cancel</Button>
              </DialogClose>
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
      </DialogContent>
    </Dialog>
  )
}
