package com.example.api.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(schema = "todo_list", name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(length = 7, nullable = true)
    private String color; // カテゴリの色を表すフィールド。例: "#FF5733" のような16進数カラーコード

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // 作成時に呼ばれるメソッド
    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now().withNano(0);
        this.createdAt = now;
        this.updatedAt = now;
    }

    // 更新時に呼ばれるメソッド
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now().withNano(0);
    }
}
