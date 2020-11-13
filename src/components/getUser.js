import decode from "jwt-decode";
import { gql } from "./api";

export default (token) => {
  if (!token) return;
  let id = decode(token)["https://hasura.io/jwt/claims"]["x-hasura-user-id"];

  let params = {
    query: `query {
      users_by_pk(id: "${id}") {
        id,
        username,
      }
    }`,
  };

  return new Promise((resolve) =>
    gql
      .auth(`Bearer ${token}`)
      .post(params)
      .json(({ data }) => {
        console.log("resolving", data.users_by_pk);
        resolve(data.users_by_pk);
      })
  );
};
