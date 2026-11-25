package com.nexora.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Base exception for controlled business rule violations.
 */
public class BusinessException extends RuntimeException {

    private final HttpStatus status;

    public BusinessException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}

