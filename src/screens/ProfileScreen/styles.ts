import { StyleSheet } from 'react-native'
import Colors from '../../assets/colors'

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: Colors.textOnPrimary,
    borderRadius: 20,
    marginVertical: 100,
    width: 550,
    minHeight: 450,
  },
  title: {
    fontSize: 28,
    color: Colors.primary,
  },
  profilesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
    marginBottom: 70,
    width: '95%',
  },
  imageContainer: {
    width: 150,
    borderRadius: 100,
  },
  image: {
    height: 150,
    width: 150,
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
  photosBottom: {
    marginTop: 30,
  },
})
