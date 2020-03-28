const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const api = 'AIzaSyCzVZpl_emFH8aVlp6-yS7ozkHlVRd0vbM';
const googleTranslate = require('google-translate')(api);

let port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Section'
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

        res.render('submit.hbs', {
            pageTitle: 'Submit Section',
            language, 
            text,
            translation: translation.translatedText
        });
    });
});


app.listen(port, () => {
    console.log('Server is up for port ' + port);
});