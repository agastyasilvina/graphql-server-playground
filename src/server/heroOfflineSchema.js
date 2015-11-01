import {
	GraphQLEnumType,
	GraphQLInterfaceType,
	GraphQLObjectType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLString,
	GraphQLInt 
} from 'graphql/type';

import { getFriends, getHero, getHuman, getSummon } from './heroOfflineData.js';

/*
The type description I use:
enum Skill { FIGHT, DEFENSE, SUPPORT, UNKNOWN}
enum Job {ONION_KNIGHT, RED_KNIGHT, HUNTER, WARLOCK, WHITE_MAGI}

interface Character {
	id: String!
	name: String
	friends: [Character]
	skills: [Skill]
}

type Human: Character {
	id: String!
	name: String
	friends: [Character]
	skills: [Skill]
	job: Job
}

type Summon: Character {
	id: String!
	name: String
	friends: [Character]
	skills: [Skill]
	primaryFunction: String
}

type Query {
	hero(skill: Skill): Character
	human(id: String!): Human
	summon(id: String!): Summon
}

*/

//enum Skill { FIGHT, DEFENSE, SUPPORT, UNKNOWN}
var skillEnum = new GraphQLEnumType({
	name: 'Skill',
	description: 'Define the skills the characters have',
	values: {
		FIGHT: {
			value: 1,
			description: 'The ability to damage opponent'
		},
		DEFENSE: {
			value: 2,
			description: 'The ability to defense self or friends'
		},
		SUPPORT: {
			value: 3,
			description: 'The ability to strengthen friends'
		},
		UNKNOWN: {
			value: 4,
			description: 'Unknown or undefined ability'
		}
	}
});

//enum Job {ONION_KNIGHT, RED_KNIGHT, HUNTER, WARLOCK, WHITE_MAGI}
var jobEnum = new GraphQLEnumType({
	name: 'Job',
	description: 'Define the job of "Human" Character',
	values: {
		ONION_KNIGHT: {
			value: 0,
			description: "The mightiest job, Onion Knight"
		},
		RED_KNIGHT: {
			value: 1,
			description: "Knight with an ability of magic, Red Knight"
		},
		HUNTER: {
			value: 2,
			description: "High dexterity-deadly archer, Hunter"
		},
		WARLOCK: {
			value: 3,
			description: "Very strong magician, Warlock"
		},
		WHITE_MAGI: {
			value: 4,
			description: "basically a priest, White Magi"
		}
	}
})


/*
interface Character {
	id: String!
	name: String
	friends: [Character]
	skills: [Skill]
}
*/

var characterInterface = new GraphQLInterfaceType({
	name: 'Character',
	description: 'A character in the Hero Offline series',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The id of a character'
		},
		name: {
			type: GraphQLString,
			description: 'The name of a character'
		},
		friends: {
			type: new GraphQLList(characterInterface),
			description: 'friends of the character, might be empty'
		},
		skills: {
			type: new GraphQLList(skillEnum),
			description: 'The skill of the character'
		}
	}),
	resolveType: character => {
		return getHuman(character.id)? humanType: summonType;
	}
});

//Human character Object type:
/*
type Human: Character {
	id: String!
	name: String
	friends: [Character]
	skills: [Skill]
	job: Job
}
*/

var humanType = new GraphQLObjectType({
	name: 'Human',
	description: 'A humanoid character',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The id of the human'
		},
		name: {
			type: GraphQLString,
			description: 'The name of the human'
		},
		friends: {
			type: new GraphQLList(characterInterface),
			description: 'The friends of human; can be summon or human',
			resolve: human => getFriends(human)
		},
		skills: {
			type: new GraphQLList(skillEnum),
			description: 'The skill of the character'
		},
		job: {
			type: jobEnum,
			description: 'The job of the human'
		}
	}),
	interfaces: [ characterInterface ]
});

//Summon Object
/*
type Summon: Character {
	id: String!
	name: String
	friends: [Character]
	skills: [Skill]
	primaryFunction: String
}
*/

var summonType = new GraphQLObjectType({
	name: 'Summon',
	description: 'A Monster/pat/summon character',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The id of the summon'
		},
		name: {
			type: GraphQLString,
			description: 'The name of the summon'
		},
		friends: {
			type: new GraphQLList(characterInterface),
			description: 'The friends of summon; can be summon or human',
			resolve: summon => getFriends(summon)
		},
		skills: {
			type: new GraphQLList(skillEnum),
			description: 'The skill of the character'
		},
		primaryFunction: {
			type: GraphQLString,
			description: 'the primaryFunction of the summon'
		}
	}),
	interfaces: [ characterInterface ]
});

//The Query type:
/*
type Query {
	hero(skill: Skill): Character
	human(id: String!): Human
	summon(id: String!): Summon
}
*/
var queryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		hero: {
			type: characterInterface,
			args: {
				skill: {
					description: 'return the hero with best skill',
					type: skillEnum
				}
			},
			resolve: (root, {skill}) => getHero(skill)
		},
		human: {
			type: humanType,
			args: {
				id: {
					description: 'id of the human',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: (root, {id}) => getHuman(id)
		},
		summon: {
			type: summonType,
			args: {
				id: {
					description: 'id of the monster/summon',
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: (root, {id}) => getSummon(id)
		}
	})
});

export var HeroOfflineSchema = new GraphQLSchema( {
	query: queryType
})