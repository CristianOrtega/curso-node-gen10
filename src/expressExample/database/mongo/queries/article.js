const { ArticleModel } = require('../models')

/**
 * @param {Object} article
 * @param {String} article.id
 * @param {String} article.name
 * @param {String} article.description
 * @param {Number} article.price
 * @returns saved article
 */
const saveArticle = async article => {
  const savedArticle = new ArticleModel(article);
  await savedArticle.save();
  return savedArticle;
}

/**
 * @param {String} id
 * @returns found Article
 */
const getOneArticle = async id => {
  const articles = await ArticleModel.find({ id });
  return articles[0];
  }

/**
 * @returns found Articles
 */
const getAllArticles = async () => {
  const articles = await ArticleModel.find();
  return articles;
}

/**
 * @param {String} id
 * @returns found Article
 */
const removeOneArticle = async id => {
  const article = await ArticleModel.findOneAndRemove({ id });
  return article;
}

/**
 * @param {Object} article
 * @param {String} article.id
 * @param {String|undefined} article.name
 * @param {String|undefined} article.description
 * @param {Number|undefined} article.price
 * @returns updated Article
 */
const updateOneArticle = async article => {
  const { id, name, description, price } = article
  const articleUpdated = await ArticleModel.findOneAndUpdate(
        { id }, 
        { name, description, price },
        { new: true }
  );
  return articleUpdated;
}

module.exports = {
    saveArticle,
    getAllArticles,
    getOneArticle,
    removeOneArticle,
    updateOneArticle
}
