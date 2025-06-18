"use client";

import { TodoGetResponse } from '@/app/api/types/todo/getTodo';
import { TodoPostResponse } from '@/app/api/types/todo/postTodo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';

interface ListProps {
    todoList: TodoGetResponse;
}

const List = ({ todoList }: ListProps) => {
    return (
        <ListGroup>
            {todoList.map((todo) => (
                <ListGroup.Item key={todo.id}>
                    {todo.title}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default List;