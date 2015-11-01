import request from 'superagent';
import Debug from 'debug';
//This is handy way to print all the variable:
var util = require('util');

var debug = new Debug('client:query');
var heroId = '100';
var summonId = '201';

request
  .get('http://localhost:3000/heroOffline')
  .query({
    query: `        
    query IntrospectionTypeQuery {
      __type(name: "Human") {
         name
         description
         fields {
           name
           type {
             name
             kind
             ofType {
               name
               kind
             }
           }
         }
       }
    }`
  })
  .end(function (err, res) {
    console.log(util.inspect(res.body.data, false, null));
  });
