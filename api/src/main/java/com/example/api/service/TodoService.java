package com.example.api.service;

import com.example.api.TodoPostRequest;
import com.example.api.entity.Todo;

public interface TodoService {
    Todo createTodo(TodoPostRequest todoPostRequest);
}