var AbstractModel = require( './../../../model/abstract' ),
    JSONStream = require('JSONStream');

var ObjectsController = function(){
  this.AbstractModel = AbstractModel;
  this.JSONStream = JSONStream;
};

ObjectsController.prototype = {
  create: function( req, res, next ){
    new this.AbstractModel( req.params.className )
      .body( req.body )
      .save( function( err, doc ){
        res.set( 'Location', req.protocol + '://' + req.get('host') + req.originalUrl + '/' + doc._id  )
        res.json( 201, {createdAt: doc.createdAt, objectId: doc._id} );
      } );
  },

  one: function( req, res, next ){
    new this.AbstractModel( req.params.className ).findById( req.params.objectId, function(err, doc){
      doc.objectId = doc._id;
      res.json( doc );
    } );
  },

  update: function( req, res, next ){
    delete req.body._id;
    new this.AbstractModel( req.params.className ).update( req.params.objectId, req.body, function( err, doc ){
      res.json( {updatedAt: doc.updatedAt} );
    } );
  },

  all: function( req, res, next ){
    new this.AbstractModel( req.params.className )
      .limit( req.query.limit ? parseInt( req.query.limit, 10 ) : null )
      .skip( req.query.skip ? parseInt( req.query.skip, 10 ) : null )
      .find( req.query.where ? JSON.parse( req.query.where ) : null )
      .pipe( this.JSONStream.stringify() )
      .pipe( this.JSONStream.parse( [true], function( doc ){ 
        doc.objectId = doc._id;
        return doc; 
      } ) )
      .pipe( this.JSONStream.stringify() )
      .pipe( res );
  },

  remove: function( req, res, next ){
    new this.AbstractModel( req.params.className ).remove( req.params.objectId, function( err, doc ){
      res.send( 200 );
    } );
  }
};

module.exports = ObjectsController;
