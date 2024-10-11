package com.kaushaldalvi.springbootproducer;

import au.com.dius.pact.provider.junit5.HttpTestTarget;
import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junitsupport.Provider;
import au.com.dius.pact.provider.junitsupport.loader.PactBroker;
import au.com.dius.pact.provider.spring.junit5.PactVerificationSpringProvider;
import au.com.dius.pact.provider.junitsupport.State;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@Provider("SpringBootProducer")
@PactBroker(host = "localhost", port = "9292")
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT) // Ensures producer runs on specified port
public class ProducerPactVerificationTest {

    @BeforeEach
    void setup(PactVerificationContext context) {
        context.setTarget(new HttpTestTarget("localhost", 8080)); // Producer service port
    }

    @TestTemplate
    @ExtendWith(PactVerificationSpringProvider.class)
    void pactVerificationTestTemplate(PactVerificationContext context) {
        context.verifyInteraction();
    }

    // State change method to set up the required state
    @State("the producer has data") // Matches the "state" in the consumer's pact file
    public void toProducerState() {
        System.out.println("Setting up producer state for 'the producer has data'");
        // Add any setup needed here, like initializing data for the test
    }

    @State("user with ID 1 exists")
    public void userExistsState() {
        System.out.println("Setting up state for 'user with ID 1 exists'");
        // Setup any necessary data or conditions (e.g., add user data if necessary)
    }

    @State("user with ID 1 has orders")
    public void userHasOrdersState() {
        System.out.println("Setting up state for 'user with ID 1 has orders'");
        // Set up any data needed for this interaction, if necessary.
    }
}

//
