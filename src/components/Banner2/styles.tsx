import { StyleSheet, Platform } from 'react-native'
import React from 'react'
import Colors from '../../assets/colors'

const styles = StyleSheet.create({
  horizontalScroll: {
    position: 'absolute',
  },
  pageInfoBottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  pageInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  pageInfoPill: {
    width: 80,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageInfoText: {
    textAlign: 'center',
  },
  bullets: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    height: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  arrows: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
  arrowsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chosenBullet: {
    margin: 10,
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  bullet: {
    margin: 10,
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
})
export default styles
