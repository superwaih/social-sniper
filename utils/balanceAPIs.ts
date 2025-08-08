// Alternative: Using external APIs for balance checking

// Method 1: Using Solana RPC directly
export const getBalanceViaRPC = async (publicKey: string) => {
  try {
    const response = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [publicKey]
      })
    });
    
    const data = await response.json();
    const lamports = data.result.value;
    return lamports / 1000000000; // Convert to SOL
  } catch (error) {
    console.error('Error fetching balance via RPC:', error);
    throw error;
  }
};

// Method 2: Using Solscan API (external service)
export const getBalanceViaSolscan = async (publicKey: string) => {
  try {
    const response = await fetch(`https://public-api.solscan.io/account/${publicKey}`);
    const data = await response.json();
    return data.lamports / 1000000000; // Convert to SOL
  } catch (error) {
    console.error('Error fetching balance via Solscan:', error);
    throw error;
  }
};

// Method 3: Using Helius API (if you have an API key)
export const getBalanceViaHelius = async (publicKey: string, apiKey: string) => {
  try {
    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [publicKey]
      })
    });
    
    const data = await response.json();
    return data.result.value / 1000000000; // Convert to SOL
  } catch (error) {
    console.error('Error fetching balance via Helius:', error);
    throw error;
  }
};
