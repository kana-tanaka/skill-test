package com.example.api.service;

import java.util.List;

import com.example.api.dto.request.CategoryPostRequest;
import com.example.api.dto.request.CategoryPutRequest;
import com.example.api.entity.Category;

public interface CategoryService {
    Category createCategory(CategoryPostRequest categoryPostRequest);
    List<Category> getAllCategories();
    Category updateCategory(Long id, CategoryPutRequest categoryPutRequest);
    void deleteCategory(Long id);
}
