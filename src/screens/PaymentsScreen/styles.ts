import { StyleSheet } from 'react-native'
import Colors from '../../assets/colors'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: Colors.textOnPrimary,
    borderTopEndRadius: 20,
    borderTopStartRadius: 0,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    marginVertical: 100,
    width: 550,
    position: 'relative',
    alignSelf: 'center',
    minHeight: 500,
  },
  scrollView: {
    width: '100%',
  },
  tabsContainer: {
    position: 'absolute',
    left: 0,
    top: -52,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 15,
  },
  firstTab: {
    borderTopStartRadius: 20,
    paddingLeft: 30,
  },
  lastTab: {
    borderTopEndRadius: 20,
    paddingRight: 30,
  },
  tabScreen: {
    width: '100%',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: Colors.primary,
    fontSize: 28,
    marginTop: 25,
  },
  subTitile: {
    color: Colors.senary,
    textAlign: 'center',
    lineHeight: 25,
  },
  subscripe: {
    // color: Colors.senary,
    color: Colors.error,
    textAlign: 'center',
    lineHeight: 30,
  },
  paymentHistoryDescriptionText: {
    color: Colors.senary,
    fontSize: 10,
  },
  paymentHistoryText: {
    color: Colors.textOnSurface,
    textAlign: 'left',
    lineHeight: 20,
  },
  paymentHistoryTextContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    paddingLeft: 30,
  },
  image: {
    width: 70,
    height: 70,
  },
  textInputContainer: {
    height: 75,
  },

  label: {
    color: Colors.septenary,
    margin: 10,
  },
})
