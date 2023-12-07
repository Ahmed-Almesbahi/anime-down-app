import React, { useState, useRef } from 'react'
import styles from './styles'
import { View, TouchableOpacity, Image, Animated, Platform } from 'react-native'
import Button from '../Button'
import AnimatedText from '../AnimatedText'
import Text from '../Text'
import { TouchableRipple } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { useHover } from '@huse/hover'
import Colors from '../../assets/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
// import {  UPDATE_FAVOURITES } from '../../screens/User/ducks'
import { useDispatch, useSelector } from 'react-redux'
import { createFavouriteGraphQL, deleteFavouriteGraphQL } from './graphql'
import { useMutation } from '@apollo/client'
import { QueryAllVideosCategories } from '../../screens/HomeScreen/graphql'

interface Props {
  id: number
  onPress?: () => void
  style?: any
  contentStyle?: any
  children?: React.ReactNode
  mode?: string
  name: string
  poster: () => any
  ageGroup: number
  yearOfCreation: number
  isDubbed: boolean
  isSubbed: boolean
  videoType: number
  completed: boolean
  isFavourited: boolean
  width: number
  VideoDetailsScreen: any
  navigation: any
  videoFilesCount: number
}

const Item: React.FC<Props> = (
  // {
  //   id,
  //   name,
  //   poster,
  //   videoFilesCount,
  //   ageGroup,
  //   yearOfCreation,
  //   isDubbed,
  //   isSubbed,
  //   videoType,
  //   completed,
  //   isFavourited,
  //   width,
  //   navigation,
  //   VideoDetailsScreen,
  // },
  props
) => {
  const {
    id,
    name,
    poster,
    videoFilesCount,
    ageGroup,
    yearOfCreation,
    isDubbed,
    isSubbed,
    videoType,
    completed,
    isFavourited,
    width,
    navigation,
    VideoDetailsScreen,
  } = props
  const [isHover, hoverCallbacks] = useHover(undefined)
  const dispatch = useDispatch()
  const { favourites } = useSelector((state) => ({
    favourites: state.user.favourites,
  }))
  const [createFavourite] = useMutation(createFavouriteGraphQL)
  const [deleteFavourite] = useMutation(deleteFavouriteGraphQL)

  // console.log('||||', props)

  const scale = useRef(new Animated.Value(1)).current
  const borderRadius = useRef(new Animated.Value(10)).current
  const height = useRef(new Animated.Value(0)).current
  const favBtnPosition = useRef(new Animated.Value(-50)).current
  const [nameColor] = useState(new Animated.Value(0))
  const [firstLineInfoColor] = useState(new Animated.Value(0))
  const [cardInfoPosition] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
  const [btnHeight] = useState(new Animated.Value(0))
  const [btnOpacity] = useState(new Animated.Value(0))
  const [linearGradientOpacity] = useState(new Animated.Value(0))
  const [tagsBackgroundColor] = useState(new Animated.Value(0))
  const [tagsTextColor] = useState(new Animated.Value(0))

  const animateNameColor = nameColor.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.textOnPrimary, Colors.textOnSurface],
  })
  const animateSubTextColor = firstLineInfoColor.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.textOnPrimaryLight, Colors.textOnSurface],
  })
  const animateTagsBackgroundColor = tagsBackgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.primaryDark, Colors.surfaceDark],
  })

  const startAnimated = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1.05,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.spring(borderRadius, {
        toValue: 25,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.spring(height, {
        toValue: 135,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.timing(nameColor, {
        toValue: 1,
        duration: 200,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.timing(firstLineInfoColor, {
        toValue: 1,
        duration: 200,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.spring(cardInfoPosition, {
        toValue: { x: 10, y: -55 },
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.spring(btnHeight, {
        toValue: 35,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.spring(btnOpacity, {
        toValue: 1,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.spring(linearGradientOpacity, {
        toValue: 1,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.spring(favBtnPosition, {
        toValue: 0,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.timing(tagsBackgroundColor, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(tagsTextColor, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const endAnimated = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.spring(borderRadius, {
        toValue: 5,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.timing(height, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(nameColor, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(firstLineInfoColor, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.spring(cardInfoPosition, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }),
      Animated.spring(btnHeight, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.spring(btnOpacity, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.spring(linearGradientOpacity, {
        toValue: 0,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.spring(favBtnPosition, {
        toValue: -50,
        useNativeDriver: false,
      }),
      Animated.timing(tagsBackgroundColor, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(tagsTextColor, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const setFavourites = (payload) => {
    dispatch({
      type: UPDATE_FAVOURITES,
      payload,
    })
  }
  // const addToFav = (videoId: Int) => {
  //   updateFavourites({...favourites, })
  // })
  return (
    <Animated.View
      {...hoverCallbacks}
      style={[
        styles.itemContainer,
        {
          transform: [{ scale }],
          width,
          borderRadius,
        },
      ]}
    >
      {isHover ? startAnimated() : endAnimated()}

      <Animated.View
        style={[
          styles.btnAddToFav,
          {
            top: favBtnPosition,
            opacity: btnOpacity,
          },
        ]}
      >
        {isFavourited ? (
          <Button
            onPress={() => {
              deleteFavourite({
                variables: {
                  videoId: parseInt(id),
                },
                refetchQueries: [{ query: QueryAllVideosCategories }],
              })
                .then((response) => {
                  console.log('response', response)
                })
                .catch((error) => {
                  console.log('error', error)
                })
            }}
            text='مضاف للمفضلة'
            hoverGlow={Colors.tertiary}
            icon='checkbox-marked-circle'
            hoverColor={Colors.tertiary}
            dark
            textColor={Colors.textOnSurface}
            color={Colors.tertiary}
          />
        ) : (
          <Button
            // onPress={() => console.log('Pressed')}
            onPress={() => {
              createFavourite({
                variables: {
                  id: parseInt(id),
                },
                refetchQueries: [{ query: QueryAllVideosCategories }],
                // refetchQueries: [{ include: QueryAllVideosCategories }],
              })
                .then((response) => {
                  console.log('response', response)
                })
                .catch((error) => {
                  console.log('error', error)
                })
            }}
            text='إضافة إلى المفضلة'
            mode='outlined'
            icon='plus-circle'
            color={Colors.surface}
            dark
            hoverGlow={Colors.surface}
          />
        )}
      </Animated.View>

      <TouchableRipple
        onPress={() =>
          navigation.navigate(VideoDetailsScreen, {
            videoId: id,
          })
        }
      >
        <>
          <View style={styles.imageSection} />
          <Animated.View
            style={{
              opacity: linearGradientOpacity,
              zIndex: 1,
            }}
          >
            <LinearGradient
              colors={['black', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)']}
              style={styles.linearGradientPosition}
            />
          </Animated.View>
          <Image
            source={poster}
            alt='itemPicture'
            style={{ ...styles.image, height: width * 1.5, borderRadius: 5 }}
          />
        </>
      </TouchableRipple>
      <View style={styles.infoPosition}>
        <Animated.View
          style={[
            styles.infoPositionContainer,
            {
              height: height,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.infoPositionAnimated,
            {
              opacity: btnOpacity,
              height: btnHeight,
            },
          ]}
        >
          <Button
            onPress={() =>
              navigation.navigate('Watch', {
                videoId: id,
              })
            }
            text='بدء المشاهدة'
            icon='play-outline'
            iconSize={28}
            glow
            dark
            hoverColor={Colors.secondary}
            textColor={Colors.textOnSurface}
            color={Colors.surface}
            glowColor={Colors.shadowOnSurface}
          />
        </Animated.View>
        <Animated.View
          style={[cardInfoPosition.getLayout(), styles.cardInfoOverflow]}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(VideoDetailsScreen, {
                videoId: id,
              })
            }
            style={{ marginBottom: 8 }}
          >
            <View style={{ alignItems: 'flex-start' }}>
              <AnimatedText
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  color: animateNameColor,
                }}
              >
                {name}
              </AnimatedText>
              <View style={styles.firstLineInfoDirection}>
                {isFavourited ? (
                  <MaterialCommunityIcons
                    name='checkbox-marked-circle'
                    style={styles.inMyFavIcon}
                    size={13}
                  />
                ) : null}
                <AnimatedText
                  numberOfLines={1}
                  style={[
                    styles.animatedFirstLineInfo,
                    {
                      color: animateSubTextColor,
                    },
                  ]}
                >
                  {
                    videoType === 1 || videoType === 3
                      ? videoFilesCount > 2 && videoFilesCount < 11
                        ? `${videoFilesCount} حلقات . ${yearOfCreation} . +${ageGroup} سنة`
                        : `${videoFilesCount} حلقة . ${yearOfCreation} . +${ageGroup} سنة`
                      : `${yearOfCreation} . +${ageGroup} سنة`
                    // : ({videoFilesCount} حلقة . {yearOfCreation} . +{ageGroup} سنة)
                  }
                </AnimatedText>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            {completed && videoType !== 2 ? (
              <View
                style={[styles.tags, { backgroundColor: Colors.quaternary }]}
              >
                <Text style={[styles.tagsText, { color: '#2e2e2e' }]}>
                  مكتمل
                </Text>
              </View>
            ) : null}
            <Animated.View
              style={[
                styles.tags,
                videoType === 2
                  ? { backgroundColor: Colors.quinary2 }
                  : { backgroundColor: animateTagsBackgroundColor },
              ]}
            >
              <AnimatedText
                style={[
                  styles.tagsText,
                  videoType === 2
                    ? { color: Colors.textOnSurface }
                    : { color: animateSubTextColor },
                ]}
              >
                {videoType === 2 ? 'فيلم' : videoType === 1 ? 'مسلسل' : 'أوفا'}
              </AnimatedText>
            </Animated.View>
            {isSubbed && (
              <Animated.View
                style={[
                  styles.tags,
                  { backgroundColor: animateTagsBackgroundColor },
                ]}
              >
                <AnimatedText
                  style={[styles.tagsText, { color: animateSubTextColor }]}
                >
                  مترجم
                </AnimatedText>
              </Animated.View>
            )}
            {isDubbed && (
              <Animated.View
                style={[
                  styles.tags,
                  { backgroundColor: animateTagsBackgroundColor },
                ]}
              >
                <AnimatedText
                  style={[styles.tagsText, { color: animateSubTextColor }]}
                >
                  مدبلج
                </AnimatedText>
              </Animated.View>
            )}
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  )
}

export default Item
