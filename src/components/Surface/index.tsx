import React from 'react'
import { useHover } from '@huse/hover'
import styles from './styles'
import { TouchableRipple } from 'react-native-paper'
import { View } from 'react-native'

interface Props {
  children: React.ReactNode
  onPress?: () => any
}

const Surface: React.FC<Props> = ({ children, onPress, ...props }) => {
  const [isHover, hoverCallbacks] = useHover(undefined)
  return (
    <TouchableRipple
      {...hoverCallbacks}
      onPress={onPress}
      style={styles.surfaceContainer}
    >
      <View
        {...hoverCallbacks}
        style={isHover && onPress ? styles.hoverStyle : { width: '100%' }}
        // style={[
        //   styles.surfaceContainer,
        //   isHover && onPress ? styles.hoverStyle : null,
        // ]}
      >
        {children}
      </View>
    </TouchableRipple>
  )
}

export default Surface
