const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getFullYear', () => {
  return (new Date()).getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine', hbs);

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  let now = (new Date()).toString();

  var log = `${now}: ${req.method}, ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });

  console.log(log);

  next();
});

debugger;

app.use((req, res, next) => {
  res.render('maintanance.hbs');
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Welcome Page',
    message: 'Welcome, here is the page of me, Ece',
    currentYear: (new Date()).getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    message: 'Page about Ece :):):)',
    currentYear: (new Date()).getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    type: 'Error',
    message: 'Unable to load that page!!!'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
