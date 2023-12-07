import React from 'react'
import { ScrollView, View } from 'react-native'
import styles from './styles'
import Colors from '../../assets/colors'
import { useSelector } from 'react-redux'
import AnimeList from '../../components/AnimeList'
import Text from '../../components/Text'
import { useQuery } from '@apollo/client'
import { favourites, series, movies, subbed, dubbed } from './graphql'
import ScreenWrapper from '../ScreenWrapper'

const CategoryScreen = ({ navigation, route }) => {
  const { profileId } = useSelector((state) => ({
    profileId: state.user.profiles[0].id,
  }))

  const { sort } = route.params
  let selectedQuery = null
  switch (sort) {
    case 'my-list':
      selectedQuery = favourites
      break
    case 'series':
      selectedQuery = series
      break
    case 'movies':
      selectedQuery = movies
      break
    case 'subbed':
      selectedQuery = subbed
      break
    case 'dubbed':
      selectedQuery = dubbed
      break
    default:
      selectedQuery = series
  }

  const { loading, error, data } = useQuery(selectedQuery, {
    variables: { profileId },
  })

  if (error) {
    console.log('error', error)
  }

  const sortingData = (sortBy) => {
    let _data = []
    sortBy.map((a) => {
      _data.push({
        id: a.id.toString(),
        name: a.name,
        poster: {
          uri: a.Poster
            ? a.Poster.url
            : 'https://images.animedown.tv/movies/no-image-found.jpg',
        },
        episodes: 99,
        ageGroup: a.ageGroup,
        yearOfCreation: a.yearOfCreation,
        isDubbed: a.isDubbed,
        isSubbed: a.isSubbed,
        videoType: a.assortment,
        completed: a.isCompleted,
        isFavourited: true,
        VideoDetailsScreen: 'VideoDetails',
      })
    })
    return _data
  }

  return (
    <ScreenWrapper fullWidthContent>
      <View />
      {!loading && !error ? (
        data[Object.keys(data)[0]].length > 0 ? (
          <AnimeList
            data={sortingData(data[Object.keys(data)[0]])}
            horizontal={false}
            navigation={navigation}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 22 }}>
              لم تضِف أي فيديو إلى قائمتك بعد
            </Text>
          </View>
        )
      ) : null}
    </ScreenWrapper>
  )
}
export default CategoryScreen
