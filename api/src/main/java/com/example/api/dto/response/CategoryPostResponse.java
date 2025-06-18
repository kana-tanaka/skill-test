package com.example.api.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryPostResponse {
    private Long id;

    public CategoryPostResponse(Long id) {
        this.id = id;
    }
}
