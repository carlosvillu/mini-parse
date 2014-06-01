var AbstractModel = require( './../../model/abstract' ),
    JSONStream = require('JSONStream');

var ClassesController = function(){
  this.AbstractModel = AbstractModel;
  this.JSONStream = JSONStream;
};

ClassesController.prototype = {
  create: function( req, res, next ){
    new this.AbstractModel( req.params.className )
      .body( req.body )
      .save( function( err, doc ){
        res.json( doc );
      } );
  },

  one: function( req, res, next ){
    new this.AbstractModel( req.params.className ).findById( req.params.objectId, function(err, doc){
      res.json( doc );
    } );
  },

  update: function( req, res, next ){
    new this.AbstractModel( req.params.className ).update( req.params.objectId, req.body, function( err, doc ){
      res.json( doc );
    } );
  },

  all: function( req, res, next ){
    new this.AbstractModel( req.params.className )
      .limit( req.query.limit ? parseInt( req.query.limit, 10 ) : null )
      .skip( req.query.skip ? parseInt( req.query.skip, 10 ) : null )
      .find( req.query.where ? JSON.parse( req.query.where ) : null )
      .pipe( this.JSONStream.stringify() )
      .pipe( res );
  },

  remove: function( req, res, next ){
    new this.AbstractModel( req.params.className ).remove( req.params.objectId, function( err, doc ){
      res.send( 200 );
    } );
  }
};

module.exports = ClassesController;
