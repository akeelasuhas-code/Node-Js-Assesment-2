const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Exercise 4 server running on port ${PORT}`);
    console.log(`Access at:`);
    console.log(`  http://localhost/home.html`);
    console.log(`  http://localhost/about.html`);
    console.log(`  http://localhost/contact.html`);
});
