package com.lyra.lyra_backend.registration;

import com.lyra.lyra_backend.event.Event;
import com.lyra.lyra_backend.event.EventService;
import com.lyra.lyra_backend.role.Role;
import com.lyra.lyra_backend.role.RoleResolver;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events/{eventId}/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;
    private final EventService eventService;
    private final RoleResolver roleResolver;

    public RegistrationController(RegistrationService registrationService,
                                  EventService eventService,
                                  RoleResolver roleResolver) {
        this.registrationService = registrationService;
        this.eventService = eventService;
        this.roleResolver = roleResolver;
    }

    @PostMapping
    public ResponseEntity<RegistrationResponse> register(
            @PathVariable UUID eventId,
            @AuthenticationPrincipal Jwt jwt) {

        String tgi = jwt.getClaimAsString("preferred_username");
        String firstname = jwt.getClaimAsString("given_name");
        String lastname = jwt.getClaimAsString("family_name");

        Registration reg = registrationService.register(eventId, tgi, firstname, lastname);
        return ResponseEntity.status(HttpStatus.CREATED).body(RegistrationResponse.from(reg));
    }

    @DeleteMapping
    public ResponseEntity<Void> unregister(
            @PathVariable UUID eventId,
            @AuthenticationPrincipal Jwt jwt) {

        String tgi = jwt.getClaimAsString("preferred_username");
        registrationService.unregister(eventId, tgi);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<RegistrationResponse>> getRegistrations(
            @PathVariable UUID eventId,
            @AuthenticationPrincipal Jwt jwt) {

        String tgi = jwt.getClaimAsString("preferred_username");
        Role role = roleResolver.getRole(tgi);
        if (role != Role.SERVICE_ADMIN && role != Role.SUPER_ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Seul un admin peut consulter les inscrits d'un événement");
        }

        if (role == Role.SERVICE_ADMIN) {
            Event event = eventService.getById(eventId);
            UUID adminServiceId = roleResolver.getServiceId(tgi);
            if (!event.getServiceId().equals(adminServiceId)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                        "Cet événement n'appartient pas à votre service");
            }
        }

        return ResponseEntity.ok(registrationService.getByEvent(eventId)
                .stream().map(RegistrationResponse::from).toList());
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> count(@PathVariable UUID eventId) {
        return ResponseEntity.ok(registrationService.countByEvent(eventId));
    }
}