==============================
Types of Middleware:
==============================

| Type                   | Who creates it?  | Example                       |
| ---------------------- | ---------------- | ----------------------------- |
| Built-in Middleware    | Express          | `express.json()`              |
| Custom Middleware      | You              | `app.use((req,res,next)=>{})` |
| Third-party Middleware | Other developers | `morgan`, `cookie-parser`     |



| Middleware Type | Real Life Example              |
| --------------- | ------------------------------ |
| Built-in        | Features already inside phone  |
| Custom          | Settings you create yourself   |
| Third-party     | Apps installed from Play Store |


============================================
morgan(Third party middleware):
============================================
app.use(morgan('dev'));

'dev' is a predefined logging format in Morgan. It tells Morgan:
"Show request logs in development style."

Example Output:
When you visit /about:
GET /about 200 5.231 ms - 5

| Part     | Meaning                |
| -------- | ---------------------- |
| GET      | HTTP method            |
| /about   | Route                  |
| 200      | Status code            |
| 5.231 ms | Response time          |
| 5        | Response size in bytes |




✅ Best way (route-specific middleware) ====>

const middleware = (req, res, next) => {
  console.log("this is middleware");
  const a = 2;
  const b = 3;
  console.log(a + b);
  next();
};

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.send('about');
});

app.get('/contact', middleware, (req, res) => {
  res.send('contact');
});


🧠 Alternative (using app.use with path) ====>

app.use('/contact', (req, res, next) => {
  console.log("middleware only for contact");
  next();
});

Then your route stays simple:
app.get('/contact', (req, res) => {
  res.send('contact');
});