import request from 'supertest';
import app, { startServer } from '../src/server';
import { Server, IncomingMessage, ServerResponse } from 'http';


describe('GET /steps', () => {
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
    const port = 3003

    beforeAll(() => {
        server = startServer(port);
    });
  
    afterAll((done) => {
        server.close(done);
    });

    // /steps/:id
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/steps/4444');
        expect(response.status).toBe(200);
    });

    it('should return a 400 status code', async () => {
        const response = await request(app).get('/steps/hey');
        expect(response.status).toBe(400);
    });

    it('should return a 404 status code', async () => {
        const response = await request(app).get('/steps/1');
        expect(response.status).toBe(404);
    });
});