const fetch = require('node-fetch');

const headers = {
  "Content-Type": "application/json",
  "X-Shopify-Access-Token": process.env.ACCESS_TOKEN,
};

const baseURL = `https://${process.env.API_KEY}:${process.env.ACCESS_TOKEN}@jooneparis.myshopify.com/admin/api/2020-10`;

const fields = 'id,title,image,images,options,product_type,variants';
const LIMIT_OF_PRODUCTS = '10';

/**
 * Return a product using product id
 * @param req
 * @param res
 */
function getProductById(req, res) {
  fetch(`${baseURL}/products/${req.params.id}.json`, {
    method: 'GET',
    headers
  })
    .then(res => res.json())
    .then(data => res.status(200).json(data))
    .catch(err => err);
}

/**
 * return list of products
 * @param req
 * @param res
 */
function getAllProducts(req, res) {
  let limit = req && req.query && req.query.limit && req.query.limit.toString() || LIMIT_OF_PRODUCTS;
  limit = Number(limit) > Number(LIMIT_OF_PRODUCTS) ? LIMIT_OF_PRODUCTS : limit;

  fetch(`${baseURL}/products.json?limit=${limit}&fields=${fields}`, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(data => res.status(200).json(data))
    .catch(err => err);
}

/**
 * return a list of product variant images
 * @param req
 * @param res
 */
function getVariantsProducts(req, res) {
  fetch(`${baseURL}/products/${req.params.id}/images/${req.query.imgid}.json`, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(data => res.status(200).json(data))
    .catch(err => err);
}

module.exports = {
  getProductById,
  getAllProducts,
  getVariantsProducts,
};
