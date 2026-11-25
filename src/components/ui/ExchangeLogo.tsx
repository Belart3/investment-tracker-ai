import {
    ExchangeBinance,
    ExchangeBybit,
    ExchangeCoinbase,
    ExchangeGateIo,
    ExchangeKucoin,
    ExchangeOkx,
    type IconComponent,
} from '@web3icons/react'
import type { ExchangeId } from '@/lib/supportedExchanges'

// Official exchange logos from @web3icons. `satisfies` makes TypeScript complain
// if an exchange is added to supportedExchanges.ts without a logo here.
const LOGOS = {
    bybit: ExchangeBybit,
    binance: ExchangeBinance,
    okx: ExchangeOkx,
    kucoin: ExchangeKucoin,
    coinbase: ExchangeCoinbase,
    gateio: ExchangeGateIo,
} satisfies Record<ExchangeId, IconComponent>

type Props = {
    id: ExchangeId
    size?: number
    className?: string
}

const ExchangeLogo = ({ id, size = 36, className = '' }: Props) => {
    const Logo = LOGOS[id]
    // 'background' = the brand's own colour behind the mark, so every logo reads as a tile
    return <Logo variant='background' size={size} className={`shrink-0 rounded-[9px] ${className}`} aria-hidden />
}

export default ExchangeLogo
