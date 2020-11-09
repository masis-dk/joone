const fetch = require('isomorphic-unfetch');

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    return config
  },
  async exportPathMap() {
    // Dynamic routes for /user/:id
    const products = await fetch('http://localhost:8080/products');
    const productsResponse = await products.json();
    console.log('%cproductResponse', 'color: lime;', productsResponse);
    const productsURL = productsResponse.products.reduce(
      (base, current) => (Object.assign({}, base, {
        [ `/product/${current.id}` ]: {
          page: '/product/[id]',
          query: { id: current.id },
        }
      })), {}
    );



    return Object.assign( {}, productsURL, {
      '/': { page: '/' },
    } );
  }
};
