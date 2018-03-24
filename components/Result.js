import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
// Remove back button
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
    const { navigation, deck } = this.props;
    return (
      <View style={{flex: 1}}>
        <Text style={styles.scoreText}>{navigation.state.params.score / deck.questions.length * 100} points</Text>
        <TouchableOpacity onPress={() => this.restartQuiz()} style={{alignSelf: 'center', marginTop: 50}}>
          <Text style={styles.button}>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.goBacktoDeck()} style={{alignSelf: 'center'}}>
          <Text style={styles.button}>Go Back to Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scoreText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fe1212',
    marginTop: 100,
    textAlign: 'center'
  },
  button: {
    borderWidth: 1,
    borderColor: '#ff0012',
    width: 200,
    height: 40,
    backgroundColor: '#ff0012',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
    marginTop: 10
  },
})
const mapStateToProps = (state) => ({
  deck: state.deck
})
export default connect(mapStateToProps)(Result);
