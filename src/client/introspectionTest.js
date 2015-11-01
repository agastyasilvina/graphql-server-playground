import {
  missingFieldArgMessage
} from 'graphql/validation/rules/ProvidedNonNullArguments';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLEnumType,
} from 'graphql/type';
import {graphql} from 'graphql';
import { introspectionQuery } from 'graphql/utilities/introspectionQuery';
var util = require('util');


var emptySchema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'QueryRoot',
		fields: {
			onlyField: { type: GraphQLString }
		}
	})
});

// var testIntros_1 = graphql(emptySchema, introspectionQuery);
// setTimeout(function() {
// 	console.log("Test Introspection No. 1:");
// 	console.log(util.inspect(testIntros_1, false, null));
// }, 3000);


var TestInputObject = new GraphQLInputObjectType({
  name: 'TestInputObject',
  fields: {
    a: { type: GraphQLString, defaultValue: 'foo' },
    b: { type: new GraphQLList(GraphQLString) }
  }
});

var TestType = new GraphQLObjectType({
  name: 'TestType',
  fields: {
    field: {
      type: GraphQLString,
      args: { complex: { type: TestInputObject } },
      resolve: (_, { complex }) => JSON.stringify(complex)
    }
  }
});

var schema = new GraphQLSchema({ query: TestInputObject });
var request = `
  {
    __schema {
      types {
        kind
        name
        inputFields {
          name
          type { ...TypeRef }
          defaultValue
        }
      }
    }
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
        }
      }
    }
  }
`;

var testIntros_2 = graphql(schema, request);
setTimeout(function(){
	var msg = 'Test input object:'
	console.log(msg);
	console.log(util.inspect(testIntros_2, false, null));
},3000);
