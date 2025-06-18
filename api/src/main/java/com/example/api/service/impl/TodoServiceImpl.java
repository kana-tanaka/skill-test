package com.example.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.dto.request.TodoPostRequest;
import com.example.api.dto.request.TodoPutRequest;
import com.example.api.entity.Category;
import com.example.api.entity.Todo;
import com.example.api.repository.CategoryRepository;
import com.example.api.repository.TodoRepository;
import com.example.api.service.CategoryService;
import com.example.api.service.TodoService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TodoServiceImpl implements TodoService {
    // 実体クラスはspring bootが勝手に作るらしい。こわ。
    @Autowired TodoRepository todoRepository;
    @Autowired CategoryRepository categoryRepository;

    @Override
    public Todo createTodo(TodoPostRequest todoPostRequest) {
        Category category = categoryRepository.findById(todoPostRequest.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        Todo todo = new Todo();
        todo.setTitle(todoPostRequest.getTitle());
        todo.setCategory(category);
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


    public List<Todo> getAllTodos(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        return todoRepository.findAllByCategoryIdOrderByCreatedAtAsc(category.getId());
    }
}
