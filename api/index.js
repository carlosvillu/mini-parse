var express = require( 'express' ),
    bodyParser = require('body-parser'),
    ObjectsApp = require( './objects' ),
    winston = require( 'winston' ),
    cors = require('cors'),
    objectsController;
app = express();

app.use( cors() );
app.use( ObjectsApp );

module.exports = app;
