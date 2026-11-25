package com.nexora.config;

import jakarta.validation.constraints.NotEmpty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.List;

/**
 * Externalized CORS configuration bound from {@code nexora.cors.*}.
 */
@Validated
@ConfigurationProperties(prefix = "nexora.cors")
public class CorsProperties {

    @NotEmpty(message = "At least one allowed CORS origin must be configured")
    private List<String> allowedOrigins = List.of("http://localhost:4200");

    public List<String> getAllowedOrigins() {
        return allowedOrigins;
    }

    public void setAllowedOrigins(List<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }
}

