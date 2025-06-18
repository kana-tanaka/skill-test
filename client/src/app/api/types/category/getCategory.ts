export interface CategoryArray {
    id: number;
    title: string;
    description: string;
    color: string;
}

export type CategoryGetResponse = CategoryArray[];

export const EmptyCategoryGetResponse: CategoryGetResponse = [
    {
        id: 0,
        title: "",
        description: "",
        color: ""
    }
]
