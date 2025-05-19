package com.example.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.dto.request.TodoPostRequest;
import com.example.api.dto.request.TodoPutRequest;
import com.example.api.dto.response.TodoGetResponse;
import com.example.api.dto.response.TodoIdResponse;
import com.example.api.entity.Todo;
import com.example.api.service.TodoService;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/todos")
public class TodoController {
    
    private static final Logger logger = LoggerFactory.getLogger(TodoController.class);
    @Autowired TodoService todoService;

    @GetMapping
    public List<TodoGetResponse> getTodoList()
    {
        return todoService.getAllTodos()
                .stream()
                .map(todo -> new TodoGetResponse(todo.getId(), todo.getTitle(), todo.getCompleted()))
                .toList();
    }

    @PostMapping
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<TodoIdResponse> registerTodo(@RequestBody TodoPostRequest request)
    {
        try {
            Todo todo = todoService.createTodo(request);
            return ResponseEntity.ok(new TodoIdResponse(todo.getId()));
        } catch (DataAccessException e) {
            logger.error("error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    @ExceptionHandler({DataAccessException.class, EntityNotFoundException.class})
    public ResponseEntity<TodoIdResponse> updateTodo(@PathVariable Long id, @RequestBody TodoPutRequest request)
    {
        try {
            Todo todo = todoService.updateTodo(id, request);
            return ResponseEntity.ok(new TodoIdResponse(todo.getId()));
        } catch (EntityNotFoundException e) {
            logger.error("error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (DataAccessException e) {
            logger.error("error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    @ExceptionHandler({DataAccessException.class, EntityNotFoundException.class})
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id)
    {
        try {
            todoService.deleteTodo(id);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            logger.error("error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (DataAccessException e) {
            logger.error("error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
