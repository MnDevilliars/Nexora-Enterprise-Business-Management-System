package com.nexora.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Thrown when a requested domain resource cannot be found within the authorized scope.
 */
public class ResourceNotFoundException extends BusinessException {

    public ResourceNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}

