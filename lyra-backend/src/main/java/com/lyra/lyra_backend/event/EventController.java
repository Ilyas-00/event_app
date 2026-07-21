package com.lyra.lyra_backend.event;

import com.lyra.lyra_backend.role.Role;
import com.lyra.lyra_backend.role.RoleResolver;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final RoleResolver roleResolver;

    public EventController(EventService eventService, RoleResolver roleResolver) {
        this.eventService = eventService;
        this.roleResolver = roleResolver;
    }

    @PostMapping
    public ResponseEntity<EventResponse> create(
            @Valid @RequestBody CreateEventRequest request,
            @AuthenticationPrincipal Jwt jwt) {

        String tgi = jwt.getClaimAsString("preferred_username");
        if (roleResolver.getRole(tgi) != Role.SERVICE_ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Seul un admin de service peut créer un événement");
        }

        UUID serviceId = roleResolver.getServiceId(tgi);
        Event created = eventService.create(request, tgi, serviceId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(EventResponse.from(created, 0, eventService.getThemeName(created.getThemeId()), false));
    }

    @GetMapping
    public ResponseEntity<Page<EventResponse>> getAll(
            @RequestParam(required = false) UUID themeId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @AuthenticationPrincipal Jwt jwt) {

        String tgi = jwt.getClaimAsString("preferred_username");
        Pageable pageable = PageRequest.of(page, size, Sort.by("eventDate").ascending());

        Page<Event> events;
        if (search != null) {
            events = toPage(eventService.search(search), pageable);
        } else if (themeId != null) {
            events = toPage(eventService.getByTheme(themeId), pageable);
        } else if (date != null) {
            events = toPage(eventService.getByDate(date.atStartOfDay()), pageable);
        } else {
            events = eventService.getAllPaged(pageable);
        }

        return ResponseEntity.ok(events.map(e -> EventResponse.from(
                e,
                eventService.getRegistrationCount(e.getId()),
                eventService.getThemeName(e.getThemeId()),
                eventService.isRegistered(e.getId(), tgi)
        )));
    }

    // Statut "à venir/en cours" ou "terminé" filtré et paginé directement en base (pas de calcul en mémoire sur toute la table)
    @GetMapping("/my-service")
    public ResponseEntity<Page<EventResponse>> getMyServiceEvents(
            @RequestParam(defaultValue = "upcoming") String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @AuthenticationPrincipal Jwt jwt) {

        String tgi = jwt.getClaimAsString("preferred_username");
        if (roleResolver.getRole(tgi) != Role.SERVICE_ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Seul un admin de service peut consulter les événements de son service");
        }

        UUID serviceId = roleResolver.getServiceId(tgi);
        Pageable pageable = PageRequest.of(page, size);

        Page<Event> events = "terminated".equalsIgnoreCase(status)
                ? eventService.getTerminatedByService(serviceId, pageable)
                : eventService.getUpcomingByService(serviceId, pageable);

        return ResponseEntity.ok(events.map(e -> EventResponse.from(
                e,
                eventService.getRegistrationCount(e.getId()),
                eventService.getThemeName(e.getThemeId()),
                eventService.isRegistered(e.getId(), tgi)
        )));
    }

    private Page<Event> toPage(List<Event> list, Pageable pageable) {
        int start = Math.min((int) pageable.getOffset(), list.size());
        int end = Math.min(start + pageable.getPageSize(), list.size());
        return new PageImpl<>(list.subList(start, end), pageable, list.size());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getById(
            @PathVariable UUID id,
            @AuthenticationPrincipal Jwt jwt) {

        String tgi = jwt.getClaimAsString("preferred_username");
        Event event = eventService.getById(id);
        return ResponseEntity.ok(EventResponse.from(
                event,
                eventService.getRegistrationCount(id),
                eventService.getThemeName(event.getThemeId()),
                eventService.isRegistered(id, tgi)
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        String tgi = jwt.getClaimAsString("preferred_username");
        if (roleResolver.getRole(tgi) != Role.SERVICE_ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Seul un admin de service peut supprimer un événement");
        }
        eventService.delete(id, roleResolver.getServiceId(tgi));
        return ResponseEntity.noContent().build();
    }
}