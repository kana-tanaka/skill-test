"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import BaseModal from './BaseModal';

interface DeleteConfirmModalProps {
    title: string
    isShow: boolean
    onClose: () => void;
    handleConfirm: () => void;
}

const DeleteConfirmModal = ({ title, isShow, onClose, handleConfirm }: DeleteConfirmModalProps) => {
    return (
        <BaseModal
            show={isShow}
            onClose={onClose}
            handleConfirm={handleConfirm}
            confirmButtonText='削除'
            closeButtonText='キャンセル'
        >
            <div>
                <p>{title}を削除しますか？</p>
            </div>
        </BaseModal>
    );
}

export default DeleteConfirmModal;