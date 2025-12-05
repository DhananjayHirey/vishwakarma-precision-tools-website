import { useState, useCallback } from "react";

export function useApi<T = any>(apiFunc: (...args: any[]) => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const call = useCallback(async (...params: any[]) => {
        setLoading(true);
        setError(null);

        try {
            const res = await apiFunc(...params);
            setData(res);
            console.log("Data received",res);
            
            return res; // still returns result if needed
        } catch (err: any) {
            console.log("API call error: ",err);
            
            setError(err || "Something went wrong");
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunc]);

    return { call, data, loading, error };
}
