import { gql } from '@apollo/client'

export const QueryAllVideosCategories = gql`
  query QueryAllVideosCategories {
    favourites: myVideosList {
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
      videoFilesCount
      isFavourited
    }
    series: videos(
      where: {
        AND: [{ assortment: { equals: 1 } }, { isActive: { equals: true } }]
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
      videoFilesCount
      isFavourited
    }
    movies: videos(
      where: {
        AND: [{ assortment: { equals: 2 } }, { isActive: { equals: true } }]
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
      videoFilesCount
      isFavourited
    }
    subbed: videos(
      where: {
        AND: [{ isSubbed: { equals: true } }, { isActive: { equals: true } }]
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
      videoFilesCount
      isFavourited
    }
    dubbed: videos(
      where: {
        AND: [{ isDubbed: { equals: true } }, { isActive: { equals: true } }]
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
      videoFilesCount
      isFavourited
    }
  }
`
