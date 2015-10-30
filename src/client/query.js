import request from 'superagent';
import Debug from 'debug';

var debug = new Debug('client:query');
var heroId = '559645cd1a38532d14349243';
var weaponId = '5633ccf43970cd5028256621';

request
  .get('http://localhost:3000/data')
  .query({
    query: `{
      hello,
      weapon(id: "${weaponId}"){
        name
        power
        owner {
          name
        }
      }
    }`
  })
  .end(function (err, res) {
    console.dir(res.body);
    debug(err || res.body);
    debug('owner', res.body.data.weapon.owner);
  });

request
  .get('http://localhost:3000/data')
  .query({
    query: `{
      hello,
      hero(id: "${heroId}") {
        name
        friends{
          name
        }
        pets{
          name
        }
        weapon{
          name
          power
        }
      }
    }`
  })
  .end(function (err, res) {
    console.dir(res.body);
    debug(err || res.body);
    debug('friends', res.body.data.hero.friends);
    debug('friends', res.body.data.hero.pets);
    debug('friends', res.body.data.hero.weapon);
  });
