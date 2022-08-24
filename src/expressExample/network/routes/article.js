const { Router } = require('express')
const { nanoid } = require('nanoid')

const { mongo: { queries } } = require('../../database')
const response = require('./response')

const ArticleRouter = Router();
const {
  article: {
    getAllArticles,
    saveArticle,
    removeOneArticle,
    updateOneArticle,
    getOneArticle
  }
} = queries;

const SERVICE_NAME = `/article`;

ArticleRouter.route(`${SERVICE_NAME}`)
  .get(async (req, res) => {
    try {
      const articles = await getAllArticles();
      response({ error: false, message: articles, res, status: 200 })
    } catch (error) {
      console.error(error)
      response({ message: 'Internal server error', res })
    }
  })
  .post(async (req, res) => {
    try {
      console.log(req);
      const { body: { name, description, price } } = req
      await saveArticle({
        id: nanoid(),
        name,
        description,
        price
      })
      response({ error: false, message: await getAllArticles(), res, status: 201 })
    } catch (error) {
      console.error(error)
      response({ message: 'Internal server error', res })
    }
  })

ArticleRouter.route(`${SERVICE_NAME}/:id`) 
  .get(async (req, res) => {
    try {
      const { params: { id } } = req
      const article = await getOneArticle(id)
      console.log(article);
      response({ error: false, message: article, res, status: 200 })
    } catch (error) {
      console.error(error)
      response({ message: 'Internal server error', res })
    }
  })
  .delete(async (req, res) => {
    try {
      const { params: { id } } = req
      await removeOneArticle(id)
      response({ error: false, message: await getAllArticles(), res, status: 200 })
    } catch (error) {
      console.error(error)
      response({ message: 'Internal server error', res })
    }
  })
  .patch(async (req, res) => {
    const {
      body: { name, description, price },
      params: { id }
    } = req

    try {
      await updateOneArticle({ id, name, description, price })
      response({ error: false, message: await getAllArticles(), res, status: 200 })
    } catch (error) {
      console.error(error)
      response({ message: 'Internal server error', res })
    }
  })

module.exports = ArticleRouter