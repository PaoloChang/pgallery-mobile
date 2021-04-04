import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { SERVER_URI } from "@env";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: `${SERVER_URI}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
