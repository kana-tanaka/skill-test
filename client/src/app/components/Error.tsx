"use client";

import { Alert } from "react-bootstrap";

interface ErrorInterface {
    errorMessage: string;
}
const Error = ({ errorMessage }: ErrorInterface) => {
    return (
        <Alert variant="danger">
            {errorMessage}
        </Alert>
    );
}

export default Error;