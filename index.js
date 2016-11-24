// connexion server
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';

var express = require("express");
var bodyParser = require("body-parser");
var couchbase = require("couchbase");
var path = require("path");
var config = require("./server/config");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports.bucket = (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);

app.use(express.static('./public'));
app.use(cors());
app.use(morgan('dev'));

var routes = require("./server/api/routes/todos.js")(app);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
