package com.example.api.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoPutRequest {    
    @JsonProperty("is_completed")
    private boolean completed;
}
