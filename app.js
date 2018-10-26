const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Mode',
//         pageContent: 'We will be right back.'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('scream', (content) => {
    return content.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Home Page',
        pageContent: 'Home page content'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        pageContent: 'About page content'
    });
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});