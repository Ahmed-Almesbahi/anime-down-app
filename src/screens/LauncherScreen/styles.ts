import { StyleSheet } from 'react-native'
import Colors from '../../assets/colors'
import { Dimensions } from 'react-native'

const window = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  contentContainer: {
    minHeight: window.height * 0.9,
    justifyContent: 'center',
    width: 550,
    alignSelf: 'center',
  },
})
