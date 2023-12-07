import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../assets/colors';
export default StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.quaternary,
    marginHorizontal: -18,
    marginTop: -24,
    paddingHorizontal: 15,
    paddingVertical: 20
  },
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
  },
  title: {
    color: Colors.textOnSurface,
    fontSize: 20
  },
  space: {
    height: 4
  },
  largeSpace: {
    height: 24
  },
  subtitle: {
    color: Colors.textOnSurface,
    fontSize: 16,
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
  signUpBtn: {
    marginBottom: 12
  },
  respectPrivacy: {
    marginTop: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  privacyText: {
    color: Colors.textOnSurface
  },


});
