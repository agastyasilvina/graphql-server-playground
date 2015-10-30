import {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} from 'graphql/type';

import co from 'co';
import Hero from './hero';
import Pet from './pet';
import Weapon from './weapon';
import getProjection from './util/projection';
import weaponType from './schema/weaponSchema';
import petType from './schema/petSchema';
import heroType from './schema/heroSchema';

var schema = new GraphQLSchema({
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
	})
});

export default schema;
