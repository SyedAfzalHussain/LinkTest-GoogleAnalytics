//create express server

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//create a route for the app


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
}
);

app.post('/getUrl', (req, res) => {

    const url1 = req.body.url;
    var variable = '';
    fetch(url1)
        .then(response => response.text())
        .then(html => {
            if (html.includes('gtm.js') && html.includes('googletagmanager.com')) {
                variable += `Google tag Manager is enabled on this website</br>`;
            } else {
                variable += `Google tag Manager is not enabled on this website</br>`;
            }
            res.send({ "ans": variable });
        })
        .catch(error => console.error(error));
}
);

app.post('/getGTM', (req, res) => {
    console.log("getGTM")
    const url1 = req.body.url;
    var variable = '';
    fetch(url1)
        .then(response => response.text())
        .then(html => {
            if (html.includes('google-my-business')) {
                variable += `Google My Business is enabled on this website</br>`;
            } else {
                variable += `Google My Business is not enabled on this website</br>`;
            }
            res.send({ "ans": variable });
        })
        .catch(error => console.error(error));

});

app.post('/getDomain', (req, res) => {
    console.log("getDomain")
    const url1 = req.body.url;
    var variable = '';
    fetch(url1)
        .then(response => response.text())
        .then(html => {
            if (html.includes(`google-site-verification`)) {
                variable += `Google Search Console is enabled on this website</br>`;
            } else {
                variable += `Google Search Console is not enabled on this website</br>`;
            }
            console.log(variable)
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