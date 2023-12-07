import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import Banner from '../../components/Banner'
import AnimeList from '../../components/AnimeList'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery, refetchQueries } from '@apollo/client'
import styles from './styles'
import { QueryAllVideosCategories } from './graphql'
import ScreenWrapper from '../ScreenWrapper'
// import { UPDATE_FAVOURITES } from '../../screens/User/ducks'

const HomeScreen = ({ navigation }) => {
  // useEffect(() => {

  // }, [])
  // const { loading, error, data } = refetchQueries(QueryAllVideosCategories)
  const { loading, error, data } = useQuery(QueryAllVideosCategories)

  // const aa = await refetchQueries({
  //   include: ["SomeQueryName"],
  // });
  // const dispatch = useDispatch()
  // const setFavourites = (payload) => {
  //   dispatch({
  //     type: UPDATE_FAVOURITES,
  //     payload,
  //   })
  // }
  // useEffect(() => {
  //   if (data && data.favourites && data.favourites.length > 0) {
  //     setFavourites(sortingData(data.favourites))
  //   }
  // }, [data])

  // const { favourites } = useSelector((state) => ({
  //   favourites: state.user.favourites,
  // }))
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
        videoFilesCount: a.videoFilesCount,
        ageGroup: a.ageGroup,
        yearOfCreation: a.yearOfCreation,
        isDubbed: a.isDubbed,
        isSubbed: a.isSubbed,
        videoType: a.assortment,
        completed: a.isCompleted,
        isFavourited: a.isFavourited,
        VideoDetailsScreen: 'VideoDetails',
      })
    })
    return _data
  }

  // updateFavourites(sortingData(data.favourites))

  if (error) {
    console.log('Error! home screen', error)
  }
  return (
    <ScreenWrapper fullWidthContent>
      <Banner />
      {!loading && !error ? (
        <>
          {/* {console.log("sortingData(data.favourites)", sortingData(data.favourites))} */}
          {data && data.favourites && data.favourites.length > 0 ? (
            <AnimeList
              data={sortingData(data.favourites)}
              // data={favourites}
              horizontal={true}
              title='قائمتي'
              url='my-list'
            />
          ) : null}
          <AnimeList
            data={sortingData(data.series)}
            horizontal={true}
            title='المسلسلات'
            url='series'
          />
          <AnimeList
            data={sortingData(data.movies)}
            horizontal={true}
            title='الأفلام'
            url='movies'
          />
          <AnimeList
            data={sortingData(data.subbed)}
            horizontal={true}
            title='المترجم'
            url='subbed'
          />
          <AnimeList
            data={sortingData(data.dubbed)}
            horizontal={true}
            title='المدبلج'
            url='dubbed'
          />
        </>
      ) : null}
    </ScreenWrapper>
  )
  {
    /* </ScrollView> */
  }
}
export default HomeScreen
