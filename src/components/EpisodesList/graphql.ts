import { gql } from '@apollo/client'

export const videoFilesQuery = gql`
  query videoFilesQuery($videoId: Int!, $seasonId: Int!) {
    videoFiles(
      where: {
        AND: [
          { video: { equals: $videoId } }
          { season: { equals: $seasonId } }
          { isActive: { equals: true } }
          { isPreview: { equals: false } }
          { isReady: { equals: true } }
        ]
      }
      orderBy: { name: asc }
    ) {
      id
      name
      # Thumb {
      #   url
      # }
    }
  }
`
