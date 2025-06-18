export interface CategoryPutRequest {
    id: number;
    title: string;
    description?: string;
    color: string;
}

export const EmptyPutCategoryRequest: CategoryPutRequest = {
    id: 0,
    title: "",
    description: "",
    color: ""
};

export interface CategoryPutResponse {
    id: number;
}