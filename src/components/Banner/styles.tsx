import { StyleSheet, Platform } from 'react-native'
import React from 'react'
import Colors from '../../assets/colors'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row-reverse',
  },
  bannerImg: {
    height: 600,
    backgroundColor: 'black',
    alignItems: Platform.OS === 'web' ? 'flex-start' : undefined,
  },
  dotsContainer: {
    position: 'absolute',
    left: 66,
    right: 66,
    bottom: 0,
    height: 100,
    alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
  },
  dotsMargin: {
    margin: 13,
    alignItems: 'center',
  },
  dots: {
    backgroundColor: Colors.surfaceTransparent,
    height: 4,
    borderRadius: 3,
    width: 22,
    margin: 20,
    position: 'absolute',
  },
  dotsActive: {
    backgroundColor: Colors.surface,
    shadowRadius: 10,
    shadowColor: Colors.surfaceTransparent,
  },
  arrowsContainer: {
    height: 500,
    position: 'absolute',
    top: 0,
    width: 100,
    // marginTop: Platform.OS === 'web' ? 80 : undefined,
  },
  arrowsBody: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
  },
  dotsReletive: {
    position: 'relative',
    flexDirection: 'row',
  },
  dotsHover: {
    backgroundColor: Colors.secondary,
    shadowRadius: 10,
    shadowColor: 'rgba(0, 255, 170, .5)',
  },
  arrowsIcon: {
    color: Colors.surface,
    textShadowColor: Colors.shadowOnPrimary,
    textShadowRadius: 10,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.OS === 'web' ? 150 : 250,
    zIndex: 1,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: Platform.OS === 'web' ? 'flex-start' : 'center',
    marginHorizontal: Platform.OS === 'web' ? 100 : 50,
    marginVertical: 90,
    zIndex: 2,
    maxWidth: 650,
  },
  title: {
    color: Colors.textOnPrimary,
    fontSize: Platform.OS === 'web' ? 65 : 35,
    textShadowColor: Colors.textOnSurface,
    textShadowRadius: 10,
    textAlign: Platform.OS === 'web' ? 'left' : 'center',
  },
  subtitle: {
    color: Colors.textOnPrimary,
    fontSize: 20,
    textAlign: Platform.OS === 'web' ? 'left' : 'center',
  },
})
export default styles
