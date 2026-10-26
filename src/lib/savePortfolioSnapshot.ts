import { getCredentials } from "@/lib/exchanges/credentials";
import { getWalletBalance } from "@/lib/exchanges/bybit/walletBalance";
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

  // This user's own Bybit wallet; no key saved = nothing on an exchange (0)
  const credentials = await getCredentials(userId, "bybit");
  const balance = credentials ? await getWalletBalance(credentials) : null;

  const totalValue = getNumericValue(
    balance?.totalEquity ?? balance?.balance
  );
  const walletBalance = getNumericValue(balance?.balance);
  const coin = "TOTAL";
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
