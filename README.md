# mini-parse
 
Mini-version of [Parse](https://www.parse.com)

The goal of this project was to recreate a mini-version of BaaS using MongoDB and NodeJS.

The project is based on [Parse documentation](https://www.parse.com/docs/rest). Only URLS that CRUD an element have been implemented. 

### Installation


* clone repository
* inside the newly created folder, execute `npm install`
* setting your Mongo URL in your development.json config file
* execute `node index.js`

### URLs

Remember that you provide the base URL

URL | Verb | Description
--- | ---- | -----------
/1/classes/:className | POST | Creating Objects
/1/classes/:className/:objectId | GET | Retrieving Objects
/1/classes/:className/:objectId | PUT | Updating Objects
/1/classes/:className | GET | Queries
/1/classes/:className/:objectId | DELETE	| Deleting Objects

:)




