import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    borderRadius: 50,
    position: 'relative',
    borderWidth: 1,
  },
  textInput: {
    textAlign: Platform.OS === 'web' ? 'left' : 'right',
    height: 44,
    fontSize: 16,
  },
  labelContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    zIndex: -1,
  },
  labelBG: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: -1,
    height: Platform.OS === 'android' ? 8 : 5,
  },
});
