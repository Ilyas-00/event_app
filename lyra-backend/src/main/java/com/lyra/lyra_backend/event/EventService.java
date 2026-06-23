package com.lyra.lyra_backend.event;

import com.lyra.lyra_backend.theme.ThemeRepository;
import com.lyra.lyra_backend.registration.RegistrationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final ThemeRepository themeRepository;
    private final RegistrationRepository registrationRepository;

    public EventService(EventRepository eventRepository,
                        ThemeRepository themeRepository,
                        RegistrationRepository registrationRepository) {
        this.eventRepository = eventRepository;
        this.themeRepository = themeRepository;
        this.registrationRepository = registrationRepository;
    }

    public Event create(CreateEventRequest req, String creatorTgi, UUID serviceId) {
        if (!themeRepository.existsById(req.themeId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Thème introuvable");
        }

        Event event = new Event();
        event.setTitle(req.title());
        event.setSummary(req.summary());
        event.setDescription(req.description());
        event.setContactTgi(req.contactTgi());
        event.setContactEmail(req.contactEmail());
        event.setLocation(req.location());
        event.setEventDate(req.eventDate());
        event.setDurationMinutes(req.durationMinutes());
        event.setThemeId(req.themeId());
        event.setCapacity(req.capacity());
        event.setServiceId(serviceId);
        event.setCreatedBy(creatorTgi);

        return eventRepository.save(event);
    }

    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    public Event getById(UUID id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Événement introuvable"));
    }

    public List<Event> getByTheme(UUID themeId) {
        return eventRepository.findByThemeId(themeId);
    }

    public List<Event> getByDate(LocalDateTime date) {
        LocalDateTime startOfDay = date.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1);
        return eventRepository.findByEventDateBetween(startOfDay, endOfDay);
    }

    public List<Event> search(String query) {
        return eventRepository.findByTitleContainingIgnoreCase(query);
    }

    public void delete(UUID eventId, UUID serviceId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Événement introuvable"));

        if (!event.getServiceId().equals(serviceId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cet événement n'appartient pas à votre service");
        }

        eventRepository.delete(event);
    }

    public int getRegistrationCount(UUID eventId) {
        return registrationRepository.countByEventId(eventId);
    }

    public boolean isRegistered(UUID eventId, String tgi) {
        return registrationRepository.existsByEventIdAndUserTgi(eventId, tgi);
    }

    public String getThemeName(UUID themeId) {
        return themeRepository.findById(themeId)
                .map(theme -> theme.getName())
                .orElse("Thème inconnu");
    }
}