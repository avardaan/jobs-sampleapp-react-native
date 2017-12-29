import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

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
    token: null
  }

  onSlidesComplete = () => {
    // navigation passed to component
    this.props.navigation.navigate('auth')
  }

  render() {
    return (
      <Slides data={SLIDES_DATA} onComplete={this.onSlidesComplete}/>
    );
  }
}

export default WelcomeScreen;
