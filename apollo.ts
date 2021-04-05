import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { SERVER_URI } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token: string) => {
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", "yes"],
  ]);
  isLoggedInVar(true);
  tokenVar(token);
};

const client = new ApolloClient({
  uri: `${SERVER_URI}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
