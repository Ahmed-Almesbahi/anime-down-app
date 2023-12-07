import Colors from '../../assets/colors'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingVertical: 28,
    // backgroundColor: Colors.primary,
  },
  nameSection: {
    marginHorizontal: '5.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: Colors.textOnPrimary,
    fontSize: 23,
    textAlign: 'left',
    flexWrap: 'wrap',
    flex: 1,
  },
  shelfSection: {
    position: 'relative',
    // flexDirection: 'row-reverse',
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
    justifyContent: 'center',
  },
  arrowsBody: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
  },
  inMyFavIcon: {
    color: Colors.tertiary,
    marginTop: 5,
    marginRight: 5,
  },
  itemContainer: {
    marginVertical: 30,
    marginHorizontal: 5,
    paddingBottom: 84,
    position: 'relative',
    overflow: 'hidden',
    maxHeight: 600,
  },
  btnAddToFav: {
    padding: 12,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },
  imageSection: {
    opacity: 0,
    // borderRadius: 4,
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  linearGradientPosition: {
    position: 'absolute',
    left: 0,
    right: 0,
    // top: 0,
    height: 300,
  },
  image: {
    maxHeight: 600,
    width: '100%',
  },
  infoPosition: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  infoPositionContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
  },
  infoPositionAnimated: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  cardInfoOverflow: {
    overflow: 'hidden',
    marginRight: 20,
  },
  firstLineInfoDirection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  animatedFirstLineInfo: {
    marginTop: 5,
    fontSize: 13,
  },
  tags: {
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginRight: 5,
  },
  tagsText: {
    fontSize: 11,
    margin: 0,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    // height: Platform.OS === 'web' ? 150 : 250,
    // zIndex: 1
  },
})
