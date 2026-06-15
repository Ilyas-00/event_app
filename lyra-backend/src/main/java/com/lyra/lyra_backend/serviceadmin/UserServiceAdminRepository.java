package com.lyra.lyra_backend.serviceadmin;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

// ce fichier sert a verifier si un user est service admin ou pas en fonction de son tgi
public interface UserServiceAdminRepository extends JpaRepository<UserServiceAdmin, UUID> {
    Optional<UserServiceAdmin> findByUserTgi(String userTgi);
    boolean existsByUserTgiAndServiceId(String userTgi, UUID serviceId);
}