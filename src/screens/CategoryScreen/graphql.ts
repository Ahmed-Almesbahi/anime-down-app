import { gql } from '@apollo/client'

export const favourites = gql`
  query favourites($profileId: Int!) {
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
  }
`
export const series = gql`
  query series {
    series: videos(
      where: {
        AND: [
          { Assortment: { name: { equals: "Series" } } }
          { isActive: { equals: true } }
        ]
      }
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
  }
`
export const movies = gql`
  query movies {
    movies: videos(
      where: {
        AND: [
          { Assortment: { name: { equals: "Movies" } } }
          { isActive: { equals: true } }
        ]
      }
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
  }
`
export const dubbed = gql`
  query dubbed {
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
export const subbed = gql`
  query subbed {
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
  }
`
