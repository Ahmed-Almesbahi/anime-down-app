import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    borderRadius: 0,
    // paddingTop: 162,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    // alignSelf: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // container: {
  //   flex: 1,
  //   width: '100%',
  //   backgroundColor: 'white'
  //   // backgroundColor: '#141414'
  // },
  // backgroundVideo: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   bottom: 0,
  //   right: 0
  // }
})
