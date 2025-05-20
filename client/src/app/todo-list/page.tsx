"use client";

import { useEffect, useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import List from "../components/List";
import Modal from "../components/Modal";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const TodoList = () => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const [newTodos, setNewTodos] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [deleteTodoId, setDeleteTodoId] = useState<number>(0);
    const [deleteTodoTitle, setDeleteTodoTitle] = useState<string>("");

    const registerTodo = async () => {
        try {
            await axios.post(`${url}/todos`, {
                title: newTodos
            });
            setNewTodos("");
            await getTodoList();
        } catch (error) {
            console.error("Error registering todo:", error);
            alert("Todoの登録に失敗しました。");
        }
    }

    const getTodoList = async () => {
        try {
            const res = await axios.get<Todo[]>(`${url}/todos`);
            setTodos(res.data);
        } catch (error) {
            console.error("Error fetching todo list:", error);
            alert("Todoリストの取得に失敗しました。");
        }
    }

    const updateTodoItem = async (id: number, completed: boolean) => {
        try {
            await axios.put(`${url}/todos/${id}`, {
                is_completed: completed
            });
        } catch (error) {
            console.error("Error fetching todo list:", error);
            alert("Todoリストの更新に失敗しました。");
        }
    }

    const deleteTodo = async () => {
        try {
            await axios.delete(`${url}/todos/${deleteTodoId}`);
            await getTodoList();
            closeModal();
        } catch (error) {
            console.error("Error fetching todo list:", error);
            alert("Todoリストの削除に失敗しました。");
        }
    }

    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        await updateTodoItem(id, e.target.checked);
        await getTodoList();
    }

    const handleDoubleClick = (id: number, title: string) => {
        setDeleteTodoId(id);
        setDeleteTodoTitle(title);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setDeleteTodoId(0);
        setDeleteTodoTitle("");
        setIsModalOpen(false);
    }

    useEffect(() => {
        getTodoList();
    }, []);

    return (
        <>
            <p>
                Practice
                <br />
                TODO List!
            </p>
            <Input
                placeholder="Todoを入力してください"
                type="text"
                value={newTodos}
                onChange={(e) => setNewTodos(e.target.value)}
                buttonLabel="追加"
                onClick={() => registerTodo()}
            />
            <List
                items={todos}
                renderItem={(item) => {
                    return (
                        <>
                            {item.title}
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={(e) => {handleCheckboxChange(e, item.id)}}
                            />
                        </>
                    );
                }}
                keyExtractor={(item) => item.id.toString()}
                handleDoubleClick={(item) => handleDoubleClick(item.id, item.title)}
            />
            {isModalOpen && (
                <Modal
                    onClose={() => closeModal()}
                >
                    <p>こちらのtodoを削除してよろしいですか？</p>
                    <p>{`【${deleteTodoTitle}】`}</p>
                    <button
                        onClick={() => deleteTodo()}
                    >
                        はい
                    </button>
                    <button
                        onClick={() => closeModal()}    
                    >
                        いいえ
                    </button>
                </Modal>
            )}
        </>
        
        
    );
}

export default TodoList;