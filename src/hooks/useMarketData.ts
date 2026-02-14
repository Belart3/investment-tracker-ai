'use client';
import useSWR from 'swr';
import {getMarketData} from '@/lib/getMarketData';

// SWR fetcher
const fetcher = async () => {
    const res = await getMarketData();
    return res;
};

export function useMarketData() {
    const { data, error, isLoading, mutate } = useSWR(
        '/api/liveMarketData', // key for SWR cache
        fetcher,
        {
        refreshInterval: 120000, // 2 minutes
        revalidateOnFocus: false, // don't refetch on window focus
        dedupingInterval: 120000, // prevent duplicate fetches
        }
    );

    return {
        data: data ?? [],
        loading: isLoading,
        error,
        refresh: mutate, // manual refresh if needed
    };
}
