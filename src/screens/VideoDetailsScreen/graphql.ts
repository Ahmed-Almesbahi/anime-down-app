import { gql } from '@apollo/client'

export const videoQuery = gql`
  query videoQuery($videoId: Int!) {
    video: video(where: { id: $videoId }) {
      id
      name
      isCompleted
      yearOfCreation
      assortment
      Poster {
        url
      }
      Genre {
        id
        name
      }
      story
      isSubbed
      isDubbed
      ageGroup
    }
    recentlyAdded: videos(
      where: { isActive: { equals: true } }
      take: 5
      orderBy: { createdAt: desc }
    ) {
      id
      name
      isCompleted
      yearOfCreation
      assortment
      Poster {
        url
      }
      Genre {
        id
        name
      }
      isSubbed
      isDubbed
      ageGroup
    }
    seasons: seasons(
      where: {
        VideoFile: {
          some: {
            AND: [
              { video: { equals: $videoId } }
              { isReady: { equals: true } }
              { isActive: { equals: true } }
              { isPreview: { equals: false } }
            ]
          }
        }
      }
    ) {
      id
      name
    }
    preview: videoFiles(
      where: {
        AND: [
          { video: { equals: $videoId } }
          { isPreview: { equals: true } }
          { isActive: { equals: true } }
          { isReady: { equals: true } }
        ]
      }
    ) {
      id
    }
    watchVideo: video(where: { id: $videoId }) {
      VideoFiles(
        where: {
          AND: [
            { isActive: { equals: true } }
            { isPreview: { equals: false } }
          ]
        }
        take: 1
      ) {
        id
      }
      id
    }
  }
`
