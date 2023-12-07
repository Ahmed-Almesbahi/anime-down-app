import React, { useLayoutEffect } from 'react'
import { View, ImageBackground, Platform } from 'react-native'
import styles from './styles'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../assets/colors'
import Button from '../Button'
import Text from '../Text'
import Dimensions_ from '../Dimensions_'

const Slider = ({ image, title, subtitle, onPress }) => {
  const width = Dimensions_().width
  return (
    <View style={{ width }}>
      <ImageBackground
        source={image}
        style={[
          styles.bannerImg,
          // Platform.OS === 'web' ? { marginTop: 0 } : null,
        ]}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.title} type='bold'>
            {title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
          <Button
            onPress={() => console.log('Pressed')}
            text='بدء المشاهدة'
            hoverGlow={Colors.secondary}
            hoverColor={Colors.secondary}
            textColor={Colors.textOnSurface}
            dark
            style={{ marginVertical: 12 }}
          />
        </View>
        {Platform.OS === 'web' && (
          <LinearGradient
            colors={[
              'transparent',
              'transparent',
              'rgba(60, 14, 133, .4)',
              'rgba(60, 14, 133, .9)',
            ]}
            end={[0.1, 0.6]}
            style={[styles.linearGradient, { top: 0, height: undefined }]}
          />
        )}
        <LinearGradient
          colors={['rgba(59, 0, 135, 0)', Colors.primary]}
          style={styles.linearGradient}
        />
      </ImageBackground>
    </View>
  )
}

export default Slider
