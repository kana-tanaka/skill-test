package com.example.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.TodoPostRequest;
import com.example.api.entity.Todo;
import com.example.api.service.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class TodoController {
    
    private static final Logger logger = LoggerFactory.getLogger(TodoController.class);
    @Autowired TodoService todoService;

    @PostMapping("/register")
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<String> registerTodo(@RequestBody TodoPostRequest request)
    {
        try {
            Todo todo = todoService.createTodo(request);
            return ResponseEntity.ok("Todo registered with ID: " + todo.getId());
        } catch (DataAccessException e) {
            logger.error("error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("データベース接続に失敗しました");
        }
    }

    // @PutMapping("/update")
    // @ExceptionHandler(DataAccessException.class)
    // public ResponseEntity<String> updateTodo(@RequestBody TodoPostRequest request)
    // {
    //     try {
    //         Todo todo = todoService.updateTodo(request);
    //         return ResponseEntity.ok("Todo updated with ID: " + todo.getId());
    //     } catch (DataAccessException e) {
    //         logger.error("error", e);
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                          .body("データベース接続に失敗しました");
    //     }
    // }

}
