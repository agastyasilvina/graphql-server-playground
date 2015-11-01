import request from 'superagent';
import Debug from 'debug';

var debug = new Debug('client:query');
var heroId = '100';
var summonId = '201';
var util = require('util');

request
  .get('http://localhost:3000/heroOffline')
  .query({
    query: `        
      query Hero {
          hero {
            id
            name
            friends {
              name
            }
          }
        }`
  })
  .end(function (err, res) {
    debug(err || res.body);
  });

request
  .get('http://localhost:3000/heroOffline')
  .query({
    query: `        
      query FetchLukeJin {
          luke: human(id: "100"){
            id
            name
            friends {
              name
            }
            skills
          }
          jin: human(id: "101"){
            ...standardList
          }
        }
      #try to use fragment:
      fragment standardList on Human {
        id
        name
        friends {
          name
        }
        skills
        job
      }`
  })
  .end(function (err, res) {
    console.log("Fetch Luke and Jin's data using Fragment:");
    console.log(util.inspect(res.body.data, false, null));
  });

//Using Human Fragment:
request
  .get('http://localhost:3000/heroOffline')
  .query({
    query: `        
      query Fetch {
          luke: human(id: "100"){
            __typename
            name
            skills
          }
          jin: human(id: "101"){
            __typename
            name
            skills
          }
        }`
  })
  .end(function (err, res) {
    console.dir(res.body.data);
    debug(err || res.body.data.luke.skills);
    debug(err || res.body.data.jin.skills);
  });

//TODO: Using fragment
