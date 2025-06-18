package com.example.api.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryPutResponse {
    private Long id;

    public CategoryPutResponse(Long id) {
        this.id = id;
    }
}
