package com.example.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.TodoPostRequest;
import com.example.api.entity.Todo;
import com.example.api.repository.TodoRepository;
import com.example.api.service.TodoService;

@Service
public class TodoServiceImpl implements TodoService {
    // 実体クラスはspring bootが勝手に作るらしい。こわ。
    @Autowired TodoRepository todoRepository;

    public Todo createTodo(TodoPostRequest todoPostRequest) {
        Todo todo = new Todo();
        todo.setTitle(todoPostRequest.getTitle());
        return todoRepository.save(todo);
    }
}
