import React, { useEffect, useRef, useState } from 'react'
import { View, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import SliderBar from './sliderBar'
import { IconButton } from 'react-native-paper'
import Colors from '../../assets/colors'
import Text from '../../components/Text'
import { useHover } from '@huse/hover'

const Sound = ({ volume, handleVolume, muted, handleMuted }) => {
  const [isHover, hoverCallbacks] = useHover(undefined)
  const width = useRef(new Animated.Value(65)).current
  const startAnimated = () => {
    Animated.spring(width, {
      toValue: 140,
      useNativeDriver: false,
    }).start()
  }
  const endAnimated = () => {
    Animated.spring(width, {
      toValue: 65,
      useNativeDriver: false,
    }).start()
  }
  return (
    <>
      {isHover ? startAnimated() : endAnimated()}
      <Animated.View
        {...hoverCallbacks}
        style={[
          {
            width: 135,
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            overflow: 'hidden',
          },
        ]}
      >
        {isHover && width._value !== 65 ? (
          <View
            style={{
              alignItems: 'flex-end',
              marginRight: -10,
            }}
          >
            <SliderBar
              value={volume}
              isVolume
              onChange={(newValue) => handleVolume(newValue)}
            />
          </View>
        ) : null}
        <IconButton
          color={Colors.textOnPrimary}
          size={34}
          icon={muted ? 'volume-off' : 'volume-high'}
          onPress={() => handleMuted()}
        />
      </Animated.View>
    </>
  )
}

const Controls = ({
  handleSeek,
  handleFullScreen,
  handlePlayPause,
  handleMuted,
  handleVolume,
  navigation,
  duration,
  currentTime,
  playing,
  volume,
  muted,
}) => {
  const [state, setState] = useState({
    isMouseMovedInRecentSeconds: true,
    lastMovedTime: null,
  })

  useEffect(() => {
    const initialState = setTimeout(() => {
      setState({ ...state, isMouseMovedInRecentSeconds: false })
    }, 4000)
    return () => clearTimeout(initialState)
  }, [])

  const onMouseMove = (_currentTime: number) => {
    if (
      state.astMovedTime === null ||
      state.lastMovedTime < _currentTime - 1000
    ) {
      setState({
        astMovedTime: _currentTime,
        isMouseMovedInRecentSeconds: true,
      })

      const isMouseMovedInLast4Secounds = setTimeout(() => {
        setState({ ...state, isMouseMovedInRecentSeconds: false })
      }, 4000)
      return () => {
        clearTimeout(isMouseMovedInLast4Secounds)
      }
    }
  }

  const fade = useRef(new Animated.Value(0)).current
  const startAnimated = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }
  const endAnimated = () => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const [isHover, hoverCallbacks] = useHover(undefined)

  const formatTime = (secods) => {
    const h = Math.floor(secods / 3600)
    const m = Math.floor((secods % 3600) / 60)
    const s = Math.floor((secods % 3600) % 60)

    const hDisplay = h > 0 ? `${h}:` : ''
    const mDisplay = m > 0 ? `${m}:` : ''
    const sDisplay = s > 0 ? `${s}` : ''
    return `${hDisplay}${mDisplay}${sDisplay}`
  }

  const isDisplayingControls =
    state.isMouseMovedInRecentSeconds || !playing || isHover
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
      onMouseMove={(_currentTime) => onMouseMove(_currentTime.timeStamp)}
    >
      {isDisplayingControls ? startAnimated() : endAnimated()}
      <Animated.View
        style={[
          fade._value === 0 ? { display: 'none' } : { display: 'flex' },
          { opacity: fade, zIndex: 1 },
        ]}
      >
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0.8)',
            'rgba(0, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0)',
          ]}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 500,
            right: 0,
            left: 0,
            height: 100,
          }}
        >
          <IconButton
            style={{ position: 'absolute', top: 20, left: 20 }}
            color={Colors.textOnPrimary}
            size={38}
            icon='arrow-right'
            onPress={() => navigation.goBack()}
          />
        </LinearGradient>
      </Animated.View>
      <Animated.View
        style={[
          fade._value === 0
            ? {
                display: 'none',
              }
            : {
                display: 'flex',
              },
          {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            opacity: fade,
          },
        ]}
      >
        <LinearGradient
          {...hoverCallbacks}
          colors={[
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0.8)',
          ]}
          style={{
            position: 'absolute',
            right: 0,
            // top: 0,
            left: 0,
            bottom: 0,
            height: 150,
          }}
        >
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <SliderBar
              value={currentTime / duration}
              onChange={(newValue) => handleSeek(newValue * duration)}
            />
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: '2%',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <IconButton
                color={Colors.textOnPrimary}
                size={38}
                icon={
                  handleFullScreen.active ? 'fullscreen-exit' : 'fullscreen'
                }
                onPress={() =>
                  handleFullScreen.active
                    ? handleFullScreen.exit()
                    : handleFullScreen.enter()
                }
              />
              <Text>
                {formatTime(duration - currentTime)} / {formatTime(duration)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Sound
                volume={volume}
                handleVolume={handleVolume}
                muted={muted}
                handleMuted={handleMuted}
              />
              <IconButton
                color={Colors.textOnPrimary}
                size={34}
                icon='fast-forward-10'
                onPress={() => handleSeek(currentTime + 10)}
              />
              <IconButton
                color={Colors.textOnPrimary}
                size={34}
                icon='rewind-10'
                onPress={() => handleSeek(currentTime - 10)}
              />
              <IconButton
                color={Colors.textOnPrimary}
                size={38}
                icon={playing ? 'pause' : 'play'}
                onPress={() => handlePlayPause()}
              />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  )
}

export default Controls
