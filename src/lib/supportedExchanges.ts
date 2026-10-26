// Every exchange the app knows about. Only those with `available: true` can be
// connected; the rest show as "Coming soon". To launch one, build its integration
// and flip `available` to true here. Logos live in components/ui/ExchangeLogo.tsx.
export const SUPPORTED_EXCHANGES = [
    { id: 'bybit', name: 'Bybit', available: true },
    { id: 'binance', name: 'Binance', available: false },
    { id: 'okx', name: 'OKX', available: false },
    { id: 'kucoin', name: 'KuCoin', available: false },
    { id: 'coinbase', name: 'Coinbase', available: false },
    { id: 'gateio', name: 'Gate.io', available: false },
] as const

// 'bybit' | 'binance' | 'okx' | ...
export type ExchangeId = (typeof SUPPORTED_EXCHANGES)[number]['id']
