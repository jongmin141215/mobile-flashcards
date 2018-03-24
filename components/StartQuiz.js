import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class StartQuiz extends Component {
  state = {
    index: 0,
    correct: 0,
    showAnswer: false
  }
  onRestartQuiz = (newState) => {
    this.setState(newState)
  }
  showQuestionAnswerToggle = () => {
    this.setState({showAnswer: !this.state.showAnswer})
  }
  displayQuestionOrAnswer = () => {
    const { showAnswer, index } = this.state;
    const { questions } = this.props.deck
    if (showAnswer) {
      return (
        <View>
          <Text style={styles.mainText}>{questions[index].answer}</Text>
          <TouchableOpacity onPress={this.showQuestionAnswerToggle}>
            <Text style={styles.linkText}>Show Question</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View>
          <Text style={styles.mainText}>{questions[index].question}</Text>
          <TouchableOpacity onPress={this.showQuestionAnswerToggle}>
            <Text style={styles.linkText}>Show Answer</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  markScore = (correct) => {
    this.setState((prevState, props) => ({ correct: prevState.correct + correct, showAnswer: false }), () => {
      this.toNextCard()
    })
  }
  toNextCard = () => {
    const { deck, navigation } = this.props;
    const { index, correct } = this.state;
    if (index + 1 === deck.questions.length) {
      clearLocalNotification()
        .then(setLocalNotification)
      navigation.navigate('Result', { score: correct, onRestartQuiz: this.onRestartQuiz });
    } else {
      this.setState({index: index + 1})
    }
  }

  render() {
    return (
      <View>
        {this.displayQuestionOrAnswer()}
        <TouchableOpacity onPress={() => this.markScore(1)} style={{alignSelf: 'center'}}>
          <Text style={[styles.button, {borderColor: '#1200ff', backgroundColor: '#1200ff'}]}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.markScore(0)} style={{alignSelf: 'center'}}>
          <Text style={styles.button}>Incorrect</Text>
        </TouchableOpacity>
        <Text style={[styles.remainingQsText]}>({this.state.index + 1}/{this.props.deck.questions.length})</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 100
  },
  linkText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fe0101',
    marginTop: 30,
    marginBottom: 30
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
  remainingQsText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#666',
    marginTop: 20
  }
})
const mapStateToProps = (state) => ({
  deck: state.deck
})
export default connect(mapStateToProps)(StartQuiz);
