Set Up the Consumer (NestJS)

1.  Navigate to `pact-consumer`:

        cd pact-consumer

2.  Install dependencies:

        npm install

3.  Run the consumer test to generate the Pact contract:

        npm test test/pact/consumer.data.pact.spec.ts
        npm test test/pact/consumer.user.pact.spec.ts
        npm test test/pact/consumer.order.pact.spec.ts

4.  Publish the Pact to the broker:

        pact-broker publish ./pacts --consumer-app-version 1.0.0 --broker-base-url http://localhost:9292
