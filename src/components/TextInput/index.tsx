import React, { forwardRef, useState, useEffect } from 'react'
import {
  View,
  TextInput as NativeTextInput,
  Animated,
  Platform,
  StyleSheet,
} from 'react-native'
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles'
import Colors from '../../assets/colors'
import AnimatedText from '../AnimatedText'

interface Props {
  label: string
  style?: any
  placeholder?: string
  editable?: boolean
  value?: any
}

const TextInput: React.FC<Props> = forwardRef(
  ({ label, onBlur, placeholder, editable, value, ...props }, ref) => {
    const [state, setState] = useState({
      borderColor: Colors.shadowOnSurface,
      backgroundColor: 'white',
      textColor: value === '' ? Colors.quinary : Colors.textOnSurfaceLight,
      value: value ? value : '',
    })

    const [scale] = useState(
      new Animated.Value(
        placeholder && placeholder !== '' ? 10 : value && value !== '' ? 10 : 16
      )
    )
    const transferLeft = React.useRef(
      new Animated.Value(
        placeholder && placeholder !== '' ? 22 : value && value !== '' ? 22 : 15
      )
    ).current
    const transferTop = React.useRef(
      new Animated.Value(
        placeholder && placeholder !== ''
          ? Platform.OS === 'android'
            ? -12
            : -10
          : value && value !== ''
          ? Platform.OS === 'android'
            ? -12
            : -10
          : Platform.OS === 'android'
          ? 8
          : 10
      )
    ).current
    const labelColor = React.useRef(new Animated.Value(0)).current

    const animateLabelColor = labelColor.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.textOnSurfaceLight, Colors.quinary],
    })
    // console.log('...props', onBlur);

    const startAnimated = () => {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 10,
          bounciness: 0,
          useNativeDriver: false,
        }),
        Animated.spring(transferLeft, {
          toValue: 22,
          bounciness: 0,
          useNativeDriver: false,
        }),
        Animated.spring(transferTop, {
          toValue: Platform.OS === 'android' ? -12 : -10,
          overshootClamping: true,
          useNativeDriver: false,
        }),
        Animated.spring(labelColor, {
          toValue: 1,
          useNativeDriver: false,
        }),
      ]).start()
    }

    const endAnimated = () => {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 16,
          bounciness: 0,
          useNativeDriver: false,
        }),
        Animated.spring(transferLeft, {
          toValue: 15,
          bounciness: 0,
          useNativeDriver: false,
        }),
        Animated.spring(transferTop, {
          toValue: Platform.OS === 'android' ? 8 : 10,
          overshootClamping: true,
          useNativeDriver: false,
        }),
        Animated.spring(labelColor, {
          toValue: 0,
          useNativeDriver: false,
        }),
      ]).start()
    }

    const endAnimatedForFieldedInput = () => {
      Animated.parallel([
        Animated.timing(labelColor, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ]).start()
    }

    return (
      <>
        <View
          style={[
            styles.container,
            {
              borderColor: state.borderColor,
              backgroundColor: state.backgroundColor,
            },
          ]}
        >
          <NativeTextInput
            {...props}
            style={[
              styles.textInput,
              {
                color: state.textColor,
              },
            ]}
            // onSelectionChange={a => console.log(a)}
            onBlur={() => {
              onBlur()
              state.value === '' && !placeholder ? (
                <>
                  {setState({
                    ...state,
                    borderColor: Colors.shadowOnSurface,
                    backgroundColor: 'transparent',
                  })}
                  {endAnimated()}
                </>
              ) : (
                <>
                  {setState({
                    ...state,
                    textColor: Colors.textOnSurfaceLight,
                    borderColor: Colors.shadowOnSurface,
                    backgroundColor: Colors.surface,
                  })}
                  {endAnimatedForFieldedInput()}
                </>
              )
            }}
            ref={ref}
            editable={editable}
            onFocus={() => {
              setState({
                ...state,
                textColor: Colors.quinary,
                borderColor: Colors.quinary,
                backgroundColor: Colors.quinaryLight,
              }),
                startAnimated()
            }}
            placeholder={placeholder}
            onChange={(event) =>
              setState({ ...state, value: event.nativeEvent.text })
            }
            value={state.value}
          />
          <Animated.View
            style={[
              styles.labelContainer,
              {
                top: transferTop,
                left: transferLeft,
              },
            ]}
          >
            <View
              style={[
                styles.labelBG,
                {
                  backgroundColor: state.backgroundColor,
                },
              ]}
            />
            <AnimatedText
              style={{
                color: animateLabelColor,
                fontSize: scale,
              }}
            >
              {label}
            </AnimatedText>
          </Animated.View>
        </View>
        {editable === true || editable == undefined ? null : (
          <View style={{ ...StyleSheet.absoluteFillObject }} />
        )}
      </>
    )
  }
)

export default TextInput
