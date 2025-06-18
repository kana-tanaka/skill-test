package com.example.api.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryGetResponse {
    private Long id;
    private String title;
    private String description;
    private String color;

    public CategoryGetResponse(Long id, String title, String description, String color) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.color = color;
    }
}
