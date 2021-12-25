import withApollo from "next-with-apollo";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { getDaysOfExperience } from "../utils/getDaysOfExperience";

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      request: (operation) => {
        operation.setContext({
          fetchOptions: {
            credentials: "include",
          },
          headers,
        });
      },
      uri: "http://localhost:4000/graphql",
      cache: new InMemoryCache({
        typePolicies: {
          Portfolio: {
            fields: {
              daysOfExperience: {
                read(field, { readField }) {
                  const startDate = readField("startDate");
                  const endDate = readField("endDate");
                  return startDate && endDate
                    ? getDaysOfExperience(startDate, endDate)
                    : null;
                },
              },
            },
          },
        },
      }).restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
