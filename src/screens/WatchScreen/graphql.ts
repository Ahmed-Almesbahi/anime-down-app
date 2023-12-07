import { gql } from '@apollo/client'

export const QueryWatchVideo = gql`
  query QueryWatchVideo($videoFileId: Int!) {
    videoFile: videoFile(where: { id: $videoFileId }) {
      id
      # name
      aws_url
      # url
      # originalHeight
      # originalWidth
    }
  }
`

// export const MutationUpsertWatch = gql`
//    mutation MutationUpsertWatch(
//      $where: WatchWhereUniqueInput!
//      $create: WatchCreateInput!
//      $update: WatchUpdateInput!
// ) {
//      upsertWatch(where: $where, create: $create, update: $update) {
//        __typename
//        id
//        progress

//    }

//  }
// `;

// #     import gql from 'graphql-tag';

// # export const QueryWatchMovie = gql`
// #   query QueryWatchMovie($where: VideoFileWhereUniqueInput!) {
// #     videoFile: videoFile(where: $where) {
// #       id
// #       name
// #       aws_url
// #       originalHeight
// #       originalWidth
// #       #nextMovie {
// #       #  id
// #       #  name
// #       #  aws_url
// #       #
//     # }
// #       watch {
// #         id
// #         progress
// #
//     # }
// #
//   # }
// #
// # }
// #`;

// # // # export const MutationUpsertWatch = gql`
// # // #   mutation MutationUpsertWatch(
// # // #     $where: WatchWhereUniqueInput!
// # // #     $create: WatchCreateInput!
// # // #     $update: WatchUpdateInput!
// # // #) {
// # // #     upsertWatch(where: $where, create: $create, update: $update) {
// # // #       __typename
// # // #       id
// # // #       progress
// # // #
// # //   # }
// # // #
// # // # }
// # // #`;
