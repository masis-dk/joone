const fetch = require('isomorphic-unfetch');

module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    return config
  },
  /*async exportPathMap() {
    // Dynamic routes for /user/:id
    const products = await fetch('http://localhost:8080/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const productsResponse = await products.json();

    console.log('%cproductsResponse', 'color: red;', productsResponse);

    const productsURL = productsResponse.reduce(
      (base, current) => (Object.assign({}, base, {
        [ `/products/${current.id}` ]: {
          page: '/products/[id]',
          query: { id: current.id },
        }
      })), {}
    );



    return Object.assign( {}, productsURL, {
      '/': { page: '/' },
      '/products': { page: '/products' },
    } );
  }*/
};
