# NestJS Consumer - Contract Testing with Pact

This project demonstrates a NestJS consumer service with **Pact contract testing** to ensure compatibility with a Spring Boot provider service.

## Table of Contents
- [Setup](#setup)
- [Running the Pact Consumer Tests](#running-the-pact-consumer-tests)
- [Publishing Pact Contracts](#publishing-pact-contracts)
- [Viewing Pact Contract Details](#viewing-pact-contract-details)

---

## Setup

### Prerequisites
- **Node.js** (version 14+ recommended)
- **Pact Broker** (Dockerized version recommended)


### Install Dependencies
Install all required dependencies for the NestJS consumer:

```bash
npm install
```

---

## Running the Pact Consumer Tests

### About Pact Consumer Tests
The Pact consumer tests define the expected interactions that the consumer (NestJS) requires from the provider (Spring Boot). These tests create a contract that specifies the paths, methods, expected response structures, and data formats.

### Running the Tests
To run the Pact tests and generate the contract:

```bash
npm run test
```

- This will execute the Pact tests for the consumer and create a Pact file under the `pacts` directory with details of expected interactions.
- The generated Pact file specifies all interactions between the consumer and provider, acting as the contract for verification.

---

## Publishing Pact Contracts

To publish the generated Pact contract to the Pact Broker:

1. Run the consumer test to generate the updated Pact file.
2. Publish the Pact file to the broker with versioning and tagging:

```bash
pact-broker publish ./pacts \
--consumer-app-version "1.0.0" \
--broker-base-url http://localhost:9292
```

This command:
- Publishes the Pact file to the Pact Broker.

---

## Viewing Pact Contract Details

Once published, you can view the contract details in the Pact Broker UI:

1. Open the Pact Broker URL (e.g., `http://localhost:9292`).
2. Find and select the **NestJSConsumer - SpringBootProducer** contract to see the versioned details of interactions and any associated tags.
3. To access the raw JSON with additional metadata, download the Pact file from the broker.
