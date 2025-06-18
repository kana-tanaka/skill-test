"use client";

import { useEffect, useState } from "react";
type RequestFunction<T> = () => Promise<T>;

interface RequestParams<T> {
    request: RequestFunction<T>;
    initialData: T,
    apiErrorMessage: string;
    observer?: any;
}

const useApiRequest = <T>({
    request,
    initialData,
    apiErrorMessage,
    observer = []
}: RequestParams<T>) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T>(initialData)
    const [error, setError] = useState<string>("");

    const apiRequest = async () => {
        setLoading(true);
        setError("");
        
        // APIリクエストを実行する
        try {
            const response = await request();
            setData(response);
            setError("");
        } catch (err) {
            setError(apiErrorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        apiRequest();
    }, observer)

    return { data, loading, error, apiRequest };
}

export default useApiRequest;