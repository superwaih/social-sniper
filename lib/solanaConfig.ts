
export type SolanaNetwork = 'devnet' | 'testnet' | 'mainnet-beta'

const RAW_NETWORK = 'devnet'
export const SOLANA_NETWORK: SolanaNetwork = (['devnet', 'testnet', 'mainnet-beta'].includes(RAW_NETWORK) ? RAW_NETWORK : 'devnet') as SolanaNetwork

const DEVNET_RPC = "https://long-flashy-patina.solana-devnet.quiknode.pro/88754286db969388515b45ac335d28cf9fde6008";
const MAINNET_RPC = "https://rough-stylish-waterfall.solana-mainnet.quiknode.pro/b2e47d45f95fa1cfc6d6e8f3c07fe9af03157103";
export const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || (
  SOLANA_NETWORK === 'devnet' ? DEVNET_RPC :
  MAINNET_RPC
)


const GLOBAL_USDC = process.env.NEXT_PUBLIC_USDC_MINT
const DEV_USDC = "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"

const MAIN_USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"

export const USDC_MINT = GLOBAL_USDC || (
  SOLANA_NETWORK === 'devnet' ? DEV_USDC :
  
  (MAIN_USDC)
)

// Treasury / recipient address selection. Use network-specific env vars first.
const GLOBAL_TREASURY = "9rh2xdaq364PTgUuxdkVTLJZbq4fxzSCySFSjBvj8JPA"
const DEV_TREASURY = "9rh2xdaq364PTgUuxdkVTLJZbq4fxzSCySFSjBvj8JPA"
const TEST_TREASURY = "9rh2xdaq364PTgUuxdkVTLJZbq4fxzSCySFSjBvj8JPA"
const MAIN_TREASURY = "9rh2xdaq364PTgUuxdkVTLJZbq4fxzSCySFSjBvj8JPA"

export const TREASURY_ADDRESS = GLOBAL_TREASURY || (
  SOLANA_NETWORK === 'devnet' ? (DEV_TREASURY || '') :
  SOLANA_NETWORK === 'testnet' ? (TEST_TREASURY || '') :
  (MAIN_TREASURY || '')
)

export const IS_DEVNET = SOLANA_NETWORK === 'devnet'


export const NETWORK_NAME = SOLANA_NETWORK

