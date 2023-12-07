import React from 'react'
import { ActivityIndicator, TouchableRipple } from 'react-native-paper'
import { View } from 'react-native'
import Text from '../Text'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'
import { useHover } from '@huse/hover'
import Colors from '../../assets/colors'

interface Props {
  onPress: () => void
  text: string
  style?: any
  dark?: boolean
  color?: string
  hoverColor?: string
  mode?: 'outlined' | 'contained'
  glow?: boolean
  glowColor?: string
  hoverGlow?: string
  iconSize?: number
  icon?: string
  textColor?: string
  textHoverColor?: string
  size?: 'large' | 'medium' | 'small'
  loading?: boolean
}

const Button: React.FC<Props> = ({
  dark,
  color,
  hoverColor,
  mode,
  text,
  style,
  onPress,
  glow,
  hoverGlow,
  iconSize,
  icon,
  textColor,
  textHoverColor,
  size,
  glowColor,
  loading,
  ...props
}) => {
  const [isHover, hoverCallbacks] = useHover(undefined)
  // const color = React.useRef(new Animated.Value(0)).current

  // const animateColor = color.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [textColor || 'rgb(255, 255, 255)', "rgb(0,0,0)"]
  // })

  // const startAnimated = () => {
  //   Animated.spring(color, {
  //     toValue: 1,
  //     duration: 0
  //   }).start()
  // }
  // const endAnimated = () => {
  //   Animated.spring(color, {
  //     toValue: 0,
  //     duration: 100
  //   }).start()
  // }

  return (
    <View
      {...hoverCallbacks}
      style={[
        {
          borderRadius: 50,
          shadowRadius: glow ? 18.3 : isHover && hoverGlow ? 18.3 : undefined,
          shadowColor: !loading
            ? isHover
              ? mode === 'outlined'
                ? dark
                  ? hoverColor || color || Colors.shadowOnPrimary
                  : hoverColor || color || Colors.primary
                : dark
                ? hoverColor || color || Colors.shadowOnPrimary
                : hoverColor || color || Colors.surfaceTransparent
              : dark
              ? glowColor || color || Colors.shadowOnPrimary
              : glowColor || color || Colors.primary
            : Colors.senary,
          borderWidth: mode == 'outlined' ? 1 : undefined,
          borderColor:
            mode == 'outlined'
              ? isHover
                ? 'transparent'
                : // ? dark
                //   ? hoverColor || color || Colors.primary
                //   : hoverColor || color || Colors.background
                dark
                ? color || Colors.surface
                : color || Colors.primary
              : undefined,
          backgroundColor: loading
            ? Colors.senary
            : isHover
            ? mode === 'outlined'
              ? dark
                ? hoverColor || color || Colors.surface
                : hoverColor || color || Colors.primary
              : dark
              ? hoverColor || Colors.surfaceTransparent
              : hoverColor || Colors.primaryLight
            : mode === 'outlined'
            ? 'transparent'
            : dark
            ? color || Colors.surface
            : color || Colors.primary,
        },
        style,
      ]}
    >
      {/* {isHover ? startAnimated() : endAnimated()} */}
      <TouchableRipple
        {...props}
        onPress={onPress}
        rippleColor={dark ? 'rgba(0, 0, 0, .1)' : 'rgba(255, 255, 255, .1)'}
        style={styles.touchableRipple}
      >
        <View
          style={[
            styles.centerContent,
            {
              justifyContent: icon ? 'space-between' : 'center',
            },
          ]}
        >
          <Text
            style={{
              marginVertical:
                size === 'large'
                  ? mode === 'outlined'
                    ? 12
                    : 14
                  : size === 'small'
                  ? mode === 'outlined'
                    ? 6
                    : 8
                  : mode === 'outlined'
                  ? 8
                  : 10,
              // marginHorizontal: 20,
              color: loading
                ? Colors.textOnPrimary
                : isHover
                ? mode === 'outlined'
                  ? dark
                    ? textHoverColor || Colors.textOnSurface
                    : textHoverColor || Colors.surface
                  : textHoverColor || Colors.textOnSurface
                : mode === 'outlined'
                ? dark
                  ? textColor || color || Colors.surface
                  : textColor || color || Colors.primary
                : dark
                ? textColor || Colors.primary
                : textColor || Colors.surface,
              // paddingTop: 3,
              fontSize: size === 'large' ? 18 : size === 'small' ? 12 : 14,
            }}
            numberOfLines={1}
          >
            {loading ? 'يرجى الإنتظار...' : text}
          </Text>
          {loading ? (
            <ActivityIndicator
              size='small'
              color={Colors.textOnPrimary}
              style={styles.loading}
            />
          ) : icon ? (
            <MaterialCommunityIcons
              name={`${icon}`}
              size={
                iconSize
                  ? iconSize
                  : size === 'large'
                  ? 22
                  : size === 'small'
                  ? 13
                  : 17
              }
              style={styles.btnIcon}
              // color={isHover
              //   ? mode === 'outlined'
              //     ? dark
              //       ? textHoverColor || Colors.textOnSurface
              //       : textHoverColor || Colors.surface
              //     : textHoverColor || Colors.textOnSurface
              //   : mode === 'outlined'
              //     ? dark
              //       ? textColor || color || Colors.surface
              //       : textColor || color || Colors.primary
              //     : dark
              //       ? textColor || Colors.primary
              //       : textColor || Colors.surface
              // }
              color={
                isHover
                  ? mode === 'outlined'
                    ? dark
                      ? textHoverColor || Colors.textOnSurface
                      : textHoverColor || Colors.surface
                    : textHoverColor || Colors.textOnSurface
                  : mode === 'outlined'
                  ? dark
                    ? textColor || color || Colors.surface
                    : textColor || color || Colors.primary
                  : dark
                  ? textColor || Colors.primary
                  : textColor || Colors.surface
              }
            />
          ) : null}
        </View>
      </TouchableRipple>
    </View>
  )
}

export default Button

Button.defaultProps = {
  size: 'medium',
}
