import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Result extends Component {
  render() {
    return (
      <View>
        <Text>Result</Text>
        <TouchableOpacity>
          <Text>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Go Back to Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Result;
