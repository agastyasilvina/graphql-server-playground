import request from 'superagent';
import Debug from 'debug';

var debug = new Debug('client:query');
var heroId = '100';
var summonId = '201';

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
      query FetchLuke {
          luke: human(id: "100"){
            id
            name
            friends {
              name
            }
            skills
          }
          jin: human(id: "101"){
            id
            name
            friends {
              name
            }
            skills
          }
        }`
  })
  .end(function (err, res) {
    console.dir(res.body.data);
    debug(err || res.body.data.luke.friends);
    debug(err || res.body.data.jin.friends);
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
