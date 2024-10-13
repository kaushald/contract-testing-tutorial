import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests should be under 500ms
        http_req_failed: ['rate<0.01'],   // Less than 1% of requests should fail
    },
    scenarios: {
        regular_load: {
            executor: 'constant-arrival-rate',
            rate: 5,            // Regular load of 5 requests per second
            timeUnit: '1s',
            duration: '1m',      // Test duration for regular load scenario
            preAllocatedVUs: 2,
            maxVUs: 10,
        },
        peak_load: {
            executor: 'ramping-arrival-rate',
            startRate: 5,       // Start with 50 requests per second
            timeUnit: '1s',
            stages: [
                { target: 20, duration: '30s' }, // Ramp up to 200 RPS in 30s
                { target: 20, duration: '30s' }, // Sustained peak load
                { target: 5, duration: '30s' },  // Ramp down to regular load
            ],
            preAllocatedVUs: 5,
            maxVUs: 20,
        }
    }
};

export default function () {
    const res = http.get('http://localhost:8080/api/users/1/orders');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
    });
    sleep(1);
}
