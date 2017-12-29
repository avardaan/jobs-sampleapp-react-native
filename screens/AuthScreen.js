import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux'
import { facebookLogin } from '../actions'

class AuthScreen extends Component {
  componentDidMount() {
    // call facebook login flow from actions
    this.props.facebookLogin()
    this.onAuthComplete
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps)
  }

  onAuthComplete = (props) => {
    // if token exists
    if (props.token) {
      // navigate to main
      this.props.navigation.navigate('map')
    } else {
      this.props.facebookLogin()
    }
  }

  render() {
    return (
      <View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps, { facebookLogin })(AuthScreen);
