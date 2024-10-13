# Spring Boot Provider - Contract and Performance Testing

This project demonstrates a Spring Boot provider service with **Pact contract testing** and **k6 performance testing**.

## Table of Contents
- [Setup](#setup)
- [Running the Pact Tests](#running-the-pact-tests)
- [Publishing Pact Contracts](#publishing-pact-contracts)
- [Running Performance Tests](#running-performance-tests)

---

## Setup

### Prerequisites
- **Java 11+**
- **Gradle**
- **Pact Broker** (Dockerized version recommended)
- **k6** (for performance testing)


### Install Dependencies
This project uses Gradle to manage dependencies. Run the following command to install required dependencies:
```bash
./gradlew build
```

### Run the Spring Boot Application
To start the Spring Boot provider service on `http://localhost:8080`, use:
```bash
./gradlew bootRun
```

---

## Running the Pact Tests

### About Pact Tests
The Pact tests verify that the provider (Spring Boot app) meets the expectations defined by the consumer (NestJS app). This is done by comparing actual provider responses with the consumer-defined contract stored in the Pact Broker.

### Run the Provider Verification Tests
Provider tests use the Pact file from the Pact Broker to verify contract compliance.

1. **Run the Verification Test**:
    ```bash
   ./gradlew test
    ```

   The verification test will:
    - Fetch the Pact file from the Pact Broker.
    - Verify that the provider’s responses match the expectations in the contract.
    - Set up the necessary state with `@State` methods.

2. **Check the Results**: If all interactions match, the test passes, confirming that the provider meets the contract requirements.

---

## Publishing Pact Contracts

To publish a Pact contract after updating the consumer test or verification test:

1. Run the consumer test to generate the updated Pact file.
2. Publish the Pact file to the broker, including versioning and tagging:
    ```bash
   pact-broker publish ./pacts \
   --consumer-app-version "1.0.0" \
   --broker-base-url http://localhost:9292
   ```

---

## Running Performance Tests

### About k6 Performance Tests
The performance test assesses the provider’s response times, error rates, and scalability under varying loads.

### Setting Up k6

1. **Install k6**:
    - macOS:
   ```bash
   brew install k6
   ```
    - Other platforms:
      Follow instructions at [k6 Installation](https://k6.io/docs/getting-started/installation/).

### Running the Performance Test
The performance test script `performance-test.js` is included in the repository to test response times and error rates under regular and peak loads.

To execute the performance test, run:

```bash
k6 run perf-test/performance-test.js    
```

### Analyzing Results
k6 will output metrics directly in the terminal, including response times, error rates, and success rates. To generate a report:
- Use `--out json=output.json` to save data in JSON for visualization in tools like Grafana.

