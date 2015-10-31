import {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} from 'graphql/type';

import co from 'co';
import Hero from './collections/hero';
import Pet from './collections/pet';
import Weapon from './collections/weapon';
import getProjection from './util/projection';
import weaponType from './schema/weaponSchema';
import petType from './schema/petSchema';
import heroType from './schema/heroSchema';

var schema = new GraphQLSchema({
	//Query:
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			hello: {
				type: GraphQLString,
				resolve: function() {
					return 'world';
				}
			},
			hero: {
				type: heroType,
				args: {
					id: {
						name: 'id',
						type: new GraphQLNonNull(GraphQLString)
					}
				},
				resolve: (root, {id}, source, fieldASTs) => {
					var projections = getProjection(fieldASTs);
					return Hero.findById(id, projections);
				}
			},
			weapon: {
				type: weaponType,
				args: {
					id: {
						name: 'id',
						type: new GraphQLNonNull(GraphQLString)
					}
				},
				resolve: (root, {id}, source, fieldASTs) => {
					var projections = getProjection(fieldASTs);
					return Weapon.findById(id, projections);
				}
			}
		}
	}),
	//Mutation:
	mutation: new GraphQLObjectType({
		name: 'Mutation',
		fields: {
			createHero: {
				type: heroType,
				args: {
					name: {
						name: 'name',
						type: GraphQLString
					}
				},
				resolve: (obj, {name}, source, fieldASTs) => co(function*() {
					var projections = getProjection(fieldASTs);
					var hero = new Hero();
					hero.name = name;
					return yield hero.save();
				})
			},
			deleteHero: {
				type: heroType,
				args: {
					id: {
						name: 'id',
						type: new GraphQLNonNull(GraphQLString)
					}
				},
				resolve: (obj, {id}, source, fieldASTs) => co(function *() {
					var projections = getProjection(fieldASTs);
					return yield, User.findOneAndRemove({_id:id});
				})
			},
			createPet: {
				type: petType,
				args: {
					name: {
						name: 'name',
						type: GraphQLString
					},
					type: {
						name: 'type',
						type: GraphQLString
					}
				},
				resolve: (obj, {name,type}, source, fieldASTs) => co(function *(){
					var projections = getProjection(fieldASTs);
					var pet = new Pet();
					pet.name = name;
					pet.type = type;
					return yield pet.save();
				})
			},
			createWeapon: {
				type: weaponType, 
				args: {
					name: {
						name: 'name',
						type: GraphQLString
					},
					power: {
						name: 'power',
						type: GraphQLString
					}
				},
				resolve: (obj, {name, power}, source, fieldASTs) => co(function*() {
					var projections = getProjection(fieldASTs);
					var weapon = new Weapon();
					weapon.name = name;
					weapon.power = parseInt(power);
					return yield weapon.save();
				})
			},
			assignWeapon: {
				type: heroType,
				args: {
					id: {
						name: 'id',
						type: new GraphQLNonNull(GraphQLString)
					},
					weaponId : {
						name: 'weaponId',
						type: new GraphQLNonNull(GraphQLString)
					}
				}, 
				resolve: (obj, {id, weaponId}, source, fieldASTs) => co(function*() {
					var projections = getProjection(fieldASTs);
					yield Weapon.update({
						_id: weaponId
					}, {
						$set: {
							owner: id 
						}
					});
					yield Hero.update({
						_id: id
					}, {
						$push: {
							weapon: weaponId 
						}
					});
					return yield Hero.findById(id, projections);
				})
			},
			assignPet: {
				type: heroType,
				args: {
					id: {
						name: 'id',
						type: new GraphQLNonNull(GraphQLString)
					},
					petId : {
						name: 'petId',
						type: new GraphQLNonNull(GraphQLString)
					}
				}, 
				resolve: (obj, {id, petId}, source, fieldASTs) => co(function*() {
					var projections = getProjection(fieldASTs);
					yield Hero.update({
						_id: id
					}, {
						$push: {
							pets: petId 
						}
					});
					return yield Hero.findById(id, projections);
				})
			}
		}
	})
});

export default schema;
