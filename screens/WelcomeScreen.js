import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import { AppLoading } from 'expo'

import _ from 'lodash'

import Slides from '../components/Slides'

const SLIDES_DATA = [
  {
    text: 'Welcome to Job App',
    color: '#03A9F4'
  },
  {
    text: 'Use this to get a job',
    color: '#009688'
  },
  {
    text: 'Set your location, then swipe away',
    color: '#03A9F4'
  }
]

class WelcomeScreen extends Component {
  // comp level state to see if token exists or not
  state = {
    token: null,
  }

  async componentWillMount() {
    //await AsyncStorage.removeItem('fb_token')
    let token = await AsyncStorage.getItem('fb_token')
    if (token) {
      this.props.navigation.navigate('map')
      this.setState({ token })
    } else {
      this.setState({ token: false })
    }

  }

  // function to pass to Slides component
  onSlidesComplete = () => {
    // navigation passed to component
    this.props.navigation.navigate('auth')
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />
    }
    return (
      <Slides data={SLIDES_DATA} onComplete={this.onSlidesComplete}/>
    );
  }
}

export default WelcomeScreen;
