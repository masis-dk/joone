const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const PORT = 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded( {
    extended: true,
  } )
);

app.use((req, res, next) => {
  res.header( "Access-Control-Allow-Origin", "*" );
  res.header( "Access-Control-Allow-Headers", "*" );

  if (req.method === 'OPTIONS') {
    res.header( "Access-Control-Allow-Methods", "PUT, PATCH, PUT, DELETE, GET, POST" );
    return res.status( 200 ).json( {} );
  }

  next();
});

const queryProducts = require('./queries/products');

app.get('/products', queryProducts.getAllProducts);

app.get('/products/variants/:id', queryProducts.getVariantsProducts);

app.get('/product/:id', queryProducts.getProductById);

app.listen( PORT, () => {
  console.log(`App is running on port ${PORT} 🏎`);
});
