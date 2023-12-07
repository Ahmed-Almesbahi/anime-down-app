import React from 'react'
import { View, ScrollView } from 'react-native'
import styles from './styles'
import Footer from './Footer'

interface Props {
  children: React.ReactNode
  fullWidthContent?: boolean
}
const ScreenWrapper: React.FC<Props> = ({ children, fullWidthContent }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.contentContainer,
            fullWidthContent ? null : styles.fullWidthContent,
          ]}
        >
          {children}
        </View>
        <Footer />
      </ScrollView>
    </View>
  )
}

export default ScreenWrapper
