import {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} from 'graphql/type';

import co from 'co';

var petType = new GraphQLObjectType({
	name: 'Pet',
	description: 'Pet creator',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The id of the pet',
		},
		name: {
			type: GraphQLString,
			description: 'The name of the pet'
		},
		type: {
			type: GraphQLString,
			description: 'The type of the pet'
		}
	})
});

export default petType;