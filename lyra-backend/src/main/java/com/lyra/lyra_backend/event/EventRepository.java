package com.lyra.lyra_backend.event;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, UUID> {
    List<Event> findByThemeId(UUID themeId);
    List<Event> findByEventDateBetween(LocalDateTime start, LocalDateTime end);
    List<Event> findByTitleContainingIgnoreCase(String title);
}