import { EvilIcons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { TouchableRipple } from 'react-native-paper'
import { View, Platform, Animated } from 'react-native'
import styles from './styles'
import { useHover } from '@huse/hover'
import { Dimensions, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../assets/colors'

const arrows = ({ isLeft, goToSlide }) => {
  const scale = useRef(new Animated.Value(1)).current
  const startAnimated = () => {
    Animated.spring(scale, {
      toValue: 0.8,
      useNativeDriver: Platform.OS === 'web' ? false : true,
    }).start()
  }

  const endAnimated = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: Platform.OS === 'web' ? false : true,
    }).start()
  }

  const [isHover, hoverCallbacks] = useHover(undefined)
  const icon = () => (
    <TouchableRipple
      style={{
        backgroundColor: 'white',
        borderRadius: 50,
        width: Dimensions.get('window').width * 0.03,
        alignItems: 'center',
        // textShadowColor: Colors.shadowOnPrimary,
        shadowRadius: 10,
      }}
    >
      <EvilIcons
        name={isLeft ? 'chevron-left' : 'chevron-right'}
        style={[styles.arrowsIcon]}
        size={Dimensions.get('window').width * 0.035}
      />
    </TouchableRipple>
  )

  return (
    <View
      {...hoverCallbacks}
      style={[
        styles.arrowsContainer,
        {
          left: isLeft ? undefined : 0,
          right: isLeft ? 0 : undefined,
        },
      ]}
    >
      <LinearGradient
        colors={
          isLeft
            ? [Colors.primary, 'transparent']
            : ['transparent', Colors.primary]
        }
        start={{ x: 0, y: 1 }}
        style={[styles.linearGradient]}
      />

      <TouchableOpacity
        onPress={() => {
          isLeft ? goToSlide('next') : goToSlide('prev')
        }}
        style={styles.arrowsBody}
      >
        <Animated.View
          style={{
            transform: [{ scale }],
            alignItems: 'center',
          }}
        >
          {isHover ? startAnimated() : endAnimated()}
          {icon()}
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}
export default arrows
