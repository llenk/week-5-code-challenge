var express = require('express');
var bodyParser = require('body-parser');
const pool = require('./modules/pool');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(bodyParser.json());

app.get('/message', function(req, res) {
    pool.query(`SELECT * FROM "messages";`)
        .then(function(response) {
            res.send(response.rows)
        }).catch(function(error) {
            console.log(error);
            res.send(500);
        });
});

app.post('/message', function(req, res) {
    pool.query(`INSERT INTO "messages" ("name", "message")
        VALUES ($1, $2)`, [req.body.name, req.body.message])
        .then(function(response) {
            res.send(200);
        }).catch(function(error) {
            res.send(500);
        });
});

app.listen(port, function(){
    console.log('listening on port', port);  
});