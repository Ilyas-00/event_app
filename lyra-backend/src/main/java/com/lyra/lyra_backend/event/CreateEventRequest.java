package com.lyra.lyra_backend.event;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.UUID;

public record CreateEventRequest(
        @NotBlank @Size(max = 150) String title,
        @Size(max = 255) String summary,
        String description,
        @NotBlank @Size(max = 50) String contactTgi,
        @NotBlank @Email @Size(max = 150) String contactEmail,
        @NotBlank @Size(max = 200) String location,
        @NotNull @Future LocalDateTime eventDate,
        @NotNull @Positive Integer durationMinutes,
        @NotNull UUID themeId,
        @NotNull @Positive Integer capacity
) {}