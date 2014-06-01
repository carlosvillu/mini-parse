var express = require( 'express' ),
    bodyParser = require('body-parser'),
    ClassesController = require( './controller/classes' ),
    winston = require( 'winston' ),
    classesController;
app = express();

var handler = function(req, res, next){ 
  res.json( {
    class: req.params.className,
    objectId: req.params.objectId
  } );
};

app.use( bodyParser() );

classesController = new ClassesController();
app.post( '/:className', classesController.create.bind( classesController ) );
app.get( '/:className/:objectId', classesController.one.bind( classesController ) );
app.put( '/:className/:objectId', classesController.update.bind( classesController ) );
app.get( '/:className', classesController.all.bind( classesController ) );
app.delete( '/:className/:objectId', classesController.remove.bind( classesController ) );

module.exports = app;
