import { StyleSheet, Platform } from 'react-native'
import Dimensions_ from '../../components/Dimensions_'
import Colors from '../../assets/colors'

const isAndroid = Platform.OS === 'android'
const isWeb = Platform.OS === 'web'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    marginTop: isWeb ? 80 : undefined,
  },
  videoPoster: {
    overflow: 'visible',
    width: 340,
    height: 510,
    elevation: !isAndroid ? undefined : 17,
    shadowColor: !isAndroid ? Colors.textOnSurface : undefined,
    // shadowColor: !isAndroid ? "#000" : undefined,
    shadowOffset: !isAndroid
      ? {
          width: -10,
          height: -10,
        }
      : undefined,
    shadowOpacity: !isAndroid ? 0.36 : undefined,
    shadowRadius: !isAndroid ? 20 : undefined,
  },
  videoPosterContainer: {
    flex: 11,
    height: 730,
    width: 500,
    position: 'relative',
  },
  videoPosterSmallScreenContainer: {
    // flex: 1,
    position: 'relative',
  },
  videoPosterSmallScreen: {
    width: Dimensions_().width,
    height: 410,
  },
  videoPosterPosition: {
    position: 'absolute',
    right: 0,
    top: 70,
  },
  darkBackground: {
    position: 'absolute',
    // height: Dimensions_().isIsmallScreenOrSmaller ? 340 : 400,
    bottom: 0,
    right: -1000,
    left: -1500,
    top: 0,
    zIndex: -1,
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
  videoInfoContainer: {
    flex: Dimensions_().widthName === 'medium' ? 12 : 20,
    width: 500,
    minHeight: Dimensions_().isIsmallScreenOrSmaller ? 550 : 730,
    padding: Dimensions_().isIsmallScreenOrSmaller ? 20 : 40,
    zIndex: -1,
  },
  videoInfoDirection: {
    flexDirection: 'row',
  },
  videoInfoSection1: {
    // flex: 4,
    justifyContent: Dimensions_().isIsmallScreenOrSmaller
      ? 'center'
      : 'flex-start',
    paddingTop: Dimensions_().isIsmallScreenOrSmaller ? 35 : 100,
    paddingBottom: 40,
    alignItems: 'flex-start',
  },
  videoInfoSection2: {
    // flex: 7,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 50,
    position: 'relative',
  },
})
