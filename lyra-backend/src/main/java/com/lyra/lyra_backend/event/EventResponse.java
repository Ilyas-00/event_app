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
        UUID themeId,
        Integer capacity,
        Integer remainingSeats,
        String createdBy,
        LocalDateTime createdAt
) {
    public static EventResponse from(Event e, int registrationCount) {
        return new EventResponse(
                e.getId(), e.getTitle(), e.getSummary(), e.getDescription(),
                e.getContactTgi(), e.getContactEmail(), e.getLocation(),
                e.getEventDate(), e.getDurationMinutes(), e.getServiceId(),
                e.getThemeId(), e.getCapacity(), e.getCapacity() - registrationCount,
                e.getCreatedBy(), e.getCreatedAt()
        );
    }
}


