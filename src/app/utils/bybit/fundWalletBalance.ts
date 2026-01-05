import crypto from 'crypto';

const baseUrl = "https://api.bybit.com";
const path = "/v5/asset/transfer/query-asset-info";

export async function getFundingWalletBalance() {
    const apiKey = process.env.BYBIT_API_KEY!;
    const apiSecret = process.env.BYBIT_API_SECRET!;

    const timestamp = Date.now().toString();
    const query = "";

    // Sign (V5 uses timestamp + apiKey + query)
    const sign = crypto
        .createHmac("sha256", apiSecret)
        .update(timestamp + apiKey + query)
        .digest("hex");

    const res = await fetch(baseUrl + path, {
        method: "GET",
        headers: {
            "X-BAPI-API-KEY": apiKey,
            "X-BAPI-TIMESTAMP": timestamp,
            "X-BAPI-SIGN": sign,
            "Content-Type": "application/json",
        }
    });

    const json = await res.json();
    return json.result.list;
}
