import request from 'supertest';
import app, { startServer } from '../src/server';
import { Server, IncomingMessage, ServerResponse } from 'http';


describe('GET /ingredients', () => {
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
    const port = 3001

    beforeAll(() => {
        server = startServer(3001);
    });
  
    afterAll((done) => {
        server.close(done);
    });

    // /ingredients/
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/ingredients/');
        expect(response.status).toBe(200);
    });

    // /ingredients/:id
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

    // /ingredients/letter/:letter
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/ingredients/letter/l');
        expect(response.status).toBe(200);
    });

    it('should return a 404 status code', async () => {
        const response = await request(app).get('/ingredients/letter/oui');
        expect(response.status).toBe(404);
    });

    it('should return a 400 status code', async () => {
        const response = await request(app).get('/ingredients/letter/');
        expect(response.status).toBe(400);
    });

    // /ingredients/filter/:prompt
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/ingredients/filter/car');
        expect(response.status).toBe(200);
    });

    it('should return a 404 status code', async () => {
        const response = await request(app).get('/ingredients/filter/slumaprottube');
        expect(response.status).toBe(404);
    });

    it('should return a 400 status code', async () => {
        const response = await request(app).get('/ingredients/filter/');
        expect(response.status).toBe(400);
    });
});