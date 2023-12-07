import { gql } from '@apollo/client'

export const signInGraphQL = gql`
  mutation ($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      token
      status
      Profiles {
        id
        name
        Image {
          url
        }
      }
    }
  }
`
