const request = require('supertest');
const seed = require('../bin/seed').seed;

const db = require('../configs/db.config');
const app = require('../index');

beforeAll(async (done) => {
  process.env.NODE_ENV = 'test';
  await db
    .connect()
    .then(async () => {
      await seed();
      done();
    })
    .catch((err) => done(err));
});

afterAll(async (done) => {
  await db
    .close()
    .then(() => done())
    .catch((err) => done(err));
});

describe('GET /apps API test', () => {
  test('GET /api/apps', async (done) => {
    const res = await request(app).get('/api/apps');
    expect(res.body.length).toBe(50);
    expect(res.body[0].id).toBe(0);
    expect(res.body[49].id).toBe(49);
    done();
  });

  test('GET /api/apps?range={ "by" : "id" }', async (done) => {
    const res = await request(app).get(`/api/apps?range={"by":"id"}`);
    expect(res.body.length).toBe(50);
    expect(res.body[0].id).toBe(0);
    expect(res.body[49].id).toBe(49);
    done();
  });

  test('GET /api/apps?range={ "by": "id", "start": 5 }', async (done) => {
    const res = await request(app).get(
      `/api/apps?range={ "by": "id", "start": 5 }`
    );
    expect(res.body.length).toBe(50);
    expect(res.body[0].id).toBe(5);
    expect(res.body[49].id).toBe(54);
    done();
  });

  test('GET /api/apps?range={ "by": "id", "start": 1, "end": 5 }', async (done) => {
    const res = await request(app).get(
      `/api/apps?range={ "by": "id", "start": 1, "end": 5 }`
    );
    expect(res.body.length).toBe(5);
    expect(res.body[0].id).toBe(1);
    expect(res.body[4].id).toBe(5);
    done();
  });

  test('GET /api/apps?range={ "by": "id", "start": 1, "max": 5 }', async (done) => {
    const res = await request(app).get(
      `/api/apps?range={ "by": "id", "start": 1, "max": 5 }`
    );
    expect(res.body.length).toBe(5);
    expect(res.body[0].id).toBe(1);
    expect(res.body[4].id).toBe(5);
    done();
  });

  test('GET /api/apps?range={ "by": "id", "start": 1, "order": "desc" }', async (done) => {
    const res = await request(app).get(
      `/api/apps?range={ "by": "id", "start": 1, "order": "desc" }`
    );
    expect(res.body.length).toBe(50);
    expect(res.body[0].id).toBe(50);
    expect(res.body[49].id).toBe(1);
    done();
  });

  test('GET /api/apps?range={ "by": "name", "start": "my-app-001", "end": "my-app-050", "max": 10, "order": "asc" }', async (done) => {
    const res = await request(app).get(
      `/api/apps?range={ "by": "name", "start": "my-app-001", "end": "my-app-050", "max": 10, "order": "asc" }`
    );
    expect(res.body.length).toBe(10);
    expect(res.body[0].name).toBe('my-app-001');
    expect(res.body[9].name).toBe('my-app-010');
    done();
  });
});

describe('GET /apps API test error messages', () => {
  test('GET /api/apps with missing "by" parameter', async (done) => {
    const res = await request(app).get(`/api/apps?range={ "start": 0 }`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(`Search query parameter 'by' is required.`);
    done();
  });

  test('GET /api/apps with incorrect "by" parameter', async (done) => {
    const res = await request(app).get(
      `/api/apps?range={ "by": "ids", "start": 0 }`
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      `Search query parameter 'by' can only be 'id' or 'name'.`
    );
    done();
  });

  test('GET /api/apps with incorrect "order" parameter', async (done) => {
    const res = await request(app).get(
      `/api/apps?range={ "by": "id", "start": 0, "order": "dsc" }`
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      `Search query parameter 'order' can only be 'asc' or 'desc'.`
    );
    done();
  });
});
