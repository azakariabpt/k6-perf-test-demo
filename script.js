import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  thresholds: {
    // Define threshold for http_req_duration metric
    'http_req_duration': ['p(95)<200'], // 95th percentile response time < 200ms
  },
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const res = http.get('http://localhost:5004/finance/KeyFigure');
  // check(res, {
  //   'status was 200': (r) => r.status == 200,
  //   // Add check for response time
  //   'response time below 300ms': (r) => r.timings.duration < 300,
  // });

  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
