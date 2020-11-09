const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cors());
  server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    /*res.header("Content-Type", "application/json");
    res.header("Accept", "application/json");*/
    next();
  });

  server.get( '/product/:id', ( req, res ) =>
    app.render( req, res, '/product/[id]', Object.assign( { id: req.params.id } ) )
  );

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`)
  })
});
