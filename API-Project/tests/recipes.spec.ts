import request from 'supertest';
import app, { startServer } from '../src/server';
import { Server, IncomingMessage, ServerResponse } from 'http';


describe('GET /recipes', () => {
    let server: Server<typeof IncomingMessage, typeof ServerResponse>;
    const port = 3002

    beforeAll(() => {
        server = startServer(port);
    });
  
    afterAll((done) => {
        server.close(done);
    });

    // /recipes/
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/recipes/');
        expect(response.status).toBe(200);
    }, 120000);

    // /recipes/:id
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/recipes/4444');
        expect(response.status).toBe(200);
    });

    it('should return a 400 status code', async () => {
        const response = await request(app).get('/recipes/oui');
        expect(response.status).toBe(400);
    });

    it('should return a 404 status code', async () => {
        const response = await request(app).get('/recipes/1');
        expect(response.status).toBe(404);
    });

    // /recipes/withingr/:ids
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/recipes/withingr/1928:2148:2809:2853:3723:6261:6335:7076');
        expect(response.status).toBe(200);
    });

    it('should return a 400 status code', async () => {
        const response = await request(app).get('/recipes/withingr/oui');
        expect(response.status).toBe(400);
    });

    it('should return a 400 status code', async () => {
        const response = await request(app).get('/recipes/withingr/2:oui:3');
        expect(response.status).toBe(400);
    });

    it('should return a 404 status code', async () => {
        const response = await request(app).get('/recipes/withingr/1');
        expect(response.status).toBe(404);
    });

    // /recipes/getcommentsdictionary/:id
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/recipes/getcommentsdictionary/4444');
        expect(response.status).toBe(200);
    });

    it('should return a 400 status code', async () => {
        const response = await request(app).get('/recipes/getcommentsdictionary/oui');
        expect(response.status).toBe(400);
    });

    it('should return a 400 status code', async () => {
        const response = await request(app).get('/recipes/getcommentsdictionary/');
        expect(response.status).toBe(400);
    });

    it('should return a 404 status code', async () => {
        const response = await request(app).get('/recipes/getcommentsdictionary/1');
        expect(response.status).toBe(404);
    });

    // /recipes/getratinglist/:id
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/recipes/getratinglist/4444');
        expect(response.status).toBe(200);
    });

    it('should return a 400 status code', async () => {
        const response = await request(app).get('/recipes/getratinglist/oui');
        expect(response.status).toBe(400);
    });

    it('should return a 400 status code', async () => {
        const response = await request(app).get('/recipes/getratinglist/');
        expect(response.status).toBe(400);
    });

    it('should return a 404 status code', async () => {
        const response = await request(app).get('/recipes/getratinglist/1');
        expect(response.status).toBe(404);
    });
});