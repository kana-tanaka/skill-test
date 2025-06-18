"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row } from 'react-bootstrap';
import BaseModal from './Modal/BaseModal';
import { SketchPicker } from 'react-color';
import { useState } from 'react';

interface ColorSelectorProps {
    onChange: (color: string) => void;
    color: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ onChange, color }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // モーダル内で選択された一時的な色を保持する
    const [tempColor, setTempColor] = useState<string>(color);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    // モーダル内でselectボタンが押下された場合は、選択された色を確定する
    const handleColorConfirm = () => {
        onChange(tempColor);
        setIsModalOpen(false);
    };

    // モーダル内でキャンセルボタンが押下された場合は、色を変更しない
    const handleCancel = () => {
        setTempColor(color);
        setIsModalOpen(false);
    };
    

    return (
        <>
        <Row
            className="align-items-center"
            style={{ cursor: "pointer" }}
        >
            <Col xs="auto">
                <div
                    className="color-preview"
                    style={{ backgroundColor: color }}
                    onClick={toggleModal}
                />
            </Col>
            <Col>
                <Form.Control
                    type="text"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                />
            </Col>
        </Row>
        <BaseModal 
            show={isModalOpen}
            onClose={handleCancel}
            handleConfirm={handleColorConfirm}
            modalTitle="Select Color"
            confirmButtonText="Select"
            closeButtonText="Close"
        >
            <SketchPicker
                color={tempColor}
                onChangeComplete={(color) => setTempColor(color.hex)}
                onChange={(color) => setTempColor(color.hex)}
            />
        </BaseModal>
        </>
    );
}

export default ColorSelector;