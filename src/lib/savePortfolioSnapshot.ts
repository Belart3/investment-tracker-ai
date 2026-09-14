import { unifiedWalletBalance } from "@/app/utils/bybit/unifiedWalletBalance";
import { connectDB } from "@/lib/mongodb";
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

export async function savePortfolioSnapshot(userId: string) {
  await connectDB();

  const balance = await unifiedWalletBalance();
  const totalValue = getNumericValue(
    balance?.totalEquity ?? balance?.balance
  );
  const walletBalance = getNumericValue(balance?.balance);
  const coin = typeof balance?.asset === "string" ? balance.asset : "TOTAL";
  const date = startOfTodayUTC();

  return PortfolioSnapshot.findOneAndUpdate(
    { userId, date },
    {
      userId,
      date,
      totalValue,
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
