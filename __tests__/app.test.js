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
        expect(topic).toHaveProperty("description")
        expect(topic).toHaveProperty("slug")
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

describe("GET /api/articles/:article_id", () => {
  test("200: responds with specified article_id's information", () => {
    return request(app)
    .get("/api/articles/1")
    .expect(200)
    .then((response) => {
      const article = response.body.article
      expect(article.article_id).toBe(1)
      expect(article.title).toBe("Living in the shadow of a great man")
      expect(article.topic).toBe("mitch")
      expect(article.author).toBe("butter_bridge")
      expect(article.body).toBe("I find this existence challenging")
      expect(article.created_at).toBe("2020-07-09T20:11:00.000Z")
      expect(article.votes).toBe(100)
      expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
    })
  })
  test("404: responds with error if endpoint doesn't exist", () => {
    return request(app)
    .get("/api/articles/890")
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("Not found")
    })
  })
  test("400: responds with error if article_id is invalid", () => {
    return request(app)
    .get("/api/articles/notAnID")
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe("Bad request")
    })
  })
})

describe("GET /api/articles", () => {
  test("200: responds with array of articles objects with properties author, title, article_id, topic, created_at, votes, article_img_url, comment_count (sorted by created_at date and no body property)", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then((response) => {
      const articles = response.body.articles
      expect(articles).toBeSortedBy("created_at", {descending: true})
      articles.forEach((article) => {
        expect(article).toHaveProperty("author")
        expect(article).toHaveProperty("title")
        expect(article).toHaveProperty("article_id")
        expect(article).toHaveProperty("topic")
        expect(article).toHaveProperty("created_at")
        expect(article).toHaveProperty("votes")
        expect(article).toHaveProperty("article_img_url")
        expect(article).toHaveProperty("comment_count")
        expect(article).not.toHaveProperty("body")
      })
    })
  })
})

describe("GET /api/articles error handling", () => {
  test("404: responds with error if endpoint doesn't exist", () => {
    return request(app)
    .get("/api/endpointnotexist")
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("Not found")
    })
  })
})

describe("GET /api/articles/:article_id/comments", () => {
  test("200: responds with an array of comments for given article_id with properties comment_id, votes, created_at, author, body, article_id (sorted by comment created_at date", () => {
    return request(app)
    .get('/api/articles/3/comments')
    .expect(200)
    .then((response) => {
      const comments = response.body.comments
      expect(comments).toBeSortedBy("created_at", {descending: true})
      expect(comments.length).toBe(2)
      comments.forEach((comment) => {
        expect(comment).toHaveProperty("comment_id")
        expect(comment).toHaveProperty("votes")
        expect(comment).toHaveProperty("created_at")
        expect(comment).toHaveProperty("author")
        expect(comment).toHaveProperty("body")
        expect(comment).toHaveProperty("article_id")
        expect(comment.article_id).toBe(3)
      })
    })
  })
})

describe("GET /api/articles/:article_id/comments error handling", () => {
  test("404: responds with error if article doesn't exist", () => {
    return request(app)
    .get("/api/articles/744")
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("Not found")
    })
  })
  test("400: responds with error if article_id is invalid", () => {
    return request(app)
    .get("/api/articles/notAnID/comments")
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe("Bad request")
    })
  })
})

describe("POST /api/articles/:article_id/comments", () => {
  test("201: responds with newly added comment", () => {
    const newComment = {
      username: "butter_bridge",
      body: "i love node",
      article_title : "Running a Node App",
      votes: 22,
      created_at: 1602433380000
    }
    return request(app)
    .post("/api/articles/1/comments")
    .send(newComment)
    .expect(201)
    .then((response) => {
      const newlyPostedComment = response.body.comment
      expect(newlyPostedComment.article_id).toBe(1)
      expect(newlyPostedComment.body).toBe("i love node")
      expect(newlyPostedComment.author).toBe("butter_bridge")
      expect(newlyPostedComment).toHaveProperty("comment_id")
    })
  })
})

describe("POST /api/articles/:article_id/comments error handling", () => {
test("400: responds with error if invalid article_id", () => {
  const newComment = {
    username: "butter_bridge",
    body: "i love node",
    article_title : "Running a Node App",
    votes: 22,
    created_at: 1602433380000
  }
  return request(app)
  .post("/api/articles/notAnID/comments")
  .send(newComment)
  .expect(400)
  .then((response) => {
    expect(response.body.msg).toBe("Bad request")
  })
})
test("400: responds with error if comment is missing body", () => {
  const newComment = {
    username: "butter_bridge",
    article_title : "Running a Node App",
    votes: 22,
    created_at: 1602433380000
  }
  return request(app)
  .post("/api/articles/1/comments")
  .send(newComment)
  .expect(400)
  .then((response) => {
    expect(response.body.msg).toBe("missing comment body")
  })
})
test("404: responds with error if article does not exist", () => {
  const newComment = {
    username: "butter_bridge",
    body: "i love node",
    article_title : "Running a Node App",
    votes: 22,
    created_at: 1602433380000
  }
  return request(app)
  .post("/api/articles/4747/comments")
  .send(newComment)
  .expect(404)
  .then((response) => {
    expect(response.body.msg).toBe("Not found")
  })
  })
})

describe("PATCH /api/articles/article:id", () => {
  test("200: responds with updated votes by article_id (increments)", () => {
    return request(app)
    .patch("/api/articles/7")
    .send({ newVote: 10 })
    .expect(200)
    .then((response) => {
      const article = response.body.article
      expect(article.article_id).toBe(7)
      expect(article.votes).toBe(10)
    })
  })
  test("200: responds with updated votes by article_id (decrements)", () => {
    return request(app)
    .patch("/api/articles/7")
    .send({ newVote: -2 })
    .expect(200)
    .then((response) => {
      const article = response.body.article
      expect(article.article_id).toBe(7)
      expect(article.votes).toBe(-2)
    })
  })
})

describe("PATCH /api/articles/article:id error handling", () => {
  test("400: responds with error if invalid article_id", () => {
    return request(app)
    .patch("/api/articles/banana")
    .send({ newVote: -2 })
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe("Bad request")
    })
  })
  test("404: responds with error if article does not exist", () => {
    return request(app)
    .patch("/api/articles/47")
    .send({ newVote: 10 })
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("Not found")
    })
  })
})

describe("DELETE /api/comments/:comment_id", () => {
  test("204: deletes comment and responds with no content", () => {
    return request(app)
    .delete("/api/comments/1")
    .expect(204)
  })
})

describe("DELETE /api/comments/:comment_id error handling", () => {
  test("400: responds with error if invalid comment_id", () => {
    return request(app)
    .delete("/api/comments/banana")
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe("Bad request")
    })
  })
  test("404: responds with error if comment does not exist", () => {
    return request(app)
    .delete("/api/comments/3737")
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("Not found")
    })
  })
})