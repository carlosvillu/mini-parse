import UserController from './controller/users'
import UserMeController from './controller/me/user'
import jwt from 'express-jwt';
import nconf from 'nconf';

var express = require( 'express' ),
    bodyParser = require('body-parser'),
    ClassesController = require( './controller/classes' ),
    winston = require( 'winston' ),
    cors = require('cors'),
    classesController;
var app = express();

const SECRET_JWT = nconf.get( 'SECRET_JWT' ) || nconf.get( 'secret_jwt' )

app.use( cors() );
app.use( bodyParser() );

const userController = new UserController();
app.post('/users', userController.create);
app.get('/login', userController.login);

const userMeController = new UserMeController();
app.use('/me', jwt({secret: SECRET_JWT}))
app.get('/me', userMeController.one)
app.put('/me', userMeController.update)
app.delete('/me', userMeController.delete)

app.post( '/me/:className')
app.get( '/me/:className/:objectId')
app.put( '/me/:className/:objectId')
app.get( '/me/:className')
app.delete( '/me/:className/:objectId')

classesController = new ClassesController();
app.post( '/classes/:className', classesController.create.bind( classesController ) );
app.get( '/classes/:className/:objectId', classesController.one.bind( classesController ) );
app.put( '/classes/:className/:objectId', classesController.update.bind( classesController ) );
app.get( '/classes/:className', classesController.all.bind( classesController ) );
app.delete( '/classes/:className/:objectId', classesController.remove.bind( classesController ) );

module.exports = app;
