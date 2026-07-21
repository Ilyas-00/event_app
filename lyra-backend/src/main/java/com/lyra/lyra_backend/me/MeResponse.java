package com.lyra.lyra_backend.me;

import com.lyra.lyra_backend.role.Role;
import java.util.UUID;

public record MeResponse(
        String tgi,
        Role role,
        UUID serviceId,
        String serviceName
) {}
