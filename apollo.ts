import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CachePersistor } from "apollo3-cache-persist";
import { createUploadLink } from "apollo-upload-client";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const isLoggedInVar = makeVar<boolean>(false);
export const tokenVar = makeVar<string | null>(null);

const TOKEN = "token";

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logOutUser = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
};

const httpLink = createHttpLink({
  uri: `https://pretty-mayfly-64.loca.lt/graphql`,
});

const uploadHttpLink = createUploadLink({
  uri: `https://pretty-mayfly-64.loca.lt/graphql`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error: ${JSON.stringify(graphQLErrors)}`);
  }
  if (networkError) {
    console.log(`Network Error: ${JSON.stringify(networkError)}`);
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
        // TODO: fix below (didn't load new photo after upload)
        // {
        //   keyArgs: false,
        //   merge(existing = [], incoming = []) {
        //     return [...existing, ...incoming];
        //   },
        // },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache,
});

export default client;
