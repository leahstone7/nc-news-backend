const endpointsJson = require("../endpoints.json");
const request = require("supertest")
const app = require("../api.js")
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index')
const db = require('../db/connection');
const { reduceRight } = require("../db/data/test-data/articles.js");

beforeEach(() => {
  return seed(data)
})

afterAll(() => {
  return db.end()
})

describe("GET /api responds with info from endpoint", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: responds with array of topic objects with properties slug and description", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then((response) => {
      const topics = response.body.topics
      expect(topics.length).toBe(3)
      topics.forEach((topic) => {
        expect(typeof topic.description).toBe("string")
        expect(typeof topic.slug).toBe("string")
      })
    })
  })
  test("404: responds with error if endpoint doesn't exist", () => {
    return request(app)
    .get("/api/endpointnotexist")
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("Not found")
    })
  })
})