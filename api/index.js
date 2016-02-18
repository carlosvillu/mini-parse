import UserController from './controller/users'

var express = require( 'express' ),
    bodyParser = require('body-parser'),
    ClassesController = require( './controller/classes' ),
    winston = require( 'winston' ),
    cors = require('cors'),
    classesController;
var app = express();

app.use( cors() );
app.use( bodyParser() );

const userController = new UserController();
app.post('/users', userController.create);
app.get('/login', userController.login);

classesController = new ClassesController();
app.post( '/classes/:className', classesController.create.bind( classesController ) );
app.get( '/classes/:className/:objectId', classesController.one.bind( classesController ) );
app.put( '/classes/:className/:objectId', classesController.update.bind( classesController ) );
app.get( '/classes/:className', classesController.all.bind( classesController ) );
app.delete( '/classes/:className/:objectId', classesController.remove.bind( classesController ) );

module.exports = app;
