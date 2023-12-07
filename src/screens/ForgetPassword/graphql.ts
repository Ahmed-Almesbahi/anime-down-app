import { gql } from "@apollo/client";

export const signInGraphQL = gql`
    mutation($email: String!, $pass: String!){
        signIn(
            email: $email
            pass: $pass
        ) {
            email
            user_id
            name_f
            name_l
            status
        }
    }
`;