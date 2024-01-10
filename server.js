const express = require('express');
const path = require('path');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const nocache = require('nocache');

const router = require('./router');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing the request body 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

// Load static 
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(nocache());

app.use('/route', router);

app.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/route/dashboard');

  const isLogout = req.query.isLogout;
  res.render('base', { title: 'Login System', isLogout });
});

app.listen(port, () => {
  console.log('Listening to the server on http://localhost:3000');
});
