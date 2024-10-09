// pact/consumer.pact.spec.ts

import { Pact } from '@pact-foundation/pact';
import * as path from 'path';
import axios from 'axios';

describe('Pact with Producer for User Details', () => {
  const provider = new Pact({
    consumer: 'NestJSConsumer',
    provider: 'SpringBootProducer',
    port: 1234,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'info',
  });

  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  it('should return user details for a given ID', async () => {
    await provider.addInteraction({
      state: 'user with ID 1 exists',
      uponReceiving: 'a request for user details by ID',
      withRequest: {
        method: 'GET',
        path: '/api/users/1',
      },
      willRespondWith: {
        status: 200,
        body: {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com',
        },
      },
    });

    const response = await axios.get('http://localhost:1234/api/users/1');
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    await provider.verify();
  });
});
