const yargs = require('yargs');
const _ = require('lodash');
const fs = require('fs');
const api = 'AIzaSyCzVZpl_emFH8aVlp6-yS7ozkHlVRd0vbM';

const argv = yargs
    .options({
        language: {
            demand: true,
            alias: 'l',
            describe: 'Language you want to translate',
            string: true
        },
        text: {
            demand: true,
            alias: 't',
            describe: 'Text you want to translate',
            string: true
        }
    })
    .help()
    .argv;


const googleTranslate = require('google-translate')(api);

let text = argv.text;
let language = argv.language;
let list;

try {
    list = JSON.parse(fs.readFileSync('translations.json'));
} catch(e) {
    list = [];
}

console.log(`en:> ${text}`);
googleTranslate.translate(text, language, (err, translation) => {
    console.log(`${language}:> ${translation.translatedText}`);
    list.push({ text: text , translation: translation.translatedText });
    fs.writeFileSync('translations.json', JSON.stringify( list ));
});