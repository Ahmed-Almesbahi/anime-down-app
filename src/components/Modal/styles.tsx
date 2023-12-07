import { StyleSheet } from 'react-native'
import Colors from '../../assets/colors'

export default StyleSheet.create({
  surface: {
    backgroundColor: Colors.surface,
    borderRadius: 30,
    shadowColor: Colors.shadowOnSurfaceDark,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
    maxWidth: '90%',
    width: 328,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  closeIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    zIndex: 1,
  },
})
