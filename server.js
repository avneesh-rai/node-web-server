const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n', (error) => {
    if (error) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// app.get('/', (request, response) => {
//   // response.send('<h1>Hello Express!</h1>');
//   response.send({
//     name: 'Avneesh',
//     likes: [
//       'cricket',
//       'table tennis'
//     ]
//   });
// });

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitile: 'Home page',
    // currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitile: 'About page'
  });
});

app.get('/projects', (request, response) => {
  response.render('project.hbs', {
    pageTitile: 'Projects'
  })
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Server is not able to fufil request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
