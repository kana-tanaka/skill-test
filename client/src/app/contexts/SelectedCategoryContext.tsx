"use client";

import { title } from "process";
import { createContext, useContext, useState } from "react";
import { ALL_CATEGORY } from "../constants/message";

type Category = {
    id: number;
    title: string;
    description: string;
    color: string;
}
interface SelectedCategory {
    selectedCategory:Category;
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
}

const SelectedCategoryContext = createContext<SelectedCategory>({
    selectedCategory: ALL_CATEGORY,
    setSelectedCategory: () => {}
})

export const SelectedCategoryProvider = ({ children }: { children: React.ReactNode}) => {
    // 選択されたカテゴリーのidを格納
    // 初期値は0で全てのTodoリストを表示する
    const [selectedCategory, setSelectedCategory] = useState<Category>(ALL_CATEGORY);

    return (
        
        <SelectedCategoryContext.Provider value={{ selectedCategory, setSelectedCategory}}>
            { children }
        </SelectedCategoryContext.Provider>
    )
}

export const useSelectedCategoryContext = () => useContext(SelectedCategoryContext);