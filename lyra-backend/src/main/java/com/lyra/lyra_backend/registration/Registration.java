package com.lyra.lyra_backend.registration;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "registration",
    uniqueConstraints = @UniqueConstraint(columnNames = {"event_id", "user_tgi"}))
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "event_id", nullable = false)
    private UUID eventId;

    @Column(name = "user_tgi", nullable = false, length = 50)
    private String userTgi;

    @Column(name = "user_firstname", length = 100)
    private String userFirstname;

    @Column(name = "user_lastname", length = 100)
    private String userLastname;

    @Column(name = "user_secteur", length = 100)
    private String userSecteur;

    @Column(name = "registered_at", nullable = false)
    private LocalDateTime registeredAt;

    @PrePersist
    public void prePersist() {
        this.registeredAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public UUID getEventId() { return eventId; }
    public String getUserTgi() { return userTgi; }
    public String getUserFirstname() { return userFirstname; }
    public String getUserLastname() { return userLastname; }
    public String getUserSecteur() { return userSecteur; }
    public LocalDateTime getRegisteredAt() { return registeredAt; }

    public void setEventId(UUID eventId) { this.eventId = eventId; }
    public void setUserTgi(String userTgi) { this.userTgi = userTgi; }
    public void setUserFirstname(String userFirstname) { this.userFirstname = userFirstname; }
    public void setUserLastname(String userLastname) { this.userLastname = userLastname; }
    public void setUserSecteur(String userSecteur) { this.userSecteur = userSecteur; }
}