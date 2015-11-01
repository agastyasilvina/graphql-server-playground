"GraphQL is a data query language and runtime designed and used at Facebook to request and deliver data to mobile and web apps since 2012." ~graphql.org

This project is a simple GraphQL server that run using node and MongoDB as the database provider. 
It's inspired by the work that is done by the Rising Stack (i.e. For more information: https://risingstack.com/)

1. Installation
================
To run this project, you need to have node and mongo DB installed

2. Run
================
First, the dependencies need to be install before running the server, the syntax is as follow:
```
npm install
```
Once the server up and running, makse sure that the mongo DB server also up and running. 
We populate the mongo DB using the data we initialized in the seed.js. 
To populate the DB, we can simply run this command:
```
npm run seed
```
The node server can be run locally using this syntax:
```
npm start
```
Once the server is up and running, we run the client:
```
npm run client
```

Adding the npm run for debugging using node inspector