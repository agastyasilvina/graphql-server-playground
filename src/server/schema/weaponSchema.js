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
import Weapon from '../collections/weapon';
import heroType from './heroSchema';
import getProjection from '../util/projection';

var weaponType = new GraphQLObjectType({
	name: 'Weapon',
	description: 'Weapon Creator',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The id of the Weapon'
		},
		name: {
			type: GraphQLString,
			description: 'The name of the weapon'
		},
		power: {
			type: GraphQLInt,
			description: 'The power of the weapon'
		},
		owner: {
			type: new GraphQLList(heroType),
			description: 'The owner of the weapon...',
			resolve: (weapon, params, source, fieldASTs) => {
				console.log(weapon.owner.toString());
				var projections = getProjection(fieldASTs);
				return Hero.find({_id: weapon.owner.toString()}
				,projections);
			}
		}
	})
});
export default weaponType;