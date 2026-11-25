package com.nexora.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
        controllers = SecurityConfigTest.ProbeController.class,
        properties = {
                "nexora.cors.allowed-origins=http://localhost:4200",
                "springdoc.swagger-ui.enabled=false"
        }
)
@Import({SecurityConfig.class, SecurityConfigTest.ProbeController.class})
class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void deniesUnauthenticatedRequestsByDefaultAndSetsSecurityHeaders() throws Exception {
        mockMvc.perform(get("/api/v1/protected-probe"))
                .andExpect(status().isUnauthorized())
                .andExpect(header().string("X-Content-Type-Options", "nosniff"))
                .andExpect(header().string("X-Frame-Options", "DENY"));
    }

    @Test
    void allowsConfiguredCorsOriginPreflight() throws Exception {
        mockMvc.perform(options("/api/v1/protected-probe")
                        .header("Origin", "http://localhost:4200")
                        .header("Access-Control-Request-Method", "GET"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:4200"));
    }

    @Test
    void encodesPasswordsWithBcryptWithoutPlaintextStorage() {
        String raw = "StrongEnterprisePass!2026";
        String encoded = passwordEncoder.encode(raw);

        assertThat(encoded).isNotEqualTo(raw);
        assertThat(encoded).startsWith("$2");
        assertThat(passwordEncoder.matches(raw, encoded)).isTrue();
    }

    @Test
    void rejectsWildcardCorsOrigin() {
        CorsProperties wildcardProps = new CorsProperties();
        wildcardProps.setAllowedOrigins(List.of("*"));
        SecurityConfig config = new SecurityConfig(wildcardProps, false);

        assertThatThrownBy(config::corsConfigurationSource)
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("wildcards");
    }

    @RestController
    static class ProbeController {
        @GetMapping("/api/v1/protected-probe")
        String probe() {
            return "ok";
        }
    }
}
