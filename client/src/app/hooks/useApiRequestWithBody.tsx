"use client";

import { useState } from "react";
type RequestFunction<Req, Res> = (body: Req) => Promise<Res>;
type ValidateFunction<Req> = (data: Req) => boolean;

interface RequestParams<Req, Res> {
    requestWithBody: RequestFunction<Req, Res>;
    validate: ValidateFunction<Req>;
    apiErrorMessage: string;
}

const useApiRequestWithBody = <Req, Res>({
    requestWithBody,
    validate,
    apiErrorMessage
}: RequestParams<Req, Res>) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const apiRequest = async (body: Req) => {
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
            const response = await requestWithBody(body);
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

export default useApiRequestWithBody;