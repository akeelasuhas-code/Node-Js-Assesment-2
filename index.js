const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Exercise 4 - Static files from public folder
app.use(express.static('public'));

// Exercise 1 - Serve index.html
app.get('/api/exercise1', (req, res) => {
    const filePath = path.join(__dirname, 'lib', 'index.html');
    fs.readFile(filePath, (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.status(200).type('text/html').send(data);
    });
});

// Exercise 2 - Serve users.txt as HTML table
app.get('/api/exercise2', (req, res) => {
    const filePath = path.join(__dirname, 'lib', 'users.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');

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

        res.status(200).type('text/html').send(tableHTML);
    });
});

// Exercise 3 - Serve home, about, contact pages
const pageMap = {
    home: 'home.html',
    about: 'about.html',
    contact: 'contact.html'
};

app.get('/api/exercise3/pages/:page', (req, res) => {
    const fileName = pageMap[req.params.page];
    if (!fileName) return res.status(404).send('Page Not Found');

    const filePath = path.join(__dirname, 'lib', fileName);
    fs.readFile(filePath, (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.status(200).type('text/html').send(data);
    });
});

// Start server locally
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
