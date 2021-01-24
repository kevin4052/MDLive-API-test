process.env.TEST = 'test';

const { expect } = require('chai');
const { request } = require('supertest');

const app = require('../index');

require('../configs/db.config');

describe('GET /apps test', () => {});
