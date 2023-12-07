import React, { useState } from 'react'
import styles from './styles'
import { View, Animated, Platform } from 'react-native'
import Text from '../Text'
import { TouchableRipple } from 'react-native-paper'
import { useHover } from '@huse/hover'
import Colors from '../../assets/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface IProps {
  onPress?: () => void
  style?: any
  contentStyle?: any
  children?: React.ReactNode
  mode?: String
}

const DropDownList = ({
  openedDropDownList,
  closeDropDownList,
  style,
  selectedSeason,
  onPressOutsideDropDownList,
  data,
}) => {
  const [isHover, hoverCallbacks] = useHover(undefined)
  const [state, setState] = useState({ selectedItem: 0, isOpen: false })

  const height = React.useRef(new Animated.Value(42)).current
  const listHeight = React.useRef(new Animated.Value(0)).current
  const iconRotate = React.useRef(new Animated.Value(0)).current
  const [backgroundColor] = useState(new Animated.Value(0))

  const animateBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,.0)', 'rgb(255,255,255)'],
  })
  const animateIconRotate = iconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  const startAnimated = () => {
    Animated.parallel([
      Animated.spring(height, {
        toValue:
          Platform.OS === 'android'
            ? data.length * 42 + 102
            : data.length * 42 + 82,
        useNativeDriver: false,
      }),
      Animated.spring(listHeight, {
        toValue:
          Platform.OS === 'android'
            ? data.length * 42 + 60
            : data.length * 42 + 40,
        useNativeDriver: false,
      }),
      // Animated.spring(iconRotate, {
      //   toValue: 1,
      //   useNativeDriver: true
      // }),
      Animated.timing(backgroundColor, {
        toValue: 1,
        useNativeDriver: false,
        duration: 0,
      }),
    ]).start()
  }

  const endAnimated = () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 42,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.spring(listHeight, {
        toValue: 0,
        useNativeDriver: false,
      }),
      // Animated.spring(iconRotate, {
      //   toValue: 0,
      //   useNativeDriver: true
      // }),
      Animated.timing(backgroundColor, {
        toValue: 0,
        delay: 200,
        useNativeDriver: false,
        duration: 0,
      }),
    ]).start()
  }

  const closeList = (selected: any) => {
    if (state.isOpen) {
      selectedSeason(selected === undefined ? state.selectedItem : selected)
      setState({
        ...state,
        selectedItem: selected === undefined ? state.selectedItem : selected,
        isOpen: false,
      })
    }
    endAnimated()
  }
  const openList = () => {
    if (!state.isOpen) {
      setState({ ...state, isOpen: true })
    }
    startAnimated()
    openedDropDownList()
  }

  const seasons = (data: any) => {
    const dot = (i) => {
      const [isHover, hoverCallbacks] = useHover(undefined)
      return (
        <View {...hoverCallbacks} key={i} style={{ width: '100%' }}>
          <TouchableRipple
            onPress={() => closeList(i)}
            style={{
              padding: 15,
              width: '100%',
              backgroundColor: isHover ? 'rgba(0, 0, 0, 0.1)' : undefined,
            }}
            key={i}
          >
            <Text style={{ color: Colors.textOnSurface, textAlign: 'left' }}>
              {data[i].name}
            </Text>
          </TouchableRipple>
        </View>
      )
    }
    let season = []
    for (let i = 0; i < data.length; i++) {
      season.push(dot(i))
    }
    return season
  }

  {
    closeDropDownList ? closeList(undefined) : null
  }
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: animateBackgroundColor,
          height: height,
        },
        style,
      ]}
    >
      <View
        {...hoverCallbacks}
        style={{
          backgroundColor: isHover ? Colors.surface : 'transparent',
          borderRadius: 20,
          height: 42,
        }}
      >
        <TouchableRipple
          onPress={() => {
            state.isOpen ? closeList(undefined) : openList()
          }}
          rippleColor='rgba(0, 0, 0, .2)'
          style={styles.touchableRippleRadius}
        >
          <View style={styles.btn}>
            <Text
              style={[
                styles.btnText,
                {
                  color:
                    isHover || state.isOpen
                      ? Colors.textOnSurface
                      : Colors.surface,
                },
              ]}
              numberOfLines={1}
            >
              {data[state.selectedItem]?.name}
            </Text>
            <MaterialCommunityIcons
              name='chevron-down'
              size={25}
              style={styles.btnIcon}
              color={
                isHover || state.isOpen ? Colors.textOnSurface : Colors.surface
              }
            />
          </View>
        </TouchableRipple>
      </View>
      <Animated.View
        style={{
          height: listHeight,
          overflow: 'hidden',
          justifyContent: 'center',
        }}
      >
        {seasons(data)}
      </Animated.View>
    </Animated.View>
  )
}

export default DropDownList
