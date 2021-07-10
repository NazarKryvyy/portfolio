const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");

// resolvers
const {
  portfolioQueries,
  portfolioMutations,
  userMutations,
} = require("./resolvers");
// types
const { portfolioTypes, userTypes } = require("./types");
// GraphqlModels
const Portfolio = require("./models/portfolio");
const User = require("./models/user");

exports.createApolloServer = () => {
  const typeDefs = gql(`
    ${portfolioTypes}
    ${userTypes}
    
    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }
    
     type Mutation {  
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput, ): Portfolio
      deletePortfolio(id: ID): ID
      
      signIn: String
      signUp: String
      signOut: String
    }     
   `);

  // root provides resolver for each api endpoints
  const resolvers = {
    Query: {
      ...portfolioQueries,
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: {
        Portfolio: new Portfolio(mongoose.model("Portfolio")),
        User: new User(mongoose.model("User")),
      },
    }),
  });

  return apolloServer;
};
