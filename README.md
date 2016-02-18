[ ![Codeship Status for carlosvillu/mini-parse](https://www.codeship.io/projects/cf182480-efe9-0131-5708-661bbcbf0c93/status)](https://www.codeship.io/projects/27143)
# mini-parse
 
Mini-version of [Parse](https://www.parse.com)

The goal of this project was to recreate a mini-version of BaaS using MongoDB and NodeJS.

The project is based on [Parse documentation](https://www.parse.com/docs/rest). Only URLS that CRUD an element have been implemented. 

### Installation


* clone repository
* inside the newly created folder, execute `npm install`
* setting your Mongo URL in your development.json config file
* execute `node index.js`

## Classes

Remember that you provide the base URL

URL | Verb | Description
--- | ---- | -----------
/1/classes/:className | POST | Creating Objects
/1/classes/:className/:objectId | GET | Retrieving Objects
/1/classes/:className/:objectId | PUT | Updating Objects
/1/classes/:className | GET | Queries
/1/classes/:className/:objectId | DELETE	| Deleting Objects

### Query, limit, skip

When you ask for a collection there are 3 important GET parameters,

* where: URL safe enconding of a stringify object, which encapsulates a search in a Mongo collection. For example, `encodeURI( JSON.stringify( {key: 'value'} ) )`
* limit: maximum number of results in a search
* skip: interval of skipped elements

### Example of a valid query

Assuming we have already created a to-do collection for a GTD tool, a sample of a typical query could be as follows,

`http://localhost:3000/1/classes/todo?where=%7B%22key%22:%22value%22%7D&limit=1&skip=1`
:)

## User

Sign Up and Logging an user

URL | Verb | Description
--- | ---- | -----------
/1/login | GET | Logging an User
/1/users | POST | Sign up an User

* Para loguear a un usuario deberás hacer una petición GET agregando abligatoriamente `username` y `password` como query string `http://localhost:3000/1/login?username=pepito&password=123`
  * Correcto: Respuesta 201 con toda la información que se pasó en el momento de la creación del usuario menos el campo password. Además se agrega un campo `token` con el toker JWT que deberás usar en todas las peticiones `/me`.
  * Erroneo: Código de respues 401.

* Para crear un usuario debes hacer un post enviando el cuerpo todos los datos que crear asociar al usuario. Además hay dos campos **OBLIGATORIOS** `username` y `password`.
  * Creación correcta: Código de respuesta 201 y una cabecera `Location` con la url para obtener el recurso recien creado. El cuerpo de la respuesta contiene el `_id` del usuario creado y además un campo `token` que contiene una instancia de un [JSON Web Tokens](http://jwt.io/) que deberás usar en todas las peticiones autenticadas a recursos de usuarios. */me* .
  * Creación erronea: Si el username ya existe en la bbdd, recibirás un 409 con el body `Conflict`.


## TODO


- [ ] Objects
 - [ ] Populate retrives with the `include`option
 - [ ] Embedded objectId
 - [ ] Counters
 - [ ] Arrays
 - [ ] Relations
 - [ ] Delete single field
 - [ ] Batch Operations
 - [ ] Data Types ?
- [ ] QUERY
 - [ ] Order
 - [ ] Keys
 - [ ] Count
