package com.lyra.lyra_backend.service;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "service")
public class Service {

    @Id
    private UUID id;

    @Column(nullable = false, unique = true, length = 150)
    private String name;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public UUID getId() { return id; }
    public String getName() { return name; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
