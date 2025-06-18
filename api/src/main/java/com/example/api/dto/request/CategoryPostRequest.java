package com.example.api.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryPostRequest {
    private String title;
    private String description;
    private String color; // カテゴリの色を表すフィールド。例: "#FF5733" のような16進数カラーコード
}
