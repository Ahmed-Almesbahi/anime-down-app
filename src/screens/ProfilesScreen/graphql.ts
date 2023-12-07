import { gql } from '@apollo/client'

export const updateSelectedProfileGraphQL = gql`
  mutation ($profileId: Int!) {
    updateSelectedProfile(profileId: $profileId) {
      token
      name
      imageUrl
    }
  }
`
