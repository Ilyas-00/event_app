package com.lyra.lyra_backend.theme;

import java.util.UUID;

//classe de réponse pour représenter un thème dans l'API.
public record ThemeResponse(UUID id, String name) {
    public static ThemeResponse from(Theme t) {
        return new ThemeResponse(t.getId(), t.getName());
    }
}