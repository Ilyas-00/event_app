package com.lyra.lyra_backend.theme;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ThemeRepository extends JpaRepository<Theme, UUID> {
}