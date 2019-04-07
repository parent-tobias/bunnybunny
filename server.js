const express = require('express'),
      exphbs = require('express-handlebars'),
      mongoose = require('mongoose'),
      Fortune = require('./models/fortune');

let app = express();

// The mongo setup, using mlab rather than a local dev
mongoose.connect('mongodb://<USERNAME>:<PASSWORD>@ds233596.mlab.com:33596/bunnybunny');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(){
  console.log("We have a database! Yaay");
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));


app.get('/', function(req, res){
  res.render('home');
});
app.get('/about', function(req, res){
  
  let fortune = new Fortune({text: 'To kick with sore toe only hurts foot.'})
  
  res.render('about');
});

// 404 handler
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

// 500 error handler
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
})

app.listen(3030);