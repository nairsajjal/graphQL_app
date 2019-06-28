const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const app= express();


app.use(bodyParser.json());
app.use('/graphql', graphqlHttp({
    schema :buildSchema(`

        type RootQuery{
            events: [String!]!

        }
        type RootMutation{
            crateEvent(name: String): String

        }
        schema{

            query: RootQuery
            mutation: RootMutation

        }
    `),
//resolvers
    rootValue: {events:() => {
        return ['cooking', 'sailing', 'coding']
    },
    createEvent: (args) =>{
        const eventName = args.name;
        return eventName;
    } },
    graphiql: true
}))



app.listen(3000);