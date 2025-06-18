"use client";

import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loading: React.FC = () => {
    return (
        <div className="loadingOverlay">
            <Spinner animation="border" role="status" variant="primary" />
        </div>
    );
};

export default Loading;