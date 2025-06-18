"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';


interface BaseModalProps {
    show: boolean;
    onClose: () => void;
    handleConfirm: () => void;
    children: React.ReactNode;
    modalTitle?: string;
    confirmButtonText: string;
    closeButtonText: string;
}

const BaseModal: React.FC<BaseModalProps> = ({ show, onClose, handleConfirm, children, modalTitle, confirmButtonText, closeButtonText }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            {modalTitle && (
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
            )}
            <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleConfirm}>{confirmButtonText}</Button>
                <Button variant="secondary" onClick={onClose}>{closeButtonText}</Button>
            </Modal.Footer> 
        </Modal>
    );
}

export default BaseModal;