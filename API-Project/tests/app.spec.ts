import request from 'supertest';
import app, { startServer } from '../src/server';
import { Server, IncomingMessage, ServerResponse } from 'http';

describe('GET /api/endpoint', () => {
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
    const port = 3000
    
    beforeAll(() => {
        server = startServer(3000);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should return a 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    // Ecrire d'autres tests ici

});