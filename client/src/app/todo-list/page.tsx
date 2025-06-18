"use client";

import PageContainer from "../components/PageContainer";
import TodoInput from "../components/Todo/TodoInput";
import TodoNav from "../components/Todo/TodoNav";
import { POST_TODO } from "../constants/todo";
import { useCategoryContext } from "../contexts/CategoryContext";
import { useSelectedCategoryContext } from "../contexts/SelectedCategoryContext";
import useFormValidation from "../hooks/useFormValidation";
import useApiRequestWithBody from "../hooks/useApiRequestWithBody";
import { getTodoList, postTodo } from "../api/api";
import { ERROR_MESSAGES } from "../constants/message";
import useApiRequestWithParams from "../hooks/useApiRequestWithParams";
import { get } from "http";
import { useEffect, useState } from "react";
import List from "../components/Todo/List";
import { EmptyTodoGetResponse } from "../api/types/todo/getTodo";


const TodoList = () => {
    const [todoList, setTodoList] = useState(EmptyTodoGetResponse); // Todoリストの状態を管理
    // コンテクストからTodoリストドロップダウンに表示するカテゴリー一覧を取得
    const { categories, loading, error } = useCategoryContext();  
    // カテゴリー一覧から選択されたカテゴリーのidをコンテクストに保存する
    const { selectedCategory, setSelectedCategory } = useSelectedCategoryContext();

    // todo新規登録
    const { validate, validationError } = useFormValidation(POST_TODO);
    const {
        success,
        loading: postRequestLoading,
        error: postRequestError,
        apiRequest: postRequestApi
    } = useApiRequestWithBody({
        requestWithBody: postTodo,
        validate: validate,
        apiErrorMessage: ERROR_MESSAGES.TODO.ADD
    });

    // todo取得
    const {
        success: getRequestSuccess,
        loading: getRequestLoading,
        error: getRequestError,
        apiRequest: getRequestApi
    } = useApiRequestWithParams({
        requestWithParams: getTodoList,
        apiErrorMessage: ERROR_MESSAGES.TODO.FETCH
    });

    const fetchTodoList = async () => {
        const response = await getRequestApi(selectedCategory.id);
        setTodoList(response || EmptyTodoGetResponse);
    };

    useEffect(() => {
        fetchTodoList();
    }, [selectedCategory.id]);

    return (
        <>
            <TodoNav />
            <PageContainer
                title={selectedCategory.title}
                description={selectedCategory.description}
                color={selectedCategory.color}
            >
                <TodoInput
                    color={selectedCategory.color}
                    onSubmit={postRequestApi}
                    categoryId={selectedCategory.id}
                />
                <List 
                    todoList={todoList}
                />
            </PageContainer>
        </>
    );
}

export default TodoList;