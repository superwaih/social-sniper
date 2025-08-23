import { RPC_URL } from '@/lib/solanaConfig';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, Connection } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';


export const useWalletBalance = () => {
  const { publicKey } = useWallet();
  // Use the provided Solana RPC endpoint
  const rpcUrl = RPC_URL
  const connection = new Connection(rpcUrl, 'confirmed');

  const { data: balance, isLoading, error } = useQuery({
    queryKey: ['wallet-balance', publicKey?.toBase58()],
    queryFn: async () => {
      if (!publicKey) return 0;
      try {
        const lamports = await connection.getBalance(new PublicKey(publicKey));
        return lamports / LAMPORTS_PER_SOL;
    } catch (error) {
        console.error('Error fetching wallet balance:', error);
        throw error;
      }
    },
    enabled: !!publicKey,
    staleTime: 1000000, // Consider data stale after 1000 seconds
  });

  const formatBalance = (balance: number) => {
    return balance.toFixed(4);
  };

  return {
    balance: balance || 0,
    formattedBalance: formatBalance(balance || 0),
    isLoading,
    error,
  };
};
