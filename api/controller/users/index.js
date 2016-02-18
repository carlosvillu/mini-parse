import credential from 'credential';
import jwt from 'jsonwebtoken';
import concat from 'concat-stream';
var JSONStream = require('JSONStream');
var AbstractModel = require( './../../model/abstract' );
var nconf = require( 'nconf' );

const USERS_CLASS_NAME = 'users';
const SECRET_JWT = nconf.get( 'SECRET_JWT' ) || nconf.get( 'secret_jwt' )

const existUser = (username) => {
  return new Promise( (resolve, reject) => {
    new AbstractModel( USERS_CLASS_NAME )
      .findOne({username}, (err, user) => {
        if(err) { return reject(err) }
        return user ? reject(user) : resolve();
      })
  } )
}

export default class UserController {

  create({body}, res, next) {
    existUser(body.username)
      .then( () => {
        credential().hash(body.password, (err, hash) => {
          const hashedBody ={...body, password: hash}
          new AbstractModel( USERS_CLASS_NAME )
            .body(hashedBody)
            .save( function( err, doc ){
              res
                .set('Location', `/1/users/${doc._id}`)
                .status(201)
                .json({_id: doc._id, token: jwt.sign({id: doc._id}, SECRET_JWT)});
            } );
        })
      })
      .catch(err => {
        res.send(409, 'Conflict')
      })
  }

  login(req, res, next) {
    const {username, password} = req.query;
    new AbstractModel( USERS_CLASS_NAME )
      .findOne({username}, (err, doc) => {
        credential().verify(doc.password, password, (err, isValid) => {
          delete doc.password;
          return isValid ? res.json(201, {...doc, token: jwt.sign({id: doc._id}, SECRET_JWT)})
                         : res.send(401)
        })
      })
  }
}
