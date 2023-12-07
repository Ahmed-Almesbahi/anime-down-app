// import * as StyleSheet from '../../components/StyleSheet';
import Colors from '../../assets/colors'
import { StyleSheet } from 'react-native'

// const primary = '#3b0e85'
export default StyleSheet.create({
  container: {
    borderRadius: 22,
    borderWidth: 1,
    position: 'absolute',
    left: '5.5%',
    borderColor: Colors.surface,
    zIndex: 1,
    overflow: 'hidden',
  },
  touchableRippleRadius: {
    borderRadius: 50,
    paddingBottom: 2,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnText: {
    marginVertical: 8,
    marginHorizontal: 20,
    fontSize: 16,
  },

  title: {
    color: Colors.surface,
    fontSize: 23,
    textAlign: 'right',
    flexWrap: 'wrap',
    flex: 1,
    // marginRight: 12
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
  icon: {
    color: Colors.surface,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
    // marginTop: 5,
    // marginLeft: 5,
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
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },

  btnIcon: {
    marginRight: 15,
  },
})
