import { StyleSheet } from 'react-native'
import Colors from '../../assets/colors'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: Colors.surface,
    alignItems: 'center',
    borderRadius: 30,
    padding: 10,
    top: 100,
    height: 400,
    width: 328,
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    marginVertical: 20,
  },
  textInputContainer: {
    height: 70,
  },
})
