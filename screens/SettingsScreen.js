import React, { Component } from 'react';
import {
  View,
  Text,
  Platform
} from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Button } from 'react-native-elements'

class SettingsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }
  render() {
    return (
      <View>
        <Button
          title="Reset Liked Jobs"
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor="#F44336"
          onPress={() => this.props.clearLikedJobs(() => this.props.navigation.goBack())}
        />
      </View>
    );
  }
}

export default connect(null, actions)(SettingsScreen);
