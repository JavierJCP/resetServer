import http2 from 'http2';
import fs from 'node:fs';

const server = http2.createSecureServer(
  {
    key: fs.readFileSync('./keys/server.key', 'utf-8'),
    cert: fs.readFileSync('./keys/server.crt', 'utf-8'),
  },
  (req, res) => {
    console.log(req.url);

    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write(`<h1>URL: ${req.url}</h1>`);
    // res.end();

    // const data = { name: 'John', age: 30 };
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(data));

    // if (req.url == null) return;
    if (req.url === '/') {
      const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlFile);
      return;
    }
    // else {
    //   res.writeHead(404, { 'Content-Type': 'text/html' });
    //   res.end();
    // }
    if (req.url?.endsWith('.js') ?? false) {
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
    } else if (req.url?.endsWith('.css') ?? false) {
      res.writeHead(200, { 'Content-Type': 'text/css' });
    }

    try {
      const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
      res.end(responseContent);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end();
    }
  }
);

server.listen(8080, () => {
  console.log(`🔴 Server running on https://localhost:8080`);
});
