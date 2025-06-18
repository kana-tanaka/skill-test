"use client";

import { Nav } from "react-bootstrap";
import { useCategoryContext } from "../../contexts/CategoryContext";
import { useSelectedCategoryContext } from "../../contexts/SelectedCategoryContext";
import { useEffect, useState } from "react";
import { ALL_CATEGORY, ALL_CATEGORY_EVENT_KEY } from "@/app/constants/message";

const TodoNav = () => {
    // コンテクストからTodoリストドロップダウンに表示するカテゴリー一覧を取得
    const { categories, loading, error } = useCategoryContext();  
    // カテゴリー一覧から選択されたカテゴリーのidをコンテクストに保存する
    const { selectedCategory, setSelectedCategory } = useSelectedCategoryContext();
    
    const handleSelect = (eventKey: string | null) => {
        // ALLが選択された場合
        if(eventKey === ALL_CATEGORY_EVENT_KEY) {
            setSelectedCategory(ALL_CATEGORY);
            return;
        }

        const selected = categories.find(category => category.id === Number(eventKey));
        if(selected) {
            setSelectedCategory(selected);
        }
    }

    return (
        <Nav
            variant="underline"
            onSelect={handleSelect}
            className="justify-content-center mt-4 fs-6"
            activeKey={selectedCategory.id}
        >
            <Nav.Item>
                <Nav.Link
                    eventKey={ALL_CATEGORY_EVENT_KEY}
                    className="categoryNav"
                    style={{ color: "#000000" }}
                >
                    All
                </Nav.Link>
            </Nav.Item>
            {categories.map((category) => (
                <Nav.Item key={category.id}>
                    <Nav.Link
                        eventKey={category.id}
                        className="categoryNav"
                        style={{ 
                            color: selectedCategory?.id === category.id
                            ? selectedCategory.color
                            : "#000000",
                        }}
                    >
                        {category.title}
                    </Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    );
}

export default TodoNav;