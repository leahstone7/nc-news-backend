NC News Backend
This is the backend API for the NC News project, built using Node.js, Express, and PostgreSQL. It provides a RESTful API for accessing, creating, updating, and deleting news articles, comments, topics, and users from a PostgreSQL database.

The hosted API is available here:
https://nc-news-backend-project.onrender.com/api

Features:
Serve JSON data for articles, topics, users, and comments.

Full CRUD functionality for comments and articles.

Filter and sort articles by topic, date, comment count, and more.

Robust error handling and custom error messages.

Follows RESTful principles with a clear and consistent API structure.

Technologies:
Node.js

Express

PostgreSQL

pg-promise

Jest & Supertest (for testing)

To set up the environment for development and testing:

1. Create a new file in the root directory called .env.development

2. Inside .env.development, add the following line:
    PGDATABASE=nc_news

3. Create another file called .env.test

4. Inside .env.test, add the following line:
    PGDATABASE=nc_news_test


🔧 Endpoints Include:
GET /api/topics – get all topics

GET /api/articles – get all articles with sorting & filtering

GET /api/articles/:article_id – get an article by ID

GET /api/articles/:article_id/comments – get comments for an article

POST /api/articles/:article_id/comments – post a comment

PATCH /api/articles/:article_id – update article votes

DELETE /api/comments/:comment_id – delete a comment

GET /api/users – get all users

