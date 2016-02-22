import axios from 'axios'; 

const USERS_CLASSES_URL = 'http://127.0.0.1:3000/1/classes/users'

export default class UserMeController {
  one(req, resp, next) {
    axios.get(`${USERS_CLASSES_URL}/${req.user.id}`)
      .then(({data}) => {
        delete data.password;
        resp.json(data)
      })
      .catch(r => resp.send(404))
  }

  update(req, resp) {
    axios.get(`${USERS_CLASSES_URL}/${req.user.id}`)
      .then(({data}) => {
        return axios.put(`${USERS_CLASSES_URL}/${req.user.id}`, Object.assign({}, data, req.body))
                .then(({data}) => {
                  delete data.password
                  resp.send(200, data)
                })
      })
      .catch(r => resp.send(r.status, r.statusText))
  }

  delete(req, resp, next){
    axios.delete(`${USERS_CLASSES_URL}/${req.user.id}`)
      .then(r =>resp.send(200))
      .catch(resp.send.bind(resp, 500 ))
  }
}
