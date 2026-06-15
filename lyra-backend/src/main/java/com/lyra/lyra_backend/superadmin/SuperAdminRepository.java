package com.lyra.lyra_backend.superadmin;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

// en gros ce fichier sert a verifier si un user est superadmin ou pas en fonction de son tgi 
public interface SuperAdminRepository extends JpaRepository<SuperAdmin, UUID> {
    boolean existsByUserTgi(String userTgi);
}