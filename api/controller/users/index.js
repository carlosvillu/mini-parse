import credential from 'credential';
import jwt from 'jsonwebtoken';
import axios from 'axios'; 

var nconf = require( 'nconf' );


// TODO: Why are no working the config file
const USERS_CLASSES_URL = `http://127.0.0.1:3000/1/classes/users`
const SECRET_JWT = nconf.get( 'SECRET_JWT' ) || nconf.get( 'secret_jwt' )

var request = axios.create({
  baseURL: USERS_CLASSES_URL,
  headers: {'X-Custom-Header': 'foobar'}
});

const existUser = (username) => {
  return new Promise((resolve, reject) => {
    request.get({
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
                .then(hash => request.post({...body, password: hash}))
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
    request.get({
      params: {where: {username}}
    })
    .then(resp => {
      const [doc] = resp.data;
      return credential()
              .verify(doc.password, password)
              .then( (isValid) => {
                delete doc.password;
                return isValid ? res.json(201, {...doc, token: jwt.sign({id: doc._id}, SECRET_JWT)})
                               : res.send(401)
              })
              .catch(res.send.bind(res, 401))
    })
  }
}
