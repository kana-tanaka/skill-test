"use client";

import { useState } from "react";
type RequestFunction<T, P> = (params: P) => Promise<T>;

interface RequestParams<T, P> {
    requestWithParams: RequestFunction<T,P>;
    apiErrorMessage: string;
}

const useApiRequestWithParams = <T, P = any>({
    requestWithParams,
    apiErrorMessage
}: RequestParams<T, P>) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const apiRequest = async (params: P) => {
        setLoading(true);
        setError("");
        setSuccess(false);
        
        // APIリクエストを実行する
        try {
            const response = await requestWithParams(params);
            setSuccess(true);
            setError("");
            return response;
        } catch (err) {
            setError(apiErrorMessage);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return { success, loading, error, apiRequest };
}

export default useApiRequestWithParams;