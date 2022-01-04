const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");

// resolvers
const {
  portfolioQueries,
  portfolioMutations,
  userMutations,
  userQueries,
  forumQueries,
  forumMutations,
} = require("./resolvers");

// types
const { portfolioTypes, userTypes, forumTypes } = require("./types");

// GraphqlModels
const Portfolio = require("./models/portfolio");
const User = require("./models/user");
const ForumCategory = require("./models/forumCategory");
const Topics = require("./models/topics");

const { buildAuthContext } = require("./context");

exports.createApolloServer = () => {
  const typeDefs = gql(`
    ${portfolioTypes}
    ${userTypes}
    ${forumTypes}
    
    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
      user: User
      userPortfolios: [Portfolio]
      forumCategories: [ForumCategory]
      topicsByCategory(category: String): [Topic]
    }
    
     type Mutation {  
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput, ): Portfolio
      deletePortfolio(id: ID): ID
      createTopic(input: TopicInput): Topic
      
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
      ...forumQueries,
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
      ...forumMutations,
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
        ForumCategory: new ForumCategory(mongoose.model("ForumCategory")),
        Topic: new Topics(mongoose.model("Topic"), req.user),
      },
    }),
  });

  return apolloServer;
};
