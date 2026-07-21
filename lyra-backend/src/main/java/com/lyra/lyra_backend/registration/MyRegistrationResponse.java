package com.lyra.lyra_backend.registration;

import com.lyra.lyra_backend.event.EventResponse;
import java.time.LocalDateTime;
import java.util.UUID;

public record MyRegistrationResponse(
        UUID registrationId,
        LocalDateTime registeredAt,
        EventResponse event
) {
}
