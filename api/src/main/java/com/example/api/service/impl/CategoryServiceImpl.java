package com.example.api.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.dto.request.CategoryPostRequest;
import com.example.api.dto.request.CategoryPutRequest;
import com.example.api.entity.Category;
import com.example.api.repository.CategoryRepository;
import com.example.api.service.CategoryService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired CategoryRepository categoryRepository;

    @Override
    public Category createCategory(CategoryPostRequest categoryPostRequest) {
        Category category = new Category();
        category.setTitle(categoryPostRequest.getTitle());
        category.setDescription(categoryPostRequest.getDescription());
        category.setColor(categoryPostRequest.getColor());
        return categoryRepository.save(category);
    }
    
    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category updateCategory(Long id, CategoryPutRequest categoryPutRequest) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        category.setTitle(categoryPutRequest.getTitle());
        category.setDescription(categoryPutRequest.getDescription());
        category.setColor(categoryPutRequest.getColor());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long id)
    {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        categoryRepository.delete(category);
    }
}
