"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { deleteCategory, getAllCategory, updateCategory } from '../api/api';
import { Button, Table } from 'react-bootstrap';
import PageContainer from '../components/PageContainer';
import { CategoryArray, CategoryGetResponse, EmptyCategoryGetResponse } from '../api/types/category/getCategory';
import { CategoryPutRequest, CategoryPutResponse, EmptyPutCategoryRequest } from '../api/types/category/putCategory';
import ColorSelector from '../components/ColorSelector';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/message';
import useFormValidation from '../hooks/useFormValidation';
import { CATEGORY } from '../constants/category';
import useApiRequest from '../hooks/useApiRequest';
import useApiRequestWithParamsAndBody from '../hooks/useApiRequestWithParamsAndBody';
import useApiRequestWithParams from '../hooks/useApiRequestWithParams';
import DeleteConfirmModal from '../components/Modal/DeleteConfirmModal';
import { useCategoryContext } from '../contexts/CategoryContext';

const EditCategory = () => {
    const { categories, fetchCategories, loading, error } = useCategoryContext();
    const [editCategory, setEditCategory] = useState<CategoryPutRequest>(EmptyPutCategoryRequest);
    const [deleteCategoryId, setDeleteCategoryId] = useState<number>(0);
    const [deleteCategotyTitle, setDeleteCategoryTitle] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { validate, validationError } = useFormValidation(CATEGORY);

    // カテゴリー更新api
    const {
        success: updateSuccess,
        loading: updateLoading,
        error: updateError,
        apiRequest: updateRequest
    } = useApiRequestWithParamsAndBody<CategoryPutRequest, CategoryPutResponse>({
        requestWithParams: updateCategory,
        validate: validate,
        apiErrorMessage: ERROR_MESSAGES.CATEGORY.EDIT,
    })

    // カテゴリー削除api
    const {
        success: deleteSuccess,
        loading: deleteLoading,
        error: deleteError,
        apiRequest: deleteRequest
    } = useApiRequestWithParams({
        requestWithParams: deleteCategory,
        apiErrorMessage: ERROR_MESSAGES.CATEGORY.DELETE,
    });

    const handleSubmit = async () => {
        await updateRequest(editCategory.id, editCategory);
        setEditCategory(EmptyPutCategoryRequest);
        // 一覧を再取得
        fetchCategories();
    }

    const onDeleteButtonClick = (id: number, title: string) => {
        if(id === 0) {
            return;
        }

        setDeleteCategoryId(id);
        setDeleteCategoryTitle(title);
        setIsModalOpen(true);
    }

    const handleDelete = async () => {
        await deleteRequest(deleteCategoryId);
        setIsModalOpen(false);
        // 一覧を再取得
        fetchCategories();
    }

    return (
        <PageContainer title="Edit Category"
            error={validationError || updateError || deleteError}
            loading={loading || updateLoading || deleteLoading}
            success={updateSuccess ? SUCCESS_MESSAGES.CATEGORY.EDIT
                    : deleteSuccess ? SUCCESS_MESSAGES.CATEGORY.DELETE
                    : ""}
        >
            <Table striped bordered className="mt-4">
                <thead>
                    <tr className="text-center align-middle">
                        <th>Category</th>
                        <th>Description</th>
                        <th>Color</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category: CategoryArray) => (
                        <tr
                            key={category.id}
                            className="text-center align-middle"
                        >
                            {editCategory && editCategory.id === category.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            value={editCategory.title}
                                            className="form-control"
                                            onChange={(e) => setEditCategory({ ...editCategory, title: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="textarea"
                                            value={editCategory.description}
                                            className="form-control"
                                            onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <ColorSelector
                                            color={editCategory.color}
                                            onChange={(color) => setEditCategory({ ...editCategory, color: color })}
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            variant="success"
                                            className="me-2"
                                            onClick={handleSubmit}
                                        >
                                            Save
                                        </Button>
                                        <Button variant="secondary"
                                            onClick={() => setEditCategory(EmptyPutCategoryRequest)}
                                        >
                                            Cancel
                                        </Button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{category.title}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <span
                                            style={{ backgroundColor: category.color }}
                                            className='color-display-edit-page'
                                        >
                                            {category.color}
                                        </span>
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            className="me-2"
                                            onClick={() => setEditCategory({
                                                id: category.id,
                                                title: category.title,
                                                description: category.description,
                                                color: category.color
                                            })}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => onDeleteButtonClick(category.id, category.title)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <DeleteConfirmModal
                title={`カテゴリー【${deleteCategotyTitle}】`}
                isShow={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                handleConfirm={handleDelete}
            />
        </PageContainer>
    );
}

export default EditCategory;