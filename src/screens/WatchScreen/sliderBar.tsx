import React from 'React'
import { I18nManager, Pressable, View } from 'react-native'

const Bar = ({ value, isVolume }) => (
  <>
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'red',
        top: 0,
        bottom: 0,
        left: 0,
        width: `${value * 100}%`,
        flex: 1,
        right: 0,
      }}
    />
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'red',
        height: isVolume ? 10 : 16,
        width: isVolume ? 10 : 16,
        borderRadius: '50%',
        left: `${value * 100}%`,
        marginLeft: isVolume ? -5 : -8,
      }}
    />
  </>
)

const SliderBar = ({ value, isHovering, onChange, isVolume, style }) => {
  return (
    <>
      <View
        style={[
          style,
          {
            width: isVolume ? 70 : '95%',
            height: isHovering ? 10 : 5,
            backgroundColor: 'rgba(128, 128, 128, 0.5)',
            position: 'relative',
            justifyContent: 'center',
            transform: I18nManager.getConstants().isRTL
              ? [{ scaleX: -1 }]
              : undefined,
          },
        ]}
      >
        <Bar value={value} isVolume={isVolume} style={style} />
      </View>
      <Pressable
        style={{
          width: isVolume ? 70 : '95%',
          height: isHovering ? 10 : 5,
          backgroundColor: 'transparent',
          position: 'absolute',
        }}
        onPress={(a) => {
          onChange(a.nativeEvent.layerX / a.target.scrollWidth)
        }}
      />
    </>
  )
}

export default SliderBar
