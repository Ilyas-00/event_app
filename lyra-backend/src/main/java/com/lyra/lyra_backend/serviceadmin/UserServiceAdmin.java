package com.lyra.lyra_backend.serviceadmin;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
// declaration de la class user service admin 
@Entity
@Table(name = "user_service_admin")
public class UserServiceAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_tgi", nullable = false, unique = true, length = 50)
    private String userTgi;

    @Column(name = "service_id", nullable = false)
    private UUID serviceId;

    @Column(name = "assigned_by", nullable = false, length = 50)
    private String assignedBy;

    @Column(name = "assigned_at", nullable = false)
    private LocalDateTime assignedAt;

    @PrePersist
    public void prePersist() {
        this.assignedAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public String getUserTgi() { return userTgi; }
    public UUID getServiceId() { return serviceId; }
    public String getAssignedBy() { return assignedBy; }
    public LocalDateTime getAssignedAt() { return assignedAt; }

    public void setUserTgi(String userTgi) { this.userTgi = userTgi; }
    public void setServiceId(UUID serviceId) { this.serviceId = serviceId; }
    public void setAssignedBy(String assignedBy) { this.assignedBy = assignedBy; }
}