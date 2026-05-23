const express = require('express'); //express use http behind the scene
const app = express();
const morgan = require('morgan'); 

app.use(morgan('dev')); //will run later than the custom middleware, because it is placed after the custom middleware in the code.

app.set('view engine', 'ejs'); //set method use kore view engine set kora hoyeche, ejs use korar jonno

app.use((req, res, next) => {  //always put middleware before all routes
  console.log("this is middleware");
  const a=2
  const b=3
  console.log(a+b);
   return next(); 
}); 

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/test',  //route-specific middleware

   (req, res, next)=>{
  const a=5;
  const b=7;
  console.log(a+b);
  return next();
}, 

(req, res) => {
  res.send('test');
});

app.get('/about', (req, res) => {
  res.send('about');
});

app.get('/contact', (req, res) => {
  res.send('contact');
});

app.listen(3000);