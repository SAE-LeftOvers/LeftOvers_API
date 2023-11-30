import request from 'supertest';
import app, {server} from '../src/server';

describe('GET /api/endpoint', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  // Ecrire d'autres tests ici

  server.close()
});