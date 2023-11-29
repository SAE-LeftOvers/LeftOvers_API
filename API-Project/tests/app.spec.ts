import request from 'supertest';
import app from '../src/server';

describe('GET /api/endpoint', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  // Add more test cases as needed
});