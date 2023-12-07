import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  },
  viewContainer: {
    flex: 1
  },
  homeHeaderContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    position: 'absolute',
    width: '100%',
    top: 0,
    height: 80,
    zIndex: 1
  },

  listPosterContainer: {
    // height: 497,
    // height: 191,
    paddingVertical: 10,
    marginBottom: 10
  },
  listFeaturedContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    // height: 497,
    // height: 191,
    paddingVertical: 10,
    marginBottom: 10
  },
  listContainerHeadingText: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 15,
    fontSize: 18
  },
  scrollviewContainer: {
    flex: 1,
    paddingLeft: 10
  },
  scrollviewVideoImage: {
    flex: 1
    // backgroundImage:
    //   'linear-gradient(to top, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 70%,rgba(0,0,0,0) 100%)'
  },
  scrollviewVideoImagePosterContainer: {
    width: 333,
    height: 496,
    // height: 190,
    // : 333 × 496
    marginRight: 5
  },
  scrollviewVideoImageFeaturedContainer: {
    width: 333,
    // height: 496,
    height: 190,
    // : 333 × 496
    marginRight: 5
  }
});
