import { StyleSheet } from 'react-native'
import Colors from '../../assets/colors'

export default StyleSheet.create({
  surfaceContainer: {
    width: '100%',
    margin: 5,
    // paddingHorizontal: 18,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: Colors.shadowOnSurface,
    borderRadius: 20,
    alignItems: 'center',
    // flex: 1,
  },
  hoverStyle: {
    shadowRadius: 18,
    shadowColor: Colors.shadowOnSurface2,
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
  },
})
