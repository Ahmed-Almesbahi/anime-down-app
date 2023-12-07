import React, { useState, useRef, useEffect } from 'react'
import { View, FlatList, Platform } from 'react-native'
import styles from './styles'
import Slider from './Slider'
import { TouchableRipple } from 'react-native-paper'
import { useHover } from '@huse/hover'
import data from './data'
import Arrows from './Arrows'
import Dimensions_ from '../Dimensions_'

const WIDTH = Dimensions_().width

const Banner = (props) => {
  const slidersCount = data.length
  const [state, setState] = useState({ updateAutoPlay: 0, activeSlide: 0 })
  const flatListRef = useRef(null)
  const isfirstSlider = state.activeSlide === 0
  const isLastSlider = state.activeSlide === slidersCount - 1
  useEffect(() => {
    const autoPlay = setTimeout(() => {
      goToSlide('next')
    }, 6000)
    return () => clearTimeout(autoPlay)
  }, [state.updateAutoPlay])

  const goToSlide = (action) => {
    if (action === 'next') {
      isLastSlider
        ? (setState({
            activeSlide: 0,
            updateAutoPlay: state.updateAutoPlay + 1,
          }),
          flatListRef.current.scrollToOffset({ offset: 0 }))
        : (setState({
            activeSlide: state.activeSlide + 1,
            updateAutoPlay: state.updateAutoPlay + 1,
          }),
          flatListRef.current.scrollToOffset({
            offset: WIDTH * (state.activeSlide + 1),
          }))
    } else if (action === 'prev') {
      isfirstSlider
        ? (setState({
            activeSlide: slidersCount - 1,
            updateAutoPlay: state.updateAutoPlay + 1,
          }),
          flatListRef.current.scrollToOffset({
            offset: WIDTH * slidersCount - 1,
          }))
        : (setState({
            activeSlide: state.activeSlide - 1,
            updateAutoPlay: state.updateAutoPlay + 1,
          }),
          flatListRef.current.scrollToOffset({
            offset: WIDTH * (state.activeSlide - 1),
          }))
    } else if (typeof action === 'number') {
      setState({
        activeSlide: Math.round(action),
        updateAutoPlay: state.updateAutoPlay + 1,
      })
      flatListRef.current.scrollToOffset({ offset: WIDTH * action })
    }
  }

  const dotsNav = () => {
    const dot = (i) => {
      const [isHover, hoverCallbacks] = useHover(undefined)
      return (
        <TouchableRipple onPress={() => goToSlide(i)}>
          <View
            {...hoverCallbacks}
            style={[
              styles.dots,
              i == state.activeSlide && styles.dotsActive,
              isHover ? styles.dotsHover : null,
            ]}
          >
            <View />
          </View>
        </TouchableRipple>
      )
    }
    let sliders = []
    for (let i = 0; i < slidersCount; i++) {
      sliders.push(
        <View style={styles.dotsMargin} key={i}>
          {Platform.OS === 'web' ? (
            dot(i)
          ) : (
            <View
              style={[styles.dots, i == state.activeSlide && styles.dotsActive]}
            />
          )}
        </View>
      )
    }
    return (
      <View style={styles.dotsContainer}>
        <View style={styles.dotsReletive}>{sliders}</View>
      </View>
    )
  }

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        // initialNumToRender={3}
        // initialScrollIndex={0}
        inverted={Platform.OS === 'web'}
        // disableVirtualization={true}
        // legacyImplementation={true}
        scrollEnabled={Platform.OS !== 'web'}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(num) =>
          goToSlide(num.nativeEvent.contentOffset.x / WIDTH)
        }
        style={styles.container}
        renderItem={({ item }) => {
          return (
            <Slider
              title={item.title}
              image={item.image}
              subtitle={item.subtitle}
            />
          )
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      {Platform.OS === 'web' ? (
        <>
          <Arrows isLeft={false} goToSlide={goToSlide} />
          <Arrows isLeft goToSlide={goToSlide} />
        </>
      ) : null}
      {dotsNav()}
    </View>
  )
}

export default Banner
