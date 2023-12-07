import React, { useState } from 'react'
import { Text, View, Dimensions } from 'react-native'
import Carousel from './Slider'

const { width, height } = Dimensions.get('window')

const CarouselExample = () => {
  const [state, setState] = useState({ size: { width, height } })

  const _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout
    setState({ size: { width: layout.width, height: 500 } })
  }

  return (
    <View style={{ flex: 1 }} onLayout={_onLayoutDidChange}>
      <Carousel
        delay={2000}
        style={state.size}
        autoplay
        pageInfo
        currentPage={1}
        onAnimateNextPage={(p) => console.log(p)}
      >
        <View style={[{ backgroundColor: '#BADA55' }, state.size]}>
          <Text>1</Text>
        </View>
        <View style={[{ backgroundColor: 'red' }, state.size]}>
          <Text>2</Text>
        </View>
        <View style={[{ backgroundColor: 'blue' }, state.size]}>
          <Text>3</Text>
        </View>
      </Carousel>
    </View>
  )
}

export default CarouselExample
