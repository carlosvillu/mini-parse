var express = require( 'express' ),
    bodyParser = require('body-parser'),
    ObjectsController = require( './controller/objects' ),
    winston = require( 'winston' ),
    objectsController;
app = express();

app.use( bodyParser() );

objectsController = new ObjectsController();
app.post( '/:className', objectsController.create.bind( objectsController ) );
app.get( '/:className/:objectId', objectsController.one.bind( objectsController ) );
app.put( '/:className/:objectId', objectsController.update.bind( objectsController ) );
app.get( '/:className', objectsController.all.bind( objectsController ) );
app.delete( '/:className/:objectId', objectsController.remove.bind( objectsController ) );

module.exports = app;
