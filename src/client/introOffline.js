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
      __schema {
        types {
          name
        }
      }
    }`
  })
  .end(function (err, res) {
    console.log(util.inspect(res.body.data, false, null));
  });

request
  .get('http://localhost:3000/heroOffline')
  .query({
    query: `        
    query IntrospectionSummonFieldsQuery {
      __type(name: "Summon") {
        name
        fields {
          name
          type {
            name
            kind
          }
        }
      }
    }`
  })
  .end(function (err, res) {
    console.log(util.inspect(res.body.data, false, null));
  });

//Allows querying the schema for field args:
request
  .get('http://localhost:3000/heroOffline')
  .query({
    query: `        
    query IntrospectionQueryTypeQuery {
              __schema {
                queryType {
                  fields {
                    name
                    args {
                      name
                      description
                      type {
                        name
                        kind
                        ofType {
                          name
                          kind
                        }
                      }
                      defaultValue
                    }
                  }
                }
              }
    }`
  })
  .end(function (err, res) {
    console.log('Result of the IntrospectionQueryTypeQuery:');
    //Printing out the variable until the deepest object... 
    console.log(util.inspect(res.body.data, false, null));
  });

/*
Observing the type human: 
*/

request
  .get('http://localhost:3000/heroOffline')
  .query({
    query: `        
    query IntrospectionSummonFieldsQuery {
      __type(name: "Summon") {
        name
        fields {
          name
          type {
            name
            kind
          }
        }
      }
    }`
  })
  .end(function (err, res) {
    console.log(util.inspect(res.body.data, false, null));
  });
