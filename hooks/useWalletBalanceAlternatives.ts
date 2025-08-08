import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, Connection } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useCallback } from 'react';

// Method 1: Current implementation (already in use)
export const useWalletBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const { data: balance, isLoading, error, refetch } = useQuery({
    queryKey: ['wallet-balance', publicKey?.toBase58()],
    queryFn: async () => {
      if (!publicKey) return 0;
      
      try {
        const lamports = await connection.getBalance(publicKey);
        return lamports / LAMPORTS_PER_SOL;
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
        throw error;
      }
    },
    enabled: !!publicKey,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });

  const formatBalance = (balance: number) => {
    return balance.toFixed(4);
  };

  return {
    balance: balance || 0,
    formattedBalance: formatBalance(balance || 0),
    isLoading,
    error,
    refetch,
  };
};

// Method 2: Real-time balance with WebSocket (more advanced)
export const useRealTimeWalletBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!publicKey) return;
    
    setIsLoading(true);
    try {
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / LAMPORTS_PER_SOL);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching balance:', err);
    } finally {
      setIsLoading(false);
    }
  }, [connection, publicKey]);

  useEffect(() => {
    if (!publicKey) return;

    // Initial fetch
    fetchBalance();

    // Subscribe to account changes for real-time updates
    const subscriptionId = connection.onAccountChange(
      publicKey,
      (accountInfo) => {
        const newBalance = accountInfo.lamports / LAMPORTS_PER_SOL;
        setBalance(newBalance);
      },
      'confirmed'
    );

    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [connection, publicKey, fetchBalance]);

  const formatBalance = (balance: number) => {
    return balance.toFixed(4);
  };

  return {
    balance,
    formattedBalance: formatBalance(balance),
    isLoading,
    error,
    refetch: fetchBalance,
  };
};

// Method 3: Simple fetch function (non-reactive)
export const fetchWalletBalance = async (
  connection: Connection,
  publicKey: PublicKey
): Promise<number> => {
  try {
    const lamports = await connection.getBalance(publicKey);
    return lamports / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    throw error;
  }
};

// Method 4: Balance with multiple denominations
export const useDetailedWalletBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const { data, isLoading, error } = useQuery({
    queryKey: ['detailed-wallet-balance', publicKey?.toBase58()],
    queryFn: async () => {
      if (!publicKey) return null;
      
      try {
        const lamports = await connection.getBalance(publicKey);
        const sol = lamports / LAMPORTS_PER_SOL;
        
        return {
          lamports,
          sol,
          formattedSol: sol.toFixed(4),
          formattedSolShort: sol.toFixed(2),
          usdEstimate: sol * 100, // You'd get real SOL price from an API
        };
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
        throw error;
      }
    },
    enabled: !!publicKey,
    refetchInterval: 30000,
    staleTime: 10000,
  });

  return {
    balanceData: data,
    isLoading,
    error,
  };
};

// Method 5: Using native JavaScript/Web3.js without React Query
export const useSimpleWalletBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!publicKey) return;
    
    setIsLoading(true);
    try {
      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoading(false);
    }
  }, [connection, publicKey]);

  useEffect(() => {
    fetchBalance();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, [fetchBalance]);

  return {
    balance,
    formattedBalance: balance.toFixed(4),
    isLoading,
    refetch: fetchBalance,
  };
};
