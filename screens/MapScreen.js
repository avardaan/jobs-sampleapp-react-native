import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-elements'

import { connect } from 'react-redux'
import { fetchJobs } from '../actions'

import { MapView } from 'expo'

class MapScreen extends Component {
  state = {
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    }
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region })
  }

  // on search press
  onButtonPress = () => {
    // pass in function as second parameter to action
    this.props.fetchJobs(this.state.region, () => this.props.navigation.navigate('deck'))
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search This Area"
            backgroundColor='#009688'
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  }
}

export default connect(null, { fetchJobs })(MapScreen);
