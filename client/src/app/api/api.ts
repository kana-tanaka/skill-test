import axios from 'axios';
import { CategoryGetResponse } from './types/category/getCategory';
import { CategoryPostRequest, CategoryPostResponse } from './types/category/postCategory';
import { CategoryPutRequest, CategoryPutResponse } from './types/category/putCategory';
import { CategoryDeleteResponse } from './types/category/deleteCategory';
import { TodoGetResponse } from './types/todo/getTodo';
import { TodoPostRequest, TodoPostResponse } from './types/todo/postTodo';

const url = process.env.NEXT_PUBLIC_API_URL;

export const getAllCategory = async (): Promise<CategoryGetResponse> => {
    const response = await axios.get(`${url}/category`);
    return response.data;
}

export const postCategory = async (request: CategoryPostRequest): Promise<CategoryPostResponse> => {
    const response = await axios.post(`${url}/category`, request);
    return response.data;
}

export const updateCategory = async (params: number, request: CategoryPutRequest): Promise<CategoryPutResponse> => {
    const response = await axios.put(`${url}/category/${params}`, request);
    return response.data;
}

export const deleteCategory = async (params: number): Promise<CategoryDeleteResponse> => {
    const response = await axios.delete(`${url}/category/${params}`);
    return response.data;
}

export const getTodoList = async (params: number): Promise<TodoGetResponse> => {
    const response = await axios.get(`${url}/todos/${params}`);
    return response.data;
}

export const postTodo = async (request: TodoPostRequest): Promise<TodoPostResponse> => {
    const response = await axios.post(`${url}/todos`, request);
    return response.data;
}