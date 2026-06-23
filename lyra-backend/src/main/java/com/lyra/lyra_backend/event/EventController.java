package com.lyra.lyra_backend.event;

import com.lyra.lyra_backend.role.Role;
import com.lyra.lyra_backend.role.RoleResolver;
import jakarta.validation.Valid;
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
                .body(EventResponse.from(created, 0, eventService.getThemeName(created.getThemeId())));
    }

    @GetMapping
    public ResponseEntity<List<EventResponse>> getAll(
            @RequestParam(required = false) UUID themeId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) String search) {

        List<Event> events;
        if (search != null) {
            events = eventService.search(search);
        } else if (themeId != null) {
            events = eventService.getByTheme(themeId);
        } else if (date != null) {
            events = eventService.getByDate(date.atStartOfDay());
        } else {
            events = eventService.getAll();
        }

        List<EventResponse> response = events.stream()
                .map(e -> EventResponse.from(
                        e,
                        eventService.getRegistrationCount(e.getId()),
                        eventService.getThemeName(e.getThemeId())
                ))
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getById(@PathVariable UUID id) {
        Event event = eventService.getById(id);
        return ResponseEntity.ok(EventResponse.from(
                event,
                eventService.getRegistrationCount(id),
                eventService.getThemeName(event.getThemeId())
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