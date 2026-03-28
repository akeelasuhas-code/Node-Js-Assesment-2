const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const pageMap = {
    '/api/exercise3/pages/home': 'home.html',
    '/api/exercise3/pages/about': 'about.html',
    '/api/exercise3/pages/contact': 'contact.html'
};

const server = http.createServer((req, res) => {
    const fileName = pageMap[req.url];

    if (fileName) {
        const filePath = path.join(__dirname, 'lib', fileName);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Exercise 3 server running on port ${PORT}`);
    console.log(`Access at:`);
    console.log(`  http://localhost/api/exercise3/pages/home`);
    console.log(`  http://localhost/api/exercise3/pages/about`);
    console.log(`  http://localhost/api/exercise3/pages/contact`);
});
