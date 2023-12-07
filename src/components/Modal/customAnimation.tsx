import { Animated } from 'react-native'
import { Animation } from 'react-native-modals'

export default class CustomAnimation extends Animation {
  in(onFinished) {
    Animated.spring(this.animate, {
      toValue: 1,
      bounciness: 0,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished)
  }

  out(onFinished) {
    Animated.spring(this.animate, {
      toValue: 0,
      bounciness: 0,
      useNativeDriver: this.useNativeDriver,
    }).start(onFinished)
  }

  getAnimations() {
    return {
      transform: [
        {
          scaleX: this.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
        {
          translateY: this.animate.interpolate({
            inputRange: [0, 1],
            outputRange: [-800, 1],
          }),
        },
      ],
    }
  }
}
