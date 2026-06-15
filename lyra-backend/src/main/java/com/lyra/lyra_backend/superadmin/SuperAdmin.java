package com.lyra.lyra_backend.superadmin;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
// declaration de la class superadmin qui correspond a la table en question db 
@Entity
@Table(name = "super_admin")
public class SuperAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_tgi", nullable = false, unique = true, length = 50)
    private String userTgi;

    @Column(name = "created_by", length = 50)
    private String createdBy;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public String getUserTgi() { return userTgi; }
    public String getCreatedBy() { return createdBy; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setUserTgi(String userTgi) { this.userTgi = userTgi; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
}