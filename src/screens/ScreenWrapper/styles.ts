import { Platform, StyleSheet } from 'react-native'
import Colors from '../../assets/colors'
import { Dimensions } from 'react-native'

const window = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  scrollView: {
    width: '100%',
  },
  contentContainer: {
    marginTop: Platform.OS === 'web' ? 80 : undefined,
    minHeight: window.height * 0.8,
    width: '100%',
    alignSelf: 'center',
  },
  fullWidthContent: {
    alignItems: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    height: 200,
    width: '100%',
    backgroundColor: Colors.primaryDark,
    justifyContent: 'center',
  },
})
