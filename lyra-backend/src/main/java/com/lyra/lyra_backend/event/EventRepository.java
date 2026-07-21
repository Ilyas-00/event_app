package com.lyra.lyra_backend.event;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, UUID> {
    List<Event> findByThemeId(UUID themeId);
    List<Event> findByEventDateBetween(LocalDateTime start, LocalDateTime end);
    List<Event> findByTitleContainingIgnoreCase(String title);
    List<Event> findByServiceId(UUID serviceId);

    // "terminé" = event_date + duration_minutes < maintenant, calculé côté SQL pour paginer sans tout charger en mémoire
    @Query(
        value = "SELECT * FROM event e WHERE e.service_id = :serviceId " +
                "AND (e.event_date + (e.duration_minutes || ' minutes')::interval) < now() " +
                "ORDER BY e.event_date DESC",
        countQuery = "SELECT count(*) FROM event e WHERE e.service_id = :serviceId " +
                "AND (e.event_date + (e.duration_minutes || ' minutes')::interval) < now()",
        nativeQuery = true
    )
    Page<Event> findTerminatedByService(@Param("serviceId") UUID serviceId, Pageable pageable);

    @Query(
        value = "SELECT * FROM event e WHERE e.service_id = :serviceId " +
                "AND (e.event_date + (e.duration_minutes || ' minutes')::interval) >= now() " +
                "ORDER BY e.event_date ASC",
        countQuery = "SELECT count(*) FROM event e WHERE e.service_id = :serviceId " +
                "AND (e.event_date + (e.duration_minutes || ' minutes')::interval) >= now()",
        nativeQuery = true
    )
    Page<Event> findUpcomingByService(@Param("serviceId") UUID serviceId, Pageable pageable);
}

