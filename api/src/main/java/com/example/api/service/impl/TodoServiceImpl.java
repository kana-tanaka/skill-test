package com.example.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.dto.request.TodoPostRequest;
import com.example.api.dto.request.TodoPutRequest;
import com.example.api.entity.Todo;
import com.example.api.repository.TodoRepository;
import com.example.api.service.TodoService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TodoServiceImpl implements TodoService {
    // 実体クラスはspring bootが勝手に作るらしい。こわ。
    @Autowired TodoRepository todoRepository;

    @Override
    public Todo createTodo(TodoPostRequest todoPostRequest) {
        Todo todo = new Todo();
        todo.setTitle(todoPostRequest.getTitle());
        return todoRepository.save(todo);
    }

    @Override
    public Todo updateTodo(Long id, TodoPutRequest todoPutRequest) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Todo not found"));
        todo.setCompleted(todoPutRequest.isCompleted());
        System.out.println(todoPutRequest.isCompleted());
        return todoRepository.save(todo);
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Todo not found"));
        todoRepository.delete(todo);
    }


    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }
}
