import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logOutUser } from "../apollo";

export const SEE_ME_QUERY = gql`
  query seeMe {
    seeMe {
      id
      username
      avatar
      totalFollowing
      totalFollowers
    }
  }
`;

interface IUser {
  seeMe: {
    id: number;
    username: string;
    avatar: string;
  };
}

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<IUser>(SEE_ME_QUERY, {
    skip: !hasToken,
  });
  // console.log(data);
  useEffect(() => {
    if (data === undefined) return;
    if (data.seeMe === null) {
      // There is a token on localStorage but the token didn't work on the backend
      logOutUser();
    }
  }, [data]);
  return { data };
};

export default useUser;
