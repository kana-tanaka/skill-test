package com.example.api.repository;

import org.springframework.stereotype.Repository;

import com.example.api.entity.Category;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>
{

}
