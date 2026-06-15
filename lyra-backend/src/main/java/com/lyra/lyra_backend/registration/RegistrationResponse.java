package com.lyra.lyra_backend.registration;

import java.time.LocalDateTime;
import java.util.UUID;

public record RegistrationResponse(
        UUID id,
        UUID eventId,
        String userTgi,
        String userFirstname,
        String userLastname,
        LocalDateTime registeredAt
) {
    public static RegistrationResponse from(Registration r) {
        return new RegistrationResponse(
                r.getId(), r.getEventId(), r.getUserTgi(),
                r.getUserFirstname(), r.getUserLastname(), r.getRegisteredAt()
        );
    }
}