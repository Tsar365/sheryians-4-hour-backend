const express = require('express'); //express use http behind the scene
const app = express();
const morgan = require('morgan');
const userModel = require('./models/user');
const dbConnection = require('./config/db');

app.use(morgan('dev')); //will run later than the custom middleware, because it is placed after the custom middleware in the code.

//re.body te data pawar jnno ei 2 ta use krte hbe, jodi json data pathano hoy tahole express.json() use krte hbe, jodi form data pathano hoy tahole express.urlencoded() use krte hbe.
app.use(express.json()); //body parser, json data parse kore req.body te rakhbe, for example: { "username": "john", "email": "
app.use(express.urlencoded({ extended: true })); //form data parse kore req.body te rakhbe, for example: { "username": "john", "email": "john@example.com" }
app.use(express.static('public')); //static file serve korar jonno, public folder er vitore je file gulo thakbe se gulo static file hisebe serve hobe, for example: /public/style.css will be served as /style.css

app.set('view engine', 'ejs'); //set method use kore view engine set kora hoyeche, ejs use korar jonno

app.use((req, res, next) => {  //always put middleware before all routes
  console.log("this is middleware");
  const a = 2
  const b = 3
  console.log(a + b);
  return next();
});

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/register', (req, res) => { //will show the form
  res.render('register');
});

app.post('/register', async (req, res) => { //will handle the form data
  const { username, email, password } = req.body;
  const newUser=await userModel.create({
    username: username,
    email: email,
    password: password
  }); //data save in db

  res.send(newUser);
});


app.get('/test',  //route-specific middleware

  (req, res, next) => {
    const a = 5;
    const b = 7;
    console.log(a + b);
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

app.get('/form-get', (req, res) => { //het method e paraemtre e all data dkhabe
  console.log(req.query); //query parameter dekhabe, for example: /form-get?username=john&email=john@example.com
  res.send('data received');
});

app.post('/form-post', (req, res) => { //post method e body e data dkhabe
  console.log(req.body); //body parameter dekhabe, for example: /form-post with a POST request containing JSON data
  res.send('data received');
});

app.listen(3000);