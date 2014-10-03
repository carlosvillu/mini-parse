var DataBase = require( './../data-base' );

var AbstractModel = ( function(){

  var AbstractModelClass = function( className, body ){
    this.skipped = null;
    this.limited = null;
    this.collection = DataBase.getInstance().collection( className );
  };

  AbstractModelClass.prototype.body = function( body ){
    this.body = body;
    return this;
  };

  AbstractModelClass.prototype.save = function( cb ){
    this.body.createdAt = this.body.updatedAt = new Date();
    this.collection.save( this.body, cb );
    return this;
  };

  AbstractModelClass.prototype.find = function( query ){
    var find = this.collection.find( query || {} );
    if( this.limited )
    {
      find = find.limit( this.limited );
    }

    if( this.skipped );
    {
      find = find.skip( this.skipped );
    }

    return find;
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
    update.updatedAt = new Date();
    this.collection.findAndModify( {
      query: {_id: DataBase.raw.ObjectId( id )},
      upsert: true,
      update: {$set: update},
      new: true
    }, cb );
    return this;
  };

  AbstractModelClass.prototype.limit = function( limit ){
    this.limited = limit;
    return this;
  };

  AbstractModelClass.prototype.skip = function( skip ){
    this.skipped = skip;
    return this;
  };

  return AbstractModelClass;

}() );


module.exports = AbstractModel;
