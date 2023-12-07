import { EvilIcons } from '@expo/vector-icons'
import React, { useRef } from 'react'
import { TouchableRipple } from 'react-native-paper'
import { View, Platform, Animated } from 'react-native'
import styles from './styles'
import { useHover } from '@huse/hover'

const arrows = ({ isLeft, goToSlide }) => {
  const scale = useRef(new Animated.Value(0.3)).current
  const startAnimated = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: Platform.OS === 'web' ? false : true,
    }).start()
  }

  const endAnimated = () => {
    Animated.spring(scale, {
      toValue: 0.3,
      useNativeDriver: Platform.OS === 'web' ? false : true,
    }).start()
  }

  const [isHover, hoverCallbacks] = useHover(undefined)
  const icon = () => (
    <EvilIcons
      name={isLeft ? 'chevron-left' : 'chevron-right'}
      style={[
        styles.arrowsIcon,
        { opacity: !isHover && Platform.OS === 'web' ? 0 : 1 },
      ]}
      size={100}
    />
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
      <TouchableRipple
        onPress={() => {
          isLeft ? goToSlide('next') : goToSlide('prev')
        }}
        style={styles.arrowsBody}
      >
        <Animated.View
          style={{
            transform: [{ scale }],
          }}
        >
          {isHover ? startAnimated() : endAnimated()}
          {icon()}
        </Animated.View>
      </TouchableRipple>
    </View>
  )
}
export default arrows
