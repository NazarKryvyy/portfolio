const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");

// resolvers
const {
  portfolioQueries,
  portfolioMutations,
  userMutations,
  userQueries,
} = require("./resolvers");
// types
const { portfolioTypes, userTypes } = require("./types");
// GraphqlModels
const Portfolio = require("./models/portfolio");
const User = require("./models/user");
const { buildAuthContext } = require("./context");

exports.createApolloServer = () => {
  const typeDefs = gql(`
    ${portfolioTypes}
    ${userTypes}
    
    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
      user: User
      
    }
    
     type Mutation {  
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput, ): Portfolio
      deletePortfolio(id: ID): ID
      
      signIn(input: SignInInput): User
      signUp(input: SignUpInput): String
      signOut: Boolean
    }     
   `);

  // root provides resolver for each api endpoints
  const resolvers = {
    Query: {
      ...portfolioQueries,
      ...userQueries,
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        Portfolio: new Portfolio(mongoose.model("Portfolio"), req.user),
        User: new User(mongoose.model("User")),
      },
    }),
  });

  return apolloServer;
};
