import {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} from 'graphql/type';

import co from 'co';
import Hero from '../collections/hero';
import Pet from '../collections/pet';
import Weapon from '../collections/weapon';
import weaponType from './weaponSchema';
import petType from './petSchema';
import getProjection from '../util/projection';


var heroType = new GraphQLObjectType({
	name: 'Hero',
	description: 'Hero creator',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The id of the hero'
		}, 
		name: {
			type: GraphQLString,
			description: 'The name of the hero'
		},
		friends: {
			type: new GraphQLList(heroType),
			description: 'The friends of the hero, or an empty list if the hero does not have any friends',
			resolve: (hero, params, source, fieldASTs) => {
				var projections = getProjection(fieldASTs);
				return Hero.find({
					_id: {
						$in: hero.friends.map((id)=> id.toString())
					}
				}, projections);
			}
		},
		pets: {
			type: new GraphQLList(petType),
			description: 'The pet of the hero, or an empty list if the hero does not have any pets',
			resolve: (hero, params, source, fieldASTs) => {
				var projections = getProjection(fieldASTs);
				return Pet.find({
					_id: {
						$in: hero.pets.map((id)=> id.toString())
					}
				}, projections);
			}
		},
		weapon: {
			type: new GraphQLList(weaponType),
			description: 'The owner of the weapon...',
			resolve: (hero, params, source, fieldASTs) => {
				console.log(fieldASTs);
				var projections = getProjection(fieldASTs);
				return Weapon.find({
					_id: {
						$in: hero.weapon.map((id)=> id.toString())
					}
				}, projections);
			}
		}
	})
});

export default heroType;