const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");

// resolvers
const { portfolioQueries, portfolioMutations } = require("./resolvers");
// types
const { portfolioTypes } = require("./types");
// GraphqlModels
const Portfolio = require("./models/Portfolio");

exports.createApolloServer = () => {
  const typeDefs = gql(`
    ${portfolioTypes}
    
    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }
    
     type Mutation {  
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput, ): Portfolio
      deletePortfolio(id: ID): ID
    }     
   `);

  // root provides resolver for each api endpoints
  const resolvers = {
    Query: {
      ...portfolioQueries,
    },
    Mutation: {
      ...portfolioMutations,
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: {
        Portfolio: new Portfolio(mongoose.model("Portfolio")),
      },
    }),
  });

  return apolloServer;
};
