import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../assets/colors';
export default StyleSheet.create({
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    height: 56,
    width: 70
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  title: {
    color: Colors.primary,
    fontSize: 20
  },
  space: {
    height: 4
  },
  subtitle: {
    color: Colors.textOnSurface,
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center'
  },
  forgetPassContainer: {
    justifyContent: 'flex-start'
  },
  forgetPass: {
    alignSelf: 'flex-start',
    marginVertical: 12
  },
  forgetPassText: {
    color: Colors.quinary
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  orLine1: {
    backgroundColor: Colors.shadowOnSurface,
    height: 1,
    width: '45%'
  },
  orText: {
    color: Colors.textOnSurface
  },
  orLine2: {
    backgroundColor: Colors.shadowOnSurface,
    height: 1,
    width: '45%'
  },
  textInputContainer: {
    height: 70
  },
  signInBtn: {
    marginBottom: 12
  },

});
