// test/pact/order.pact.spec.ts

import { Pact, Matchers } from '@pact-foundation/pact';
import * as path from 'path';
import axios from 'axios';

const { like } = Matchers;

describe('Pact with Producer - Order Details', () => {
  const provider = new Pact({
    consumer: 'NestJSConsumer',
    provider: 'SpringBootProducer',
    port: 4321,
    log: path.resolve(process.cwd(), 'logs', 'pact-order.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'info',
  });

  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  it('should return order details for a given user ID', async () => {
    await provider.addInteraction({
      state: 'user with ID 1 has orders',
      uponReceiving: 'a request for order details by user ID',
      withRequest: {
        method: 'GET',
        path: '/api/users/1/orders',
        headers: {
          Accept: 'application/json',
        },
      },
      willRespondWith: {
        status: 200,
        body: {
          userId: like(1),
          name: like('John Doe'),
          email: like('johndoe@example.com'),
          orders: [
            {
              orderId: like(101),
              date: like('2023-10-10'),
              total: like(150.5),
              items: [
                {
                  productId: like('A1'),
                  name: like('Product A'),
                  quantity: like(2),
                  price: like(50.25),
                },
                {
                  productId: like('B2'),
                  name: like('Product B'),
                  quantity: like(1),
                  price: like(50.0), // Using like() matcher for price flexibility
                },
              ],
            },
          ],
        },
      },
    });

    const response = await axios.get(
      'http://localhost:4321/api/users/1/orders',
      {
        headers: { Accept: 'application/json' },
      },
    );
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      userId: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      orders: [
        {
          orderId: 101,
          date: '2023-10-10',
          total: 150.5,
          items: [
            {
              productId: 'A1',
              name: 'Product A',
              quantity: 2,
              price: 50.25,
            },
            {
              productId: 'B2',
              name: 'Product B',
              quantity: 1,
              price: 50.0,
            },
          ],
        },
      ],
    });

    await provider.verify();
  });
});
