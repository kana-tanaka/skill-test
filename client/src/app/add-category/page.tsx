"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ColorSelector from '../components/ColorSelector';
import PageContainer from '../components/PageContainer';
import { CATEGORY } from '../constants/category';
import useFormValidation from '../hooks/useFormValidation';
import { postCategory } from '../api/api';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/message';
import useApiRequestWithBody from '../hooks/useApiRequestWithBody';
import { CategoryPostRequest, CategoryPostResponse } from '../api/types/category/postCategory';

const AddCategory = () => {
    const DEFAULT_COLOR = "#ffffff";
    const apiErrorMessage = ERROR_MESSAGES.CATEGORY.ADD;
    const apiSuccessMessage = SUCCESS_MESSAGES.CATEGORY.ADD;
    const [color, setColor] = useState<string>(DEFAULT_COLOR);
    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryDescription, setCategoryDescription] = useState<string>("");
    const { validate, validationError } = useFormValidation(CATEGORY);
    const { success, loading, error, apiRequest } = useApiRequestWithBody<CategoryPostRequest, CategoryPostResponse>({
        requestWithBody: postCategory,
        validate: validate,
        apiErrorMessage: apiErrorMessage
    })

    const handleColorChange = (color: string) => {
        setColor(color);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await apiRequest({
            title: categoryName,
            description: categoryDescription,
            color: color
        });
        setColor(DEFAULT_COLOR);
        setCategoryDescription("");
        setCategoryName("");
    }

    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <PageContainer
            title="Add Category"
            description="Todoリストのカテゴリーを追加してください"
            error={validationError || error}
            loading={loading}
            success={success ? apiSuccessMessage : ""}
        >
            <Form className="p-4 border rounded bg-light" style={{ minWidth: '400px' }} onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formCategoryName">
                    <Form.Label className="mb-3">Category Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter category name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formCategoryDescription">
                    <Form.Label className="mb-3">Category Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter category description"
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCategoryColur">
                    <Form.Label className="mb-3">Category Color</Form.Label>
                    <ColorSelector
                        color={color}
                        onChange={handleColorChange}
                    />
                </Form.Group>

                <div className="text-center mt-4">
                    <Button variant="secondary" type="submit">
                        Add Category
                    </Button>
                </div>
            </Form>
        </PageContainer>
    )
}

export default AddCategory;