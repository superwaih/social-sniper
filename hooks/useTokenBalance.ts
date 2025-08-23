import { useQuery } from '@tanstack/react-query'
import { Connection, PublicKey } from '@solana/web3.js'
import { getAssociatedTokenAddress } from '@solana/spl-token'
import { RPC_URL } from '@/lib/solanaConfig'

/**
 * Hook: useTokenBalance
 * - Fetches the token balance (uiAmount) for a wallet + mint using the associated token account.
 * - Returns { balance, isLoading, error, refetch }
 */
export const useTokenBalance = (
  owner?: PublicKey | null,
  mintAddress?: string,
  enabled = true
) => {
  const connection = new Connection(RPC_URL, 'confirmed')

  const queryKey = ['token-balance', owner?.toBase58?.(), mintAddress]

  const result = useQuery({
    queryKey,
    queryFn: async () => {
      if (!owner || !mintAddress) return 0
      try {
        
        const mint = new PublicKey(mintAddress)
        const ata = await getAssociatedTokenAddress(mint, owner)
        const bal = await connection.getTokenAccountBalance(ata)
        return bal?.value?.uiAmount || 0
      } catch {
        // If ATA doesn't exist or RPC returns an error, treat as zero balance
        return 0
      }
    },
    enabled: !!owner && !!mintAddress && !!enabled,
    staleTime: 30_000,
  })

  return {
    balance: result.data || 0,
    isLoading: result.isLoading,
    error: result.error,
    refetch: result.refetch,
  }
}

export default useTokenBalance
