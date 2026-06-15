package com.lyra.lyra_backend.registration;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events/{eventId}/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
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
    public ResponseEntity<List<RegistrationResponse>> getRegistrations(@PathVariable UUID eventId) {
        return ResponseEntity.ok(registrationService.getByEvent(eventId)
                .stream().map(RegistrationResponse::from).toList());
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> count(@PathVariable UUID eventId) {
        return ResponseEntity.ok(registrationService.countByEvent(eventId));
    }
}