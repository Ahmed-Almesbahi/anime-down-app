import React, { useRef, useState } from 'react'
import styles from './styles'
import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native'
import Modal from '../Modal'
import Button from '../Button'
import AnimatedText from '../AnimatedText'
import Text from '../Text'
import { TouchableRipple, IconButton } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { useHover } from '@huse/hover'
import Colors from '../../assets/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface IProps {
  onPress?: () => void
  style?: any
  contentStyle?: any
  children?: React.ReactNode
  mode?: String
  title?: String
  thumb?: String
}

const Item = ({
  // picture,
  // episodes,
  // age,
  // publicationYear,
  // language,
  // videoType,
  // completed,
  // isFavourited,
  episodesNo,
  story,
  videoId,
  videoUrl,
  name,
  width,
  navigation,
  VideoDetailsScreen,
  thumb,
}) => {
  const [isHover, hoverCallbacks] = useHover(undefined)
  const ref = useRef(null)

  const scale = React.useRef(new Animated.Value(1)).current
  const borderRadius = React.useRef(new Animated.Value(5)).current
  const cardInfoOpacity = React.useRef(new Animated.Value(0)).current
  const [titleColor] = useState(new Animated.Value(0))
  const [subTitleColor] = useState(new Animated.Value(0))
  const [cardInfoPosition] = useState(new Animated.ValueXY(0, 0))
  const [iconBtn] = useState(new Animated.Value(0))
  const [linearGradientOpacity] = useState(new Animated.Value(0))

  const animateTitleColor = titleColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255,255,255)', 'rgb(0,0,0)'],
  })
  const animateSubTitleColor = subTitleColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255,255,255,.7)', 'rgba(0,0,0,.8)'],
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
      Animated.spring(cardInfoOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.timing(titleColor, {
        toValue: 1,
        duration: 200,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.timing(subTitleColor, {
        toValue: 1,
        duration: 200,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.spring(cardInfoPosition, {
        toValue: { x: 10, y: 0 },
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.spring(iconBtn, {
        toValue: 1,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
      Animated.spring(linearGradientOpacity, {
        toValue: 1,
        useNativeDriver: Platform.OS === 'web' ? false : true,
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
      Animated.timing(cardInfoOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(titleColor, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(subTitleColor, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.spring(cardInfoPosition, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }),
      Animated.spring(iconBtn, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.spring(linearGradientOpacity, {
        toValue: 0,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }),
    ]).start()
  }

  const playIcon = () => {
    const [isHover, hoverCallbacks] = useHover(undefined)

    return (
      <Animated.View style={styles.playIconContainer} {...hoverCallbacks}>
        <TouchableRipple
          style={[styles.playIconButton]}
          onPress={() =>
            navigation.navigate('Watch', {
              videoFileId: videoId,
            })
          }
          rippleColor={Colors.surfaceVeryTransparent}
        >
          <>
            <Text
              type='medium'
              style={[
                styles.playIcon,
                {
                  position: 'absolute',
                  left: 0,
                  paddingLeft: 15,
                  paddingTop: 10,
                },
                isHover && {
                  textShadowColor: Colors.surface,
                },
              ]}
            >
              بدء المشاهدة
            </Text>
            <MaterialCommunityIcons
              name={'play-outline'}
              size={40}
              style={[
                styles.playIcon,
                {
                  alignSelf: 'center',
                  marginTop: 50,
                },
                isHover && {
                  textShadowColor: Colors.surface,
                },
              ]}
              color={Colors.textOnPrimary}
            />
          </>
        </TouchableRipple>
      </Animated.View>
    )
  }

  return (
    <Animated.View
      {...hoverCallbacks}
      style={[
        styles.itemContainer,
        {
          transform: [{ scale }],
          borderRadius,
          width,
          // borderColor: 'green',
          // borderWidth: 1,
        },
      ]}
    >
      {isHover ? startAnimated() : endAnimated()}
      <Animated.View
        style={{
          opacity: linearGradientOpacity,
          position: 'absolute',
          maxHeight: 600,
          width: '100%',
          height: width * 0.55,
        }}
      >
        {playIcon()}

        <LinearGradient
          colors={[Colors.shadowOnSurface, 'black']}
          style={{
            height: width * 0.55,
          }}
        />
      </Animated.View>
      <TouchableRipple
        // onPress={() => console.log('77777')}
        onPress={() =>
          navigation.navigate('Watch', {
            videoFileId: videoId,
          })
        }
        style={{ zIndex: -1 }}
      >
        <Image
          // source={{uri: '../../assets/images/defaultEpisodes.jpeg'}}
          source={
            thumb
              ? { uri: thumb }
              : {
                  uri: 'https://images.animedown.tv/movies/testE-1622380599529.jpeg',
                }
          }
          style={{
            maxHeight: 600,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            width: '100%',
            height: width * 0.55,
          }}
        />
      </TouchableRipple>

      <View
        style={{
          bottom: 0,
          position: 'absolute',
          width: '100%',
          // borderColor: 'yellow',
          // borderWidth: 1,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 54,
            opacity: cardInfoOpacity,
            width: '100%',
            backgroundColor: 'white',
            // borderColor: 'green',
            // borderWidth: 1,
          }}
        />
        <Animated.View
          style={[
            cardInfoPosition.getLayout(),
            {
              overflow: 'hidden',
              marginRight: 20,
              // borderColor: 'red',
              // borderWidth: 1,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Watch', {
                videoFileId: videoId,
              })
            }
            style={{
              marginBottom: 20,
              // borderColor: 'green',
              // borderWidth: 1
            }}
          >
            <View style={{ alignItems: 'flex-start' }}>
              <AnimatedText
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  color: animateTitleColor,
                }}
              >
                {name}
              </AnimatedText>
              {/* <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                <AnimatedText
                  numberOfLines={1}
                  style={{
                    marginTop: 5,
                    fontSize: 13,
                    color: animateSubTitleColor,
                  }}
                >
                  {name}
                </AnimatedText>
              </View> */}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
      {/* <Modal
        // useNativeDriver={true}
        ref={ref}
        style={{ backgroundColor: Colors.septenary }}
        closeIcon={false}
      >
        <View style={{ marginHorizontal: -19, marginTop: -25 }}>
          <Image
            source={require('../../assets/images/videoDetailsPoster.jpeg')}
            style={{
              width: '100%',
              height: 180,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        </View>
        <View style={{ paddingTop: 20 }} />
        <Text style={[styles.madalText, styles.modalTitle]} type='bold'>
          {title}
        </Text>
        <Text style={[styles.madalText, styles.subtitle]}>
          S1:E3 - The Red-Nosed Reindeer
        </Text>
        <Text style={[styles.madalText, styles.description]}>{story}</Text>
        <Text style={[styles.madalText, styles.subtitle]}>
          24m • Not Available
        </Text>
        <View style={{ alignItems: 'flex-start' }}>
          <Button
            onPress={() => ref.current.hide()}
            mode='outlined'
            text='إغلاق'
            style={{ marginTop: 10 }}
            color={Colors.surfaceTransparent}
            textHoverColor={Colors.textOnSurface}
          />
        </View>
      </Modal> */}
    </Animated.View>
  )
}

export default Item
