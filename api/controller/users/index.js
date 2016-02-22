import credential from 'credential';
import jwt from 'jsonwebtoken';
import axios from 'axios'; 

var nconf = require( 'nconf' );


// TODO: Why are no working the config file
const USERS_CLASSES_URL = 'http://127.0.0.1:3000/1/classes/users'
const SECRET_JWT = 'La vaca roja en el prado verde' || nconf.get( 'SECRET_JWT' ) || nconf.get( 'secret_jwt' )

const existUser = (username) => {
  return new Promise((resolve, reject) => {
    axios.get(USERS_CLASSES_URL, {
      params: {where: {username}}
    })
    .then(response => response.data.length !== 0 ? reject() : resolve())
    .catch(reject)
  });
}

export default class UserController {

  create({body}, res, next) {
    existUser(body.username)
      .then( () => {
        return credential()
                .hash(body.password)
                .then(hash => axios.post(USERS_CLASSES_URL, {...body, password: hash}))
                .then(resp => res
                                .set('Location', '/me')
                                .json(201, {_id: resp.data._id, token: jwt.sign({id: resp.data._id}, SECRET_JWT)}))
      })
      .catch(err => {
        res.send(409)
      })
  }

  login(req, res, next) {
    const {username, password} = req.query;
    axios.get(USERS_CLASSES_URL, {
      params: {where: {username}}
    })
    .then(resp => {
      const [doc] = resp.data;
      if(doc === undefined){res.send(401)}
      return credential()
              .verify(doc.password, password)
              .then( (isValid) => {
                delete doc.password;
                return isValid ? res.json(201, {...doc, token: jwt.sign({id: doc._id}, SECRET_JWT)})
                               : res.send(401)
              })
    })
  }
}
