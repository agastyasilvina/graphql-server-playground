import request from 'superagent';
import Debug from 'debug';

var debug = new Debug('client:mutation');
var heroId = '559645cd1a38532d14349244'; 
var weaponName = 'Ultima weapon';
var petName = 'Agastya';
var petType = 'Dragon';

queryHero(heroId);

request
  .post('http://localhost:3000/data')
  .send({
    query: `
    mutation M($weaponName: String! $weaponPower: String!) {
      createWeapon(name: $weaponName power: $weaponPower) {
        id
        name
        power
      }
    }
    `,
    params: {
      weaponName: weaponName,
      weaponPower: '9999'
    }
  })
  .end(function (err, res) {
   debug(err || res.body);
   //Assign newly created Weapon to Hero:
   var weaponId = res.body.data.createWeapon.id;
   request
     .post('http://localhost:3000/data')
     .send({
       query: `
       mutation M($heroId: String! $weaponId: String!) {
         assignWeapon(id: $heroId weaponId: $weaponId) {
           name
           weapon {
            name
           }
         }
       }
       `,
       params: {
         heroId: heroId,
         weaponId: weaponId
       }
     })
     .end(function (err, res) {
       debug(err || res.body);
       debug('Query Result:', res.body);
     });
  });

request
  .post('http://localhost:3000/data')
  .send({
    query: `
    mutation M($petName: String! $petType: String!) {
      createPet(name: $petName type: $petType) {
      	id
        name
        type
      }
    }
    `,
    params: {
      petName: 'Agastya',
      petType: 'Dragon'
    }
  })
  .end(function (err, res) {
    debug(err || res.body);
    debug('Pet ID:', res.body.data.createPet.id);
    //Assign the newly generated Pet to hero
    var petId = res.body.data.createPet.id;
    request
      .post('http://localhost:3000/data')
      .send({
        query: `
        mutation M($heroId: String! $petId: String!) {
          assignPet(id: $heroId petId: $petId) {
            name
            pets {
            	name
            }
          }
        }
        `,
        params: {
          heroId: heroId,
          petId: petId
        }
      })
      .end(function (err, res) {
        debug(err || res.body);
        debug('Query Result:', res.body);
        setTimeout(queryHero(heroId), 5000);
      });

  });



function queryHero(heroId) {
  var debug = new Debug('client:query');
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
      debug(err || res.body);
      debug('friends', res.body.data.hero.friends);
      debug('pets', res.body.data.hero.pets);
      debug('weapon', res.body.data.hero.weapon);
    });
}
