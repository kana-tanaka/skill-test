"use client";

import { useState } from "react";
type RequestFunction<Req, Res, P = any> = (params: P, body: Req) => Promise<Res>;
type ValidateFunction<Req> = (data: Req) => boolean;

interface RequestParams<Req, Res, P = any> {
    requestWithParams: RequestFunction<Req, Res, P >;
    validate: ValidateFunction<Req>;
    apiErrorMessage: string;
}

const useApiRequestWithParamsAndBody = <Req, Res, P = any>({
    requestWithParams,
    validate,
    apiErrorMessage
}: RequestParams<Req, Res, P>) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const apiRequest = async (params: P, body: Req) => {
        setLoading(true);
        setError("");
        setSuccess(false);

        // バリデーションが必要な場合は、データを検証する
        if (!validate(body)) {
            setLoading(false);
            return;
        }
        
        // APIリクエストを実行する
        try {
            const response = await requestWithParams(params, body);
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

export default useApiRequestWithParamsAndBody;