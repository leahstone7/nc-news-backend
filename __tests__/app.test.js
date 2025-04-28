const endpointsJson = require("../endpoints.json");
const request = require("supertest")
const app = require("../api.js")
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index')
const db = require('../db/connection');

beforeEach(() => {
  return seed(data)
})

afterAll(() => {
  return db.end()
})

describe.only("GET /api responds with info from endpoint", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});