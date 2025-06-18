export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    categoryId: number;
}


export type TodoGetResponse = Todo[];

export const EmptyTodoGetResponse: TodoGetResponse = [
    {
        id: 0,
        title: "",
        description: "",
        completed: false,
        categoryId: 0
    }
];