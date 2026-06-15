package com.lyra.lyra_backend.role;


import com.lyra.lyra_backend.serviceadmin.UserServiceAdmin;
import com.lyra.lyra_backend.serviceadmin.UserServiceAdminRepository;
import com.lyra.lyra_backend.superadmin.SuperAdminRepository;

import java.util.UUID;

import org.springframework.stereotype.Component;

@Component
public class RoleResolver {

    private final SuperAdminRepository superAdminRepository;
    private final UserServiceAdminRepository userServiceAdminRepository;

    public RoleResolver(SuperAdminRepository superAdminRepository,
                        UserServiceAdminRepository userServiceAdminRepository) {
        this.superAdminRepository = superAdminRepository;
        this.userServiceAdminRepository = userServiceAdminRepository;
    }

    public Role getRole(String tgi) {
        if (superAdminRepository.existsByUserTgi(tgi)) {
            return Role.SUPER_ADMIN;
        }
        if (userServiceAdminRepository.findByUserTgi(tgi).isPresent()) {
            return Role.SERVICE_ADMIN;
        }
        return Role.USER;
    }
    public UUID getServiceId(String tgi) {
    return userServiceAdminRepository.findByUserTgi(tgi)
            .map(UserServiceAdmin::getServiceId)
            .orElse(null);
}
}