package com.nexora.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.Map;

/**
 * Standard REST API response envelope used across all Nexora endpoints.
 *
 * @param <T> payload type for successful responses
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
        boolean success,
        String message,
        T data,
        Map<String, String> errors,
        Instant timestamp
) {

    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(true, message, data, null, Instant.now());
    }

    public static ApiResponse<Void> error(String message) {
        return new ApiResponse<>(false, message, null, null, Instant.now());
    }

    public static ApiResponse<Void> validationError(String message, Map<String, String> fieldErrors) {
        return new ApiResponse<>(false, message, null, fieldErrors, Instant.now());
    }
}

