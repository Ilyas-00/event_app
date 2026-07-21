package com.lyra.lyra_backend.me;

import com.lyra.lyra_backend.role.Role;
import com.lyra.lyra_backend.role.RoleResolver;
import com.lyra.lyra_backend.service.ServiceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.UUID;

@RestController
@RequestMapping("/api/me")
public class MeController {

    private final RoleResolver roleResolver;
    private final ServiceRepository serviceRepository;

    public MeController(RoleResolver roleResolver, ServiceRepository serviceRepository) {
        this.roleResolver = roleResolver;
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public ResponseEntity<MeResponse> getMe(@AuthenticationPrincipal Jwt jwt) {
        String tgi = jwt.getClaimAsString("preferred_username");
        Role role = roleResolver.getRole(tgi);
        UUID serviceId = roleResolver.getServiceId(tgi);

        String serviceName = serviceId != null
                ? serviceRepository.findById(serviceId).map(com.lyra.lyra_backend.service.Service::getName).orElse(null)
                : null;

        return ResponseEntity.ok(new MeResponse(tgi, role, serviceId, serviceName));
    }
}
