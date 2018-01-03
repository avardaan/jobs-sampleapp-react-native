import Expo, { Notifications } from 'expo'
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'

import store from './store'

import registerForNotifications from './services/PushNotifications'

import AuthScreen from './screens/AuthScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import MapScreen from './screens/MapScreen'
import DeckScreen from './screens/DeckScreen'
import SettingsScreen from './screens/SettingsScreen'
import ReviewScreen from './screens/ReviewScreen'

import { Provider } from 'react-redux'

export default class App extends React.Component {
  componentDidMount() {
    // ask for push notif permission
    registerForNotifications()
    // notification listener
    Notifications.addListener((notification) => {
      // advanced destructuring
      const { data: { text }, origin } = notification
      // check origin of notification
      if (origin === 'received' && text) {
        alert(text)
      }
    })
  }

  render() {
    // navigation setup
    const MainNavigator = TabNavigator({
      // declare routes
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }

            })
          }
        }, {
          // map, deck, review tab nav config
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          },
          tabBarPosition: 'bottom',
          swipeEnabled: false
        })
      }
    }, {
      lazy: true,
      navigationOptions: {
        tabBarVisible: false
      }
    })

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
