import { gql } from '@apollo/client'

export const createFavouriteGraphQL = gql`
  mutation ($id: Int!) {
    createOneFavourite(data: { Video: { connect: { id: $id } } }) {
      id
      video
      profile
    }
  }
`
export const deleteFavouriteGraphQL = gql`
  mutation ($videoId: Int!) {
    deleteOneFavourite(videoId: $videoId) {
      id
      video
      profile
    }
  }
`
