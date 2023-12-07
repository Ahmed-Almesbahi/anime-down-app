import React, { useState } from 'react'
import styles from './styles'
import Colors from '../../assets/colors'
import Text from '../../components/Text'
import Dimensions_ from '../../components/Dimensions_'
import Button from '../../components/Button'
import EpisodesList from '../../components/EpisodesList'
import AnimeList from '../../components/AnimeList'
import { View, Image } from 'react-native'
import { useQuery } from '@apollo/client'
import { videoQuery } from './graphql'
import ScreenWrapper from '../ScreenWrapper'

const VideoDetailsScreen = ({ navigation, route }) => {
  const [state, setState] = useState(null)
  const { videoId } = route.params
  const openedDropDownList = () => setState(false)
  const { loading, error, data } = useQuery(videoQuery, {
    variables: { videoId: parseInt(videoId) },
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

  const genres = (data) => {
    let _data = []
    data?.map((a) => {
      _data.push(
        <Button
          key={a.id}
          size='small'
          dark
          mode='outlined'
          text={a.name}
          style={{ marginRight: 10, marginTop: 10 }}
          // onPress={() => console.log("Pressed")}
        />
      )
    })
    return _data
  }

  // <ScrollView style={styles.container}>
  return (
    <ScreenWrapper>
      {/* <TouchableWithoutFeedback
        onPress={() => {
          state ? null : setState(true)
        }}
      >
        <View>
          <> */}
      {!loading && !error ? (
        <>
          {Dimensions_().isIsmallScreenOrSmaller && (
            <View style={styles.videoPosterSmallScreenContainer}>
              <Image
                source={
                  data?.video?.Poster
                    ? data?.video.Poster.url
                    : 'https://images.animedown.tv/movies/no-image-found.jpg'
                }
                style={styles.videoPosterSmallScreen}
              />
            </View>
          )}
          <View style={styles.videoInfoDirection}>
            {!Dimensions_().isIsmallScreenOrSmaller && (
              <View style={styles.videoPosterContainer}>
                <View style={styles.videoPosterPosition}>
                  <Image
                    // source={data?.video.Poster.url}
                    source={
                      data?.video?.Poster
                        ? data.video.Poster.url
                        : 'https://images.animedown.tv/movies/no-image-found.jpg'
                    }
                    style={styles.videoPoster}
                  />
                </View>
              </View>
            )}

            <View style={styles.videoInfoContainer}>
              <View style={styles.videoInfoSection1}>
                <Text
                  style={{
                    fontSize: Dimensions_()?.isIsmallScreenOrSmaller ? 30 : 55,
                    color: Colors.textOnPrimary,
                  }}
                  numberOfLines={1}
                >
                  {data?.video?.name}
                </Text>
                <Text
                  style={{
                    fontSize: Dimensions_().isIsmallScreenOrSmaller ? 13 : 16,
                    color: Colors.textOnPrimaryLight,
                    marginTop: 10,
                  }}
                >
                  {data?.video?.yearOfCreation}
                  {data?.video?.isSubbed ? ' - مترجم' : ''}
                  {data?.video?.isDubbed ? ' - مدبلج' : ''}
                  {data?.video?.isCompleted ? ' - مكتمل' : ''}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    // justifyContent: 'flex-en',
                    marginVertical: 13,
                    color: Colors.textOnPrimaryLight,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Colors.primaryDark,
                      justifyContent: 'center',
                      borderRadius: 20,
                      paddingHorizontal: 8,
                      paddingBottom: 3,
                      marginRight: 5,
                      paddingTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        margin: 0,
                        fontSize: 11,
                        color: Colors.textOnPrimaryLight,
                      }}
                    >
                      {data?.video?.ageGroup}+
                    </Text>
                  </View>
                  <View
                    style={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.textOnPrimary,
                        fontSize: Dimensions_().isIsmallScreenOrSmaller
                          ? 12
                          : 14,
                        textAlign: 'left',
                      }}
                      numberOfLines={3}
                    >
                      يوصى بعدم المشاهدة إلا بتوصية الوالدين لمن هم أقل من{' '}
                      {data?.video?.ageGroup} سنوات
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.videoInfoSection2}>
                {/* {console.log(
                  'data----',
                  data?.episodes?.VideoFiles.length === 1
                    ? 'movie'
                    : data?.seasons?.length > 0
                    ? 'مسلسل'
                    : `no ${data?.episodes?.VideoFiles}`
                )} */}
                {data?.seasons?.length > 0 ||
                data?.watchVideo?.VideoFiles.length > 0 ? (
                  <Button
                    text={
                      data?.seasons?.length > 0
                        ? 'عرض الحقلة 1 من الجزء 1'
                        : 'عرض الفيلم'
                    }
                    // height={13}
                    // onPress={() => navigation.navigate('Watch')}
                    onPress={() =>
                      navigation.navigate('Watch', {
                        videoFileId:
                          data?.watchVideo?.VideoFiles[0]?.id ||
                          data?.watchVideo?.id,
                      })
                    }
                    style={{
                      width: '100%',
                      maxWidth: 400,
                    }}
                    icon='play-outline'
                    hoverGlow={Colors.secondary}
                    iconSize={33}
                    dark
                    hoverColor={Colors.secondary}
                    textColor={Colors.textOnSurface}
                    size='large'
                  />
                ) : (
                  <Text>لا توجد فيديوهات</Text>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    marginBottom: 15,
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    onPress={() => console.log('Pressed')}
                    text='إضافة إلى المفضلة'
                    hoverGlow={Colors.surface}
                    mode='outlined'
                    icon='plus-circle'
                    size='small'
                    dark
                    style={{ marginRight: 10 }}
                  />
                  {data?.preview?.length > 0 ? (
                    <Button
                      icon='play-outline'
                      size='small'
                      // onPress={() => console.log('Pressed')}
                      onPress={() =>
                        navigation.navigate('Watch', {
                          videoFileId: data?.preview[0]?.id,
                        })
                      }
                      text='عرض المقدمة'
                      mode='outlined'
                      dark
                      iconSize={20}
                    />
                  ) : null}
                </View>
                <Text style={{ color: Colors.surface, marginVertical: 17 }}>
                  {data?.video?.name}
                </Text>
                <Text
                  style={{
                    marginBottom: 40,
                    color: Colors.textOnPrimaryLight,
                    textAlign: 'left',
                  }}
                >
                  {data?.video?.story}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                  }}
                >
                  {genres(data?.video?.Genre)}
                </View>
                <View style={styles.darkBackground} />
              </View>
            </View>

            {/* <View style={{ borderColor: 'red', borderWidth: 1 }}>
              {!Dimensions_().isIsmallScreenOrSmaller && (
                <View style={styles.videoPosterContainer}>
                  <View style={styles.videoPosterPosition}>
                    <Image
                      source={require('../../assets/images/videoDetailsPoster.jpeg')}
                      style={styles.videoPoster}
                    />
                  </View>
                </View>
              )}
            </View> */}
          </View>
          {data?.seasons.length > 0 ? (
            <View
              style={{
                width: '100%',
                height: 350,
              }}
            >
              <EpisodesList
                _data={data}
                horizontal
                navigation={navigation}
                openedDropDownList={openedDropDownList}
                closeDropDownList={state}
              />
            </View>
          ) : null}
          <View style={{ width: '100%' }}>
            <AnimeList
              data={sortingData(data.recentlyAdded)}
              horizontal
              title='مضاف مؤخرا'
              navigation={navigation}
            />
          </View>
        </>
      ) : null}
      {/* </>
        </View>
      </TouchableWithoutFeedback > */}
    </ScreenWrapper>
  )
  {
    /* </ScrollView> */
  }
}
export default VideoDetailsScreen
