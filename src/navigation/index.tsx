import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import Text from '../components/Text'
import { navigationRef } from './RootNavigation'
import { isHasActiveSubscription, isSignedIn } from '../utils/helper'
import ThankYouScreen from '../screens/ThankYouScreen'
import HomeScreen from '../screens/HomeScreen'
import VideoDetailsScreen from '../screens/VideoDetailsScreen'
import CategoryScreen from '../screens/CategoryScreen'
import WatchScreen from '../screens/WatchScreen'
import AccountScreen from '../screens/AccountScreen'
import PaymentsScreen from '../screens/PaymentsScreen'
import ProfilesScreen from '../screens/ProfilesScreen'
import ProfileScreen from '../screens/ProfileScreen'
import LauncherScreen from '../screens/LauncherScreen'

const Stack = createStackNavigator()

const NavStack = () => {
  const _isSignedIn = isSignedIn()
  const _isHasActiveSubscription = isHasActiveSubscription()
  const linking = {
    prefixes: [Linking.makeUrl('/')],
    // prefixes: ['http://banafa.uk/', 'banafa://'],

    config: {
          screens: {
            Launcher: '/',
            NotFound: '*',
          },
        },
    // config: isHasActiveSubscription()
    //   ? {
    //       screens: {
    //         Home: 'home',
    //         Category: ':sort',
    //         VideoDetails: 'video-details/:videoId',
    //         Payments: 'payments',
    //         Watch: 'watch/:videoFileId',
    //         Account: 'account',
    //         Profiles: 'profiles',
    //         Profile: 'profile/:profileId',
    //         ThankYou: 'thank-you',
    //         NotFound: '*',
    //       },
    //     }
    //   : _isSignedIn
    //   ? {
    //       screens: {
    //         Payments: 'payments',
    //         Account: 'account',
    //         Profiles: 'profiles',
    //         Profile: 'profile',
    //         ThankYou: 'thank-you',
    //         NotFound: '*',
    //       },
    //     }
    //   : {
    //       screens: {
    //         Launcher: '/',
    //         NotFound: '*',
    //       },
    //     },
  }

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>} // controls what's displayed when React Navigation is trying to resolve the initial deep link URL
      // fallback={<SplashScreen />}
      ref={navigationRef}
    >
      <Stack.Navigator
        initialRouteName={isHasActiveSubscription() ? 'Home' : 'Launcher'}
        //   screenOptions={{
        //     headerTitleAlign: 'center',
        //     headerStyle: {
        //       backgroundColor: '#621FF7',
        //     },
        //     headerTintColor: '#fff',
        //     headerTitleStyle :{
        //       fontWeight: 'bold',
        //     },
        //   }}
        headerMode={
          Platform.OS === 'web'
            ? 'none'
            : Platform.OS === 'ios'
            ? 'float'
            : 'screen'
        }
      >
        {_isHasActiveSubscription ? (
          <>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='VideoDetails' component={VideoDetailsScreen} />
            <Stack.Screen name='Category' component={CategoryScreen} />
            <Stack.Screen name='Watch' component={WatchScreen} />
            <Stack.Screen name='Account' component={AccountScreen} />
            <Stack.Screen name='Payments' component={PaymentsScreen} />
            <Stack.Screen name='Profiles' component={ProfilesScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='ThankYou' component={ThankYouScreen} />
          </>
        ) : _isSignedIn ? (
          <>
            <Stack.Screen name='Payments' component={PaymentsScreen} />
            <Stack.Screen name='Account' component={AccountScreen} />
            <Stack.Screen name='Profiles' component={ProfilesScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='ThankYou' component={ThankYouScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name='Launcher' component={LauncherScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavStack
