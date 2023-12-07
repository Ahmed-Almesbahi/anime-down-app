import { gql } from '@apollo/client'

export const images = gql`
  query($profileId1: Int!, $profileId2: Int!, $profileId3: Int!) {
    images(
      where: {
        AND: [
          { name: { contains: "defaultProfile" } }
          { Profile: { none: { id: { equals: $profileId1 } } } }
          { Profile: { none: { id: { equals: $profileId2 } } } }
          { Profile: { none: { id: { equals: $profileId3 } } } }
        ]
      }
    ) {
      name
      url
      id
    }
  }
`
export const createProfile = gql`
  mutation($name: String, $image: Int, $user: Int) {
    createOneProfile(
      data: {
        name: $name
        Image: { connect: { id: $image } }
        User: { connect: { id: $user } }
      }
    ) {
      id
      name
      Image {
        url
      }
    }
  }
`
export const deleteProfile = gql`
  mutation($profileId: Int) {
    deleteOneProfile(where: { id: $profileId }) {
      id
    }
  }
`
export const updateProfile = gql`
  mutation($name: String, $image: Int, $profileId: Int) {
    updateOneProfile(
      where: { id: $profileId }
      data: { name: { set: $name }, Image: { connect: { id: $image } } }
    ) {
      id
      name
      Image {
        url
      }
    }
  }
`
