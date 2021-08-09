// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

// empty date string should return current timestamp
app.get('/api/', function (req, res) {
    d = new Date();
    res.json({ unix: Date.parse(d), utc: d.toUTCString() });
});
// timestamp API endpoint
app.get('/api/:date', function (req, res) {
    const date = req.params.date;
    let d;

    if (!isNaN(date)) {
        d = new Date(parseInt(date));
    } else if (!isNaN(Date.parse(date))) {
        d = new Date(date);
    } else {
        res.json({ error: 'invalid Date' });
    }

    const unixDate = Date.parse(d);
    const utcString = d.toUTCString();

    res.json({ unix: unixDate, utc: utcString });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
