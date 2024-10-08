import { Pact } from '@pact-foundation/pact';
import * as path from 'path';
import axios from 'axios';

describe('Pact with Producer', () => {
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

  it('should receive a successful response', async () => {
    await provider.addInteraction({
      state: 'the producer has data',
      uponReceiving: 'a request for data',
      withRequest: {
        method: 'GET',
        path: '/api/data',
      },
      willRespondWith: {
        status: 200,
        body: {
          id: 1,
          name: 'Sample Data',
        },
      },
    });

    const response = await axios.get('http://localhost:1234/api/data');
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: 1, name: 'Sample Data' });

    await provider.verify();
  });
});
