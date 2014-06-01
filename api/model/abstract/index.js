var DataBase = require( './../data-base' );

var AbstractModel = ( function(){

  var AbstractModelClass = function( className, body ){
    this.collection = DataBase.getInstance().collection( className );
  };

  AbstractModelClass.prototype.body = function( body ){
    this.body = body;
    return this;
  };

  AbstractModelClass.prototype.save = function( cb ){
    this.collection.save( this.body, cb );
    return this;
  };

  AbstractModelClass.prototype.find = function( query ){
    return this.collection.find( query || {} );
  }

  AbstractModelClass.prototype.findById = function( id, cb ){
    this.collection.findOne( {_id: DataBase.raw.ObjectId( id )}, cb );
    return this;
  };

  AbstractModelClass.prototype.remove = function( id, cb ){
    this.collection.remove( {_id: DataBase.raw.ObjectId( id )}, cb );
    return this;
  };

  AbstractModelClass.prototype.update = function( id, update, cb ){
    this.collection.findAndModify( {
      query: {_id: DataBase.raw.ObjectId( id )},
      update: update,
      new: true
    }, cb );
    return this;
  };

  return AbstractModelClass;

}() );


module.exports = AbstractModel;
