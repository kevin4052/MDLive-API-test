const request = require('supertest');

const db = require('../configs/db.config');
const app = require('../index');

const seed = require('../bin/seed').seed;

describe('GET /apps test', () => {
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

  test('GET /api/apps', async (done) => {
    const res = await request(app).get('/api/apps');
    expect(res.body.length).toBe(50);
    expect(res.body[0].id).toBe(0);
    expect(res.body[49].id).toBe(49);
    done();
  });

  test('GET /api/apps?range={"by":"id"}', async (done) => {
    const res = await request(app).get(`/api/apps?range={"by":"id"}`);
    expect(res.body.length).toBe(50);
    expect(res.body[0].id).toBe(0);
    expect(res.body[49].id).toBe(49);
    done();
  });

  test('GET /api/apps?range={"by":"id", "start":1}', async (done) => {
    const res = await request(app).get(
      `/api/apps?range={"by":"id", "start":1}`
    );
    expect(res.body.length).toBe(50);
    expect(res.body[0].id).toBe(1);
    expect(res.body[49].id).toBe(50);
    done();
  });
});
