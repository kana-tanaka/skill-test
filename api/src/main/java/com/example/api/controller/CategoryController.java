package com.example.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.dto.request.CategoryPostRequest;
import com.example.api.dto.request.CategoryPutRequest;
import com.example.api.dto.response.CategoryGetResponse;
import com.example.api.dto.response.CategoryPostResponse;
import com.example.api.dto.response.CategoryPutResponse;
import com.example.api.entity.Category;
import com.example.api.service.CategoryService;



@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryPostResponse> registerCategory(@RequestBody CategoryPostRequest request) 
    {
        Category category = categoryService.createCategory(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new CategoryPostResponse(category.getId()));
    }

    @GetMapping
    public ResponseEntity<List<CategoryGetResponse>> getAllCategory()
    {
        // ResponseEntity<List<CategoryGetResponse>> は「ResponseEntity の中身（ボディ）を List<CategoryGetResponse> にするという意味」なので、ボディが null（＝中身なし）でもOK
        List<CategoryGetResponse> categories = categoryService.getAllCategories()
            .stream()
            .map(category -> new CategoryGetResponse(category.getId(), category.getTitle(), category.getDescription(), category.getColor()))
            .toList();
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryPutResponse> updateCategory(@PathVariable Long id, @RequestBody CategoryPutRequest request) 
    {
        Category category = categoryService.updateCategory(id, request);
        return ResponseEntity.ok(new CategoryPutResponse(category.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id)
    {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
