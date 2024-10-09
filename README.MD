# Pact Contract Testing for Microservices - Tutorial Project

This project demonstrates contract testing between a NestJS consumer and a Spring Boot producer using Pact. Follow these steps to set up, generate, and verify contracts in a microservices architecture.

## Prerequisites

- Docker & Docker Compose
- Node.js (14+)
- Java 17+
- Gradle

## Setup Instructions

### 1. Clone the Repository

    git clone <repository_url>
    cd <repository_directory>

### 2. Start the Pact Broker

Start the Pact Broker with Docker Compose:

    docker-compose up -d

This sets up a Pact Broker at `http://localhost:9292`.

### 3. Set Up the Consumer (NestJS)

1.  Navigate to `pact-consumer`:

        cd pact-consumer

2.  Install dependencies:

        npm install

3.  Run the consumer test to generate the Pact contract:

        npm run test

4.  Publish the Pact to the broker:

        pact-broker publish ./pacts --consumer-app-version <version> --broker-base-url http://localhost:9292

### 4. Set Up the Producer (Spring Boot)

1.  In a new terminal, navigate to `pact-producer`:

        cd pact-producer

2.  Run the Pact verification test:

        ./gradlew test

This will verify the provider’s compliance with the contract in the Pact Broker.

### 5. Verify Pact Contract in the Broker UI

Go to `http://localhost:9292` to view published Pact contracts and verification results.

---

## Project Structure

- **pact-consumer/**: NestJS-based consumer app with Pact tests.
- **pact-producer/**: Spring Boot producer app with verification tests.
- **docker-compose.yml**: Configuration for the Pact Broker.

## Troubleshooting

Ensure:

- Docker and Docker Compose are running.
- The Pact Broker is accessible at `http://localhost:9292`.
- Each service (consumer and producer) is correctly configured.

## Learn More

Visit the [Pact Documentation](https://docs.pact.io/) for in-depth guidance on contract testing with Pact.
