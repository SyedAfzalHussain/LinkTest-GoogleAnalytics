//create express server

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());

//create a route for the app


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
}
);

app.post('/getUrl', (req, res) => {

    const url1 = req.body.url;
    var variable1 , variable;
    fetch(url1)
        .then(response => response.text())
        .then(html => {
            if (html.includes('gtm.js')) {
                variable = 'Google Search Console is enabled on this website</br>';
            } else {
                variable = 'Google Search Console is not enabled on this website</br>';
            }
            console.log("Afzal Kazmi is the King")

        })
        .catch(error => console.error(error));
        fetch(url1)
        .then(response => response.text())
        .then(html => {
            if (html.includes('googletagmanager')) {
                variable1 = 'Google  is enabled on this website</br>';
            } else {
                variable1 = `Google Tag Manager is not enabled on this website</br>`;
            }
            variable +=variable1;
            res.send({ "ans": variable });
        })
        .catch(error => console.error(error));
}
);

//start the server

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);