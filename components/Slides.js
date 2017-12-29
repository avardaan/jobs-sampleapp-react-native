import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width

class Slides extends Component {

  // conditional rendering for button on last slide
  renderLastSlide(index) {
    // check if last slide
    if (index === this.props.data.length-1) {
      // parentheses are important...even if returning just one encompassing component
      return (
        <Button
          title="Continue"
          buttonStyle={styles.button}
          onPress={this.props.onComplete}
        />
      )
    }
  }

  // map over array of text objects and display accordingly
  renderSlides() {
    return this.props.data.map((item, index) =>
      <View key={item.text} style={[styles.slideStyle, { backgroundColor: item.color }]}>
        <Text style={styles.slideText}>{item.text}</Text>
        {this.renderLastSlide(index)}
      </View>
    )
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{flex:1}}
      >
      {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0288D1',
    marginTop: 15,
  }
}

export default Slides;
