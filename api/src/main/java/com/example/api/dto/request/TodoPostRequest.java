package com.example.api.dto.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoPostRequest {
    private String title;
    private Long categoryId;
}
