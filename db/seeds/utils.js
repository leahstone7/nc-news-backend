const db = require("../../db/connection");
const articles = require("../data/test-data/articles");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (articlesData) => {
  if(articlesData.length === 0){
    return {};
  }
  const result = {} 
  articlesData.forEach((article) => {
    result[article.title] = article.article_id;
  });
  return result
  
};


