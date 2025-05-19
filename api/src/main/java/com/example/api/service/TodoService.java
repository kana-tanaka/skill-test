package com.example.api.service;

import java.util.List;

import com.example.api.dto.request.TodoPostRequest;
import com.example.api.dto.request.TodoPutRequest;
import com.example.api.entity.Todo;

public interface TodoService {
    Todo createTodo(TodoPostRequest todoPostRequest);
    Todo updateTodo(Long id, TodoPutRequest todoPutRequest);
    void deleteTodo(Long id);
    List<Todo> getAllTodos();
}