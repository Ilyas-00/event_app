package com.lyra.lyra_backend.event;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(length = 255)
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "contact_tgi", nullable = false, length = 50)
    private String contactTgi;

    @Column(name = "contact_email", nullable = false, length = 150)
    private String contactEmail;

    @Column(nullable = false, length = 200)
    private String location;

    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(name = "service_id", nullable = false)
    private UUID serviceId;

    @Column(name = "theme_id", nullable = false)
    private UUID themeId;

    @Column(nullable = false)
    private Integer capacity;

    @Column(name = "created_by", nullable = false, length = 50)
    private String createdBy;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public String getTitle() { return title; }
    public String getSummary() { return summary; }
    public String getDescription() { return description; }
    public String getContactTgi() { return contactTgi; }
    public String getContactEmail() { return contactEmail; }
    public String getLocation() { return location; }
    public LocalDateTime getEventDate() { return eventDate; }
    public Integer getDurationMinutes() { return durationMinutes; }
    public UUID getServiceId() { return serviceId; }
    public UUID getThemeId() { return themeId; }
    public Integer getCapacity() { return capacity; }
    public String getCreatedBy() { return createdBy; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setTitle(String title) { this.title = title; }
    public void setSummary(String summary) { this.summary = summary; }
    public void setDescription(String description) { this.description = description; }
    public void setContactTgi(String contactTgi) { this.contactTgi = contactTgi; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
    public void setLocation(String location) { this.location = location; }
    public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
    public void setServiceId(UUID serviceId) { this.serviceId = serviceId; }
    public void setThemeId(UUID themeId) { this.themeId = themeId; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
}