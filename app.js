const express = require('express');
const hbs = require('hbs');
const api = 'AIzaSyCzVZpl_emFH8aVlp6-yS7ozkHlVRd0vbM';
const googleTranslate = require('google-translate')(api);
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Section'
    });
});

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        pageTitle: 'Help Section'
    });
});

app.get('submit', (req, res) => {
    res.render('submit.hbs', {
        pageTitle: 'Submit Section'
    });
});

app.post('/submit', (req, res) => {
    let language = req.body.language;
    let text = req.body.word;
    googleTranslate.translate(text, language, (err, translation) => {
        if(err) throw err;
            console.log(`${language}:> ${translation.translatedText}`);
        res.render('submit.hbs', {
            language, 
            text,
            translation: translation.translatedText
        });
    });
});


app.listen(3000, () => {
    console.log('Server is up for port 3000');
});