import { gql } from '@apollo/client'

export const signUpGraphQL = gql`
  mutation ($email: String!, $password: String!) {
    createOneUser(email: $email, password: $password) {
      email
      id
      token
    }
  }
`
