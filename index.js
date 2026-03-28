const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// ── Exercise 1 ──────────────────────────────────────────────
app.get('/api/exercise1', (req, res) => {
    try {
        const filePath = path.resolve(__dirname, 'lib', 'index.html');
        const data = fs.readFileSync(filePath);
        res.status(200).type('text/html').send(data);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// ── Exercise 2 ──────────────────────────────────────────────
app.get('/api/exercise2', (req, res) => {
    try {
        const filePath = path.resolve(__dirname, 'lib', 'users.txt');
        const data = fs.readFileSync(filePath, 'utf8');

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
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// ── Exercise 3 ──────────────────────────────────────────────
const pageMap = {
    home: 'home.html',
    about: 'about.html',
    contact: 'contact.html'
};

app.get('/api/exercise3/pages/:page', (req, res) => {
    const fileName = pageMap[req.params.page];
    if (!fileName) return res.status(404).send('Page Not Found');

    try {
        const filePath = path.resolve(__dirname, 'lib', fileName);
        const data = fs.readFileSync(filePath);
        res.status(200).type('text/html').send(data);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// ── Exercise 4 ──────────────────────────────────────────────
app.get('/:filename', (req, res) => {
    const fileName = req.params.filename;
    if (!fileName.endsWith('.html')) return res.status(404).send('Not Found');

    try {
        const filePath = path.resolve(__dirname, 'public', fileName);
        const data = fs.readFileSync(filePath);
        res.status(200).type('text/html').send(data);
    } catch (err) {
        res.status(404).send('File Not Found: ' + err.message);
    }
});

// ── Export for Vercel ────────────────────────────────────────
module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
