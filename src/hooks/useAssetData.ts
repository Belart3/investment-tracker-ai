import { useCallback, useEffect, useState } from "react";

export type AssetData = {
	_id: string;
	userId: string;
	symbol: string;
	quantity: number;
	purchasePrice: number;
	transactionDate: string;
	notes?: string;
	status: "live" | "closed" | "deleted";
	createdAt: string;
	updatedAt: string;
};

type AssetsResponse = AssetData[] | { error: string };

export function useAssetData() {
	const [assets, setAssets] = useState<AssetData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const loadAssets = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/assets", {
				cache: "no-store",
			});
			const data = (await response.json()) as AssetsResponse;

			if (!response.ok || !Array.isArray(data)) {
				throw new Error("error" in data ? data.error : "Failed to fetch assets");
			}

			setAssets(data);
		} catch (err) {
			setError(err instanceof Error ? err : new Error("Failed to fetch assets"));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadAssets();
	}, [loadAssets]);

	return {
		assets,
		loading,
		error,
		refresh: loadAssets,
	};
}
