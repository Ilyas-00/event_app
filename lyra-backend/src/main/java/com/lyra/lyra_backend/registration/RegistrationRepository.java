package com.lyra.lyra_backend.registration;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RegistrationRepository extends JpaRepository<Registration, UUID> {
    boolean existsByEventIdAndUserTgi(UUID eventId, String userTgi);
    Optional<Registration> findByEventIdAndUserTgi(UUID eventId, String userTgi);
    List<Registration> findByEventId(UUID eventId);
    int countByEventId(UUID eventId);
}