"use client";

import { TodoPostRequest, TodoPostResponse } from '@/app/api/types/todo/postTodo';
import { hexToRgba } from '@/app/util/hexToRgba';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface TodoInputProps {
    color: string;
    categoryId: number;
    onSubmit: (value: TodoPostRequest) => Promise<TodoPostResponse | undefined>;
}

const TodoInput = ({ color, onSubmit, categoryId }: TodoInputProps) => {
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // hover時は追加ボタンの色を変更する
    const backgroundColor = hovered ? hexToRgba(color, 0.8) : color;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // ここでTodoを追加する処理を実装
        const response = await onSubmit({
            title: inputValue,
            categoryId: categoryId
        });

        // 登録成功した場合は、入力フィールドをクリアする
        if (response) {
            setInputValue("");
        }
    };
    
    return (
        <Form className="d-flex w-50" onSubmit={handleSubmit}>
            <Form.Group
                className="flex-grow-1"
            >
                <Form.Control
                    type="text"
                    placeholder="Add a new todo"
                    className="mb-3 form-control-lg"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style = {{
                        borderColor: color,
                        boxShadow: focused 
                            ?  `0 0 0 0.25rem ${color}40`
                            : undefined,
                        transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                />
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
                className='ms-4 mb-3 px-4'
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    backgroundColor: backgroundColor,
                    borderColor: color,
                    transition: "background-color 0.3s, box-shadow 0.3s",
                }}
            >
                Add
            </Button>
        </Form>
    );
}

export default TodoInput;