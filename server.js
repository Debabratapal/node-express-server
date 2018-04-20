const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
const port = process.env.PORT || 3000;

var app = express();



hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to appent log file');
    }
  })
  next();
})

// app.use((req, res, next) => {
//   res.render('Maintainance');
// })
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    message: 'Welcome to the home page',
    //currentYear: new Date().getFullYear(),

  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
    //currentYear: new Date().getFullYear()
  });
})

app.listen(port, () => {
  console.log(`Server is started on Local Host ${port}`);
});
