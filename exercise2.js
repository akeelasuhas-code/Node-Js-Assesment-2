const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/api/exercise2') {
        const filePath = path.join(__dirname, 'lib', 'users.txt');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            const lines = data.trim().split('\n');
            const headers = lines[0].split('|').map(h => h.trim());

            let tableHTML = '<table border="1" cellpadding="8" cellspacing="0">\n  <tr>\n';
            headers.forEach(header => {
                tableHTML += `    <th>${header}</th>\n`;
            });
            tableHTML += '  </tr>\n';

            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                const cols = line.split('|').map(c => c.trim());
                tableHTML += '  <tr>\n';
                cols.forEach(col => {
                    tableHTML += `    <td>${col}</td>\n`;
                });
                tableHTML += '  </tr>\n';
            }
            tableHTML += '</table>';

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(tableHTML);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Exercise 2 server running on port ${PORT}`);
    console.log(`Access at: http://localhost/api/exercise2`);
});
