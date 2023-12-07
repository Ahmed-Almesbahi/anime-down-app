import { StatusBar } from 'expo-status-bar'
import React from 'react'
// import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from './src/hooks/useCachedResources'
import { Provider as ReduxProvider } from 'react-redux'
import { Platform, View, Text, I18nManager } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { theme } from './src/screens/App/theme'
import NavStack from './src/navigation'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client'
import { PersistGate } from 'redux-persist/integration/react'
// import PersistGate from '@react-native-async-storage/async-storage'
import { store, persistedStore } from './src/configureStore'
import { ModalPortal } from 'react-native-modals'
import Header from './src/screens/Header'
import Colors from './src/assets/colors'
import { setContext } from '@apollo/client/link/context'

I18nManager.forceRTL(true)

I18nManager.allowRTL(true)


// LogBox.ignoreAllLogs()

const httpLink = new HttpLink({
  // uri: 'https://anime-down-api.vercel.app/api/',
  // uri: 'http://localhost:4000/graphql',

  uri:
    process.env.NODE_ENV === 'development'
      ? Platform.OS === 'android'
        ? 'http://10.0.2.2:4000/graphql'
        : 'http://localhost:4000/graphql'
      : 'https://animedown-api.vercel.app/api/',
})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = store.getState().user.token
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})

const App = () => {
  const isLoadingComplete = useCachedResources()
  if (!isLoadingComplete) {
    return (
      <View>
        <Text>loading---- </Text>
      </View>
    )
  } else {
    return (
      <ReduxProvider store={store}>
        <PersistGate persistor={persistedStore}>
          <PaperProvider theme={theme}>
            <ApolloProvider client={client}>
              {/* <SafeAreaProvider> */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: Colors.primary,
                }}
              >
                {Platform.OS === 'web' ? <Header /> : null}
                {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
                <NavStack />
              </View>
              <ModalPortal />
              {/* </SafeAreaProvider> */}
            </ApolloProvider>
          </PaperProvider>
        </PersistGate>
      </ReduxProvider>
    )
  }
}
export default App
