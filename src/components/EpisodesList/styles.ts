// import * as StyleSheet from '../../components/StyleSheet';
import Colors from '../../assets/colors'
import { StyleSheet } from 'react-native'

// const primary = '#3b0e85'
export default StyleSheet.create({
  container: {
    paddingVertical: 28,
    // backgroundColor: Colors.primary,
    // height: 300,
  },
  titleSection: {
    marginHorizontal: '5.5%',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    alignItems: 'flex-end',
  },
  title: {
    color: Colors.surface,
    fontSize: 23,
    textAlign: 'left',
    flexWrap: 'wrap',
    // flex: 1
    // marginLeft: 12
  },
  madalText: {
    flexWrap: 'wrap',
    marginBottom: 12,
    textAlign: 'left',
    lineHeight: 22,
    writingDirection: 'rtl',
    // flex: 1
  },
  modalTitle: {
    color: Colors.surface,
    fontSize: 17,
  },
  description: {
    color: Colors.textOnPrimaryLight,
    fontSize: 15,
  },
  subtitle: {
    color: Colors.surface,
    fontSize: 15,
  },
  buttun: {
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  shelfSection: {
    position: 'relative',
    // backgroundColor: Colors.background
  },
  playIconContainer: {
    // position: 'absolute',
    // ...StyleSheet.absoluteFillObject,
    // right: 0,
    // top: 0,
    zIndex: 1,
    // height: 50,
    // width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
    width: '100%',
    height: '100%',
  },
  playIconButton: {
    // borderRadius: 50,
    // padding: 10,
    width: '100%',
    height: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  playIcon: {
    // textShadowColor: Colors.surface,
    textShadowRadius: 10,
  },
  itemContainer: {
    marginVertical: 30,
    marginHorizontal: 5,
    paddingBottom: 54,
    position: 'relative',
    overflow: 'hidden',
    maxHeight: 600,
  },
  btnAddToFav: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrowsIcon: {
    color: Colors.textOnSurface,
    textShadowColor: Colors.shadowOnPrimary,
    textShadowRadius: 10,
  },
  arrowsContainer: {
    // height: 500,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '5%',

    // backgroundColor: 'red',
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // width: 100,
    // justifyContent: 'center',
  },
  arrowsBody: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
  },
  linearGradientPosition: {
    position: 'absolute',
    left: 0,
    right: 0,
    // top: 0,
    height: 300,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
})
