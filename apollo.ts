import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://perfect-chicken-31.loca.lt/graphql",
  cache: new InMemoryCache(),
});

export default client;
