package com.example.api.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryPutRequest {
    private Long id;
    private String title;
    private String description;
    private String color;
}
