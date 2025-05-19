package com.example.api.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoIdResponse {
    private Long id;

    public TodoIdResponse(Long id) {
        this.id = id;
    }
}
