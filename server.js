const http = require('http'); //install bydefault with nodejs

const server = http.createServer((req, res) => {  //createserver(method) server er instance return kre. server is creating on server variable, not running yet.

  if (req.url === '/') {
    console.log(req.url);
    res.end('default');
    console.log("last", req.url); //will not work because res.end() is called before this line, so the response is already sent and the connection is closed. Any code after res.end() will not be executed.
  }
  if (req.url === '/about') {
    console.log(req.url);
    res.end('about');
  }
  if (req.url === '/contact') {
    console.log(req.url);
    res.end('contact');
  }
});

server.listen(3000);