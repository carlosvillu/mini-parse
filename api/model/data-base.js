var mongojs = require( 'mongojs' ),
    nconf = require( 'nconf' );

nconf.argv()
     .env()
     .file( { file: __dirname + '/../../configs/development.json' } );

var DataBase = (function(){
    function DataBase() {
      this.db = mongojs( nconf.get( 'DATABASE_URL' ) || nconf.get( 'database:url' ) );
      this.collections = {};
    };

    DataBase.prototype.collection = function( collection ){
      return this.collections[collection] = this.collections[collection] ? this.collections[collection] : this.db.collection( collection );
    };

    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new DataBase();
                instance.constructor = null;
            }
            return instance;
        },
        raw: mongojs
   };
})();

module.exports = DataBase;
