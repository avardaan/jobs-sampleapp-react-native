import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  Linking
} from 'react-native';
import { connect } from 'react-redux'
import { Card, Button, Icon } from 'react-native-elements'
import { MapView } from 'expo'

class ReviewScreen extends Component {
  // nav options
  // react-navigation SUCKS, will have to refer to docs a lot, not intuitive at all
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    tabBarLabel: 'Liked',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="favorite"
        size={30}
        color={tintColor}
      />
    ),
    headerRight: (
      <Button
        title="Settings"
        onPress={() => navigation.navigate('settings')}
        backgroundColor='rgba(0,0,0,0)'
        color="rgba(0,122,255,1)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  })

  // render individual item of flatlist
  renderLikedJobs(job) {

    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02,
    }

    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 200 }}>
          <MapView
            style={{ flex:1 }}
            cacheEnabled={true}
            scrollEnabled={false}
            initialRegion={initialRegion}
          />
          <View style={styles.detailWrapper}>
            <Text style={styles.italics}>{job.company}</Text>
            <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
          </View>
          <Button
            title="Apply Now!"
            backgroundColor="#03a9f4"
            onPress={() => Linking.openURL(job.url)}
          />
        </View>
      </Card>
    )
  }

  render() {
    return (
      <FlatList
        data={this.props.likedJobs}
        renderItem={({ item }) => this.renderLikedJobs(item)}
        keyExtractor={(item) => item.jobkey}
      />
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
}

const mapStateToProps = (state) => {
  return {
    likedJobs: state.likedJobs
  }
}

export default connect(mapStateToProps)(ReviewScreen);
