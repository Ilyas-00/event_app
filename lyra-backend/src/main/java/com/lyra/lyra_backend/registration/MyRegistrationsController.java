package com.lyra.lyra_backend.registration;

import com.lyra.lyra_backend.event.Event;
import com.lyra.lyra_backend.event.EventResponse;
import com.lyra.lyra_backend.event.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/me/registrations")
public class MyRegistrationsController {

    private final RegistrationService registrationService;
    private final EventService eventService;

    public MyRegistrationsController(RegistrationService registrationService, EventService eventService) {
        this.registrationService = registrationService;
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<MyRegistrationResponse>> getMyRegistrations(
            @RequestParam(required = false) String status,
            @AuthenticationPrincipal Jwt jwt) {

        String tgi = jwt.getClaimAsString("preferred_username");

        List<MyRegistrationResponse> response = registrationService.getByUser(tgi).stream()
                .map(reg -> {
                    Event event = eventService.getById(reg.getEventId());
                    EventResponse eventResponse = EventResponse.from(
                            event,
                            eventService.getRegistrationCount(event.getId()),
                            eventService.getThemeName(event.getThemeId()),
                            true
                    );
                    return new MyRegistrationResponse(reg.getId(), reg.getRegisteredAt(), eventResponse);
                })
                .filter(r -> status == null
                        || ("terminated".equalsIgnoreCase(status) && r.event().terminated())
                        || ("upcoming".equalsIgnoreCase(status) && !r.event().terminated()))
                .toList();

        return ResponseEntity.ok(response);
    }
}
