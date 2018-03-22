import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class Result extends Component {
  goBacktoDeck = () => {
    const { navigation } = this.props;
    navigation.dispatch({
      routeName: 'Deck',
      type: 'GoBackToDeck'
    })
  }
  restartQuiz = () => {
    const { navigation } = this.props;
    navigation.dispatch({
      routeName: 'StartQuiz',
      type: 'GoBackToDeck',
    })
    navigation.state.params.onRestartQuiz({ index: 0, correct: 0, showAnswer: false })
  }
  render() {
    return (
      <View>
        <Text>Result</Text>
        <Text>({this.props.navigation.state.params.score}/{this.props.deck.questions.length})</Text>
        <TouchableOpacity onPress={() => this.restartQuiz()}>
          <Text>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.goBacktoDeck()}>
          <Text>Go Back to Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  deck: state.deck
})
export default connect(mapStateToProps)(Result);
