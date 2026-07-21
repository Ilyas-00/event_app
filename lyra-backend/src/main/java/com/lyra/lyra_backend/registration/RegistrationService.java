package com.lyra.lyra_backend.registration;

import com.lyra.lyra_backend.event.Event;
import com.lyra.lyra_backend.event.EventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.UUID;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;

    public RegistrationService(RegistrationRepository registrationRepository,
                               EventRepository eventRepository) {
        this.registrationRepository = registrationRepository;
        this.eventRepository = eventRepository;
    }

    public Registration register(UUID eventId, String tgi, String firstname, String lastname) {
        // 1. l'event doit exister
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Événement introuvable"));

        // 2. pas déjà inscrit
        if (registrationRepository.existsByEventIdAndUserTgi(eventId, tgi)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Déjà inscrit à cet événement");
        }

        // 3. il reste des places
        int count = registrationRepository.countByEventId(eventId);
        if (count >= event.getCapacity()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Événement complet");
        }

        // snapshot des infos du user depuis le token
        Registration reg = new Registration();
        reg.setEventId(eventId);
        reg.setUserTgi(tgi);
        reg.setUserFirstname(firstname);
        reg.setUserLastname(lastname);
        // secteur sera ajouté quand l'attribut existera dans Keycloak

        return registrationRepository.save(reg);
    }

    public void unregister(UUID eventId, String tgi) {
        Registration reg = registrationRepository.findByEventIdAndUserTgi(eventId, tgi)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Inscription introuvable"));
        registrationRepository.delete(reg);
    }

    public List<Registration> getByEvent(UUID eventId) {
        return registrationRepository.findByEventId(eventId);
    }

    public int countByEvent(UUID eventId) {
        return registrationRepository.countByEventId(eventId);
    }

    public List<Registration> getByUser(String tgi) {
        return registrationRepository.findByUserTgiOrderByRegisteredAtDesc(tgi);
    }
}

