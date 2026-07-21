package com.lyra.lyra_backend.event;

import java.time.LocalDateTime;
import java.util.UUID;

public record EventResponse(
        UUID id,
        String title,
        String summary,
        String description,
        String contactTgi,
        String contactEmail,
        String location,
        LocalDateTime eventDate,
        Integer durationMinutes,
        UUID serviceId,
        String themeName,
        Integer capacity,
        Integer remainingSeats,
        boolean isRegistered,
        boolean terminated,
        String createdBy,
        LocalDateTime createdAt
) {
    public static EventResponse from(Event e, int registrationCount, String themeName, boolean isRegistered) {
        LocalDateTime end = e.getEventDate().plusMinutes(e.getDurationMinutes());
        boolean terminated = end.isBefore(LocalDateTime.now());
        return new EventResponse(
                e.getId(), e.getTitle(), e.getSummary(), e.getDescription(),
                e.getContactTgi(), e.getContactEmail(), e.getLocation(),
                e.getEventDate(), e.getDurationMinutes(), e.getServiceId(),
                themeName, e.getCapacity(), e.getCapacity() - registrationCount,
                isRegistered, terminated, e.getCreatedBy(), e.getCreatedAt()
        );
    }
}