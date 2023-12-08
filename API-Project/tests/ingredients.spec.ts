import request from 'supertest';
import app, { startServer } from '../src/server';
import { Server, IncomingMessage, ServerResponse } from 'http';


describe('GET /ingredients', () => {
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
  
    beforeAll(() => {
      server = startServer();
    });
  
    afterAll((done) => {
      server.close(done);
    });
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/ingredients/');
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code', async () => {
    const response = await request(app).get('/ingredients/1');
    expect(response.status).toBe(200);
  });
  
  it('should return a 400 status code', async () => {
    const response = await request(app).get('/ingredients/l');
    expect(response.status).toBe(400);
  });

  it('should return a 404 status code', async () => {
    const response = await request(app).get('/ingredients/8024');
    expect(response.status).toBe(404);
  });

});