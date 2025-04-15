const db = require("../connection")
const format = require("pg-format")
const topicData = require("../data/development-data/topics")
const userData = require("../data/development-data/users")
const articleData = require("../data/development-data/articles")
const { convertTimestampToDate } = require("../seeds/utils")
const commentData = require("../data/development-data/comments")

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
  .query('DROP TABLE IF EXISTS comments') //<< write your first query in here.
  .then(() => {
    return db.query('DROP TABLE IF EXISTS articles');
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS users');
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS topics');
  })
  .then(() => {
    return db.query(`CREATE TABLE topics(
     slug VARCHAR(8000) PRIMARY KEY,
     description VARCHAR(8000),
     img_url VARCHAR(1000)
    );
    `)
    .then(() => {
      return db.query(`CREATE TABLE users(
        username VARCHAR(8000) PRIMARY KEY,
        name VARCHAR(8000),
        avatar_url VARCHAR(1000)
        );
        `)
    })
    .then(() => {
      return db.query(`CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(8000),
        topic VARCHAR(8000) REFERENCES topics(slug),
        author VARCHAR(8000) REFERENCES users(username),
        body TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000)
        );
        `)
    })
    .then(() => {
      return db.query(`CREATE TABLE comments(
       comment_id SERIAL PRIMARY KEY,
       article_id INT REFERENCES articles(article_id),
       article_title VARCHAR(8000),
       body TEXT,
       votes INT DEFAULT 0,
       author VARCHAR(8000) references users(username),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `)
    })
    .then (() => {
      const formatTopics = topicData.map((topic) => [
        topic.slug,
        topic.description,
        topic.img_url
      ]);
      const topicInsertStr = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L`,
        formatTopics
      );
      return db.query(topicInsertStr)
    })
    .then(() => {
      const formatUsers = userData.map((user) => [
        user.username,
        user.name,
        user.avatar_url
      ]);
      const userInsertStr = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L`,
        formatUsers
      );
      return db.query(userInsertStr)
    })
    .then(() => {
      const formatArticles = articleData.map((article) => {
        const convertArticle = convertTimestampToDate(article)
        return [
          convertArticle.title,
          convertArticle.topic,
          convertArticle.author,
          convertArticle.body, 
          convertArticle.created_at,
          convertArticle.votes,
          convertArticle.article_img_url]
      }
      );
      const articleInsertStr = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L`,
        formatArticles
      );
      return db.query(articleInsertStr)
    })
    .then(() => {
      const formatComments = commentData.map((comment) => {
        const convertComments = convertTimestampToDate(comment)
        return [
          convertComments.article_title,
          convertComments.body,
          convertComments.votes,
          convertComments.author,
          convertComments.created_at
        ]
      });
      const commentInsertStr = format(
        `INSERT INTO comments (article_title, body, votes, author, created_at) VALUES %L`,
        formatComments
      );
      return db.query(commentInsertStr)
    })
  })
};
module.exports = seed;
