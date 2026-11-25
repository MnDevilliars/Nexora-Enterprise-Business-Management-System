package com.nexora;

import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.ApplicationContext;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Full application context + PostgreSQL + Flyway integration test.
 * Automatically skips when Docker is unavailable in the local environment.
 */
@SpringBootTest
@Testcontainers(disabledWithoutDocker = true)
class NexoraApplicationIntegrationTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    private Flyway flyway;

    @Test
    void contextLoadsAndBaselineFlywayMigrationIsApplied() {
        assertThat(applicationContext).isNotNull();
        assertThat(flyway.info().applied()).isNotEmpty();
    }
}

