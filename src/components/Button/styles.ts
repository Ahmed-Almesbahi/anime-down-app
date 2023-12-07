import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  btnIcon: {
    paddingRight: Platform.OS === 'android' ? 15 : 0,
    paddingLeft: Platform.OS === 'android' ? 0 : 15,
  },
  touchableRipple: {
    borderRadius: 50,
    paddingBottom: 2,
  },
  centerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loading: {
    marginTop: 3,
    marginLeft: 10,
  },
})
