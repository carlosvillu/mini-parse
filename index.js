var express = require( 'express' ),
    nconf = require( 'nconf' ),
    logger = require( 'morgan' ),
    winston = require( 'winston' ),
    api = require( './api' );

app = express();

nconf.argv()
     .env()
     .file( { file: __dirname + '/configs/development.json' } );

app.use( logger() );

app.use( '/1/classes', api );

app.listen( nconf.get( 'app:port' ), function(){
  winston.log( 'info', 'App ready and running in http://localhost:%s', nconf.get( 'app:port' ) );
} );
