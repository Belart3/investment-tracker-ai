import mongoose from "mongoose";
import { getCredentials } from "@/lib/exchanges/credentials";
import { getWalletBalance } from "@/lib/exchanges/bybit/walletBalance";
import { fetchAssetLivePrice, type AssetLivePrice } from "@/lib/fetchAssetLivePrice";
import { connectDB } from "@/lib/mongodb";
import Asset from "@/models/Asset";
import PortfolioSnapshot from "@/models/PortfolioSnapshot";

function startOfTodayUTC() {
  const now = new Date();

  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
}

function getNumericValue(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

// Today's value of the user's manually added coins (live ones only), at today's prices
async function getManualAssetsValue(userId: string) {
  const assets = await Asset.find({
    userId: new mongoose.Types.ObjectId(userId),
    status: "live",
  })
    .select("symbol quantity")
    .lean<{ symbol: string; quantity: number }[]>();

  if (assets.length === 0) return 0;

  // One price request for all coins; the same coin bought twice is only asked for once
  const symbols = [...new Set(assets.map((asset) => asset.symbol.toUpperCase()))];
  const prices = (await fetchAssetLivePrice(symbols)) as AssetLivePrice[];
  const priceBySymbol = new Map(prices.map((p) => [p.symbol, p.price]));

  return assets.reduce(
    (total, asset) => total + asset.quantity * (priceBySymbol.get(asset.symbol.toUpperCase()) ?? 0),
    0
  );
}

export async function savePortfolioSnapshot(userId: string) {
  await connectDB();

  // This user's own Bybit wallet; no key saved = nothing on an exchange (0)
  const credentials = await getCredentials(userId, "bybit");
  const balance = credentials ? await getWalletBalance(credentials) : null;

  const exchangeValue = getNumericValue(balance?.totalEquity ?? balance?.balance);
  const manualValue = await getManualAssetsValue(userId);
  const totalValue = exchangeValue + manualValue;

  const walletBalance = getNumericValue(balance?.balance);
  const coin = "TOTAL";
  const date = startOfTodayUTC();

  return PortfolioSnapshot.findOneAndUpdate(
    { userId, date },
    {
      userId,
      date,
      totalValue,
      exchangeValue,
      manualValue,
      accountType: balance?.accountType,
      assets: [{ coin, usdValue: totalValue, walletBalance }],
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  ).lean();
}
