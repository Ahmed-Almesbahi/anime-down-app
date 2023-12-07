import { StyleSheet } from 'react-native'
import Colors from '../../assets/colors'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 40,
  },
  profilesContent: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 70,
  },
  profile: {
    alignItems: 'center',
  },
  imageContainer: {
    margin: 15,
    borderRadius: 100,
    position: 'relative',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  addProfile: {
    margin: 15,
    backgroundColor: Colors.surfaceVeryTransparent,
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  overlay: {
    backgroundColor: Colors.shadowOnSurface2,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pencilIcon: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.surface,
    padding: 5,
  },
})
