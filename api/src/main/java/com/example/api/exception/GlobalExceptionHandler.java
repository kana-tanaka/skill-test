package com.example.api.exception;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.persistence.EntityNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<String> handleDBError(DataAccessException e)
    {
        logger.error("Database access error occurred:", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleNotFoundError(EntityNotFoundException e)
    {
        logger.error("Entity not found:", e);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
