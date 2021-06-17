const express = require("express");
const cors = require("cors");
const next = require("next");
const { ApolloServer, gql } = require('apollo-server-express');

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// resolvers
const { portfolioQueries, portfolioMutations } = require('./graphql/resolvers');
// types
const { portfolioTypes } = require('./graphql/types');

app.prepare().then(() => {
  const server = express();
  // server.use(cors());
  // Construct schema, using graph ql schema language
    const typeDefs = gql(`
      ${portfolioTypes}
      
      type Query {  
        hello: String
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
      ...portfolioQueries
    },
    Mutation: {
      ...portfolioMutations
    }
  };

  const apolloServer = new ApolloServer({typeDefs, resolvers})
  apolloServer.applyMiddleware({app: server})

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});