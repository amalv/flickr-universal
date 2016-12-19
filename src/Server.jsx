import path from 'path';
import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import routes from './Routes';
import { store } from './components/Store';
import { fetchImages, enableCORS } from './api/serverApi';

const app = new Express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
const base = path.join(__dirname, '/');

app.set('view engine', 'ejs');
app.set('views', base);

app.use(Express.static(base));

app.use(enableCORS);

app.get('/api/images/:user/:items/:page', fetchImages);

app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      let markup;

      if (err) {
        return res.status(500).send(err.message);
      }

      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      if (renderProps) {
        markup = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
      } else {
        res.status(404);
      }

      return res.render('index', { markup });
    }
  );
});

app.listen(port, err => {
  if (err) { return console.error(err); }
  console.info(`Listening on http://localhost:${port} [${env}]`);
});
