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

Signing up and logging in

URL | Verb | Description
--- | ---- | -----------
/1/login | GET | log in
/1/users | POST | sign up

* To create a new user, make a post sending in its body all the data to be associated with the user. There are two mandatory fields: `username` y `password`.
  * Correct sign-up leads to a 201 response and a `Location` header with the url to obtain the recently created user. The body of the response contains the user `_id`and a `token` field that includes an instance of a [JSON Web Tokens](http://jwt.io/) that needs to be used in all authenticated requests to `/me`.
  * Wrong sign-up leads to a 409 response with the body `Conflict`, if the username already exists. 

* To log in, make a GET request with `username` and `password` as mandatory parameters in the query string `http://localhost:3000/1/login?username=pepito&password=123`
  * Correct log-in leads to a 201 response with all the information that went through at the moment the user was created, except the password field. Also, a `token` field is added with a JWT token that should be used in all `/me` requests.
  * Wrong log-in leads to a 401 response.
  
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
