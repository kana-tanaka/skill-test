package com.example.api.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoGetResponse {
    private Long id;
    private String title;
    @JsonProperty("is_completed")
    private boolean completed;

    public TodoGetResponse(Long id, String title, boolean completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}
