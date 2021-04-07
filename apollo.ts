import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
// import { SERVER_URI } from "@env";
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

export const logOutUser = async () => {
  await AsyncStorage.multiSet([
    ["token", ""],
    ["loggedIn", "no"],
  ]);
  isLoggedInVar(false);
  tokenVar("");
};

const client = new ApolloClient({
  uri: `https://short-bullfrog-74.loca.lt/graphql`,
  cache: new InMemoryCache(),
});

export default client;
