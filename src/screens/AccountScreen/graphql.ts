import { gql } from '@apollo/client'

export const QueryAllVideosCategories = gql`
  query QueryAllVideosCategories($profileId: Int!) {
    favourites: videos(
      where: { favourites: { some: { profile: { equals: $profileId } } } }
    ) {
      id
      name
      isCompleted
      yearOfCreation
      assortment
      Poster {
        url
      }
      story
      isSubbed
      isDubbed
      ageGroup
    }
    series: videos(where: { assortment: { equals: 1 } }) {
      id
      name
      isCompleted
      yearOfCreation
      assortment
      Poster {
        url
      }
      story
      isSubbed
      isDubbed
      ageGroup
    }
    movies: videos(where: { assortment: { equals: 2 } }) {
      id
      name
      isCompleted
      yearOfCreation
      assortment
      Poster {
        url
      }
      story
      isSubbed
      isDubbed
      ageGroup
    }
    subbed: videos(where: { isSubbed: { equals: true } }) {
      id
      name
      isCompleted
      yearOfCreation
      assortment
      Poster {
        url
      }
      story
      isSubbed
      isDubbed
      ageGroup
    }
    dubbed: videos(where: { isDubbed: { equals: true } }) {
      id
      name
      isCompleted
      yearOfCreation
      assortment
      Poster {
        url
      }
      story
      isSubbed
      isDubbed
      ageGroup
    }
  }
`
