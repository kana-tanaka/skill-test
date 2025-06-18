"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAllCategory } from "../api/api";
import { ERROR_MESSAGES } from "../constants/message";

type Category = {
    id: number;
    title: string;
    description: string;
    color: string;
}

interface CategoryContextType {
    categories: Category[];
    fetchCategories: () => Promise<void>;
    error: string;
    loading: boolean;
}

const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    fetchCategories: async () => {},
    error: "",
    loading: false
})

export const CategoryProvider = ({ children }: { children: React.ReactNode}) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");


    const fetchCategories = async () => {
         try {
            const response = await getAllCategory();
            setCategories(response);
            setError("");
        } catch (err) {
            setError(ERROR_MESSAGES.CATEGORY.FETCH);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, fetchCategories, error, loading }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategoryContext = () => useContext(CategoryContext);