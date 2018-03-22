import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class StartQuiz extends Component {
  state = {
    index: 0,
    correct: 0,
    showAnswer: false
  }
  onRestartQuiz = (newState) => {
    console.log("onRestartQuiz", newState)
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
          <Text>{questions[index].answer}</Text>
          <TouchableOpacity onPress={this.showQuestionAnswerToggle}>
            <Text>Question</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View>
          <Text>{questions[index].question}</Text>
          <TouchableOpacity onPress={this.showQuestionAnswerToggle}>
            <Text>Answer</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  markScore = (correct) => {
    this.setState((prevState, props) => ({ correct: prevState.correct + correct}), () => {
      this.toNextCard()
    })


  }
  toNextCard = () => {
    if (this.state.index + 1 === this.props.deck.questions.length) {
      this.props.navigation.navigate('Result', { score: this.state.correct, onRestartQuiz: this.onRestartQuiz });
    } else {
      this.setState({index: this.state.index + 1})
    }
  }

  render() {
    console.log("Start quiz (decks): ", this.state)
    return (
      <View>
      <Text>({this.state.index + 1}/{this.props.deck.questions.length})</Text>
        {this.displayQuestionOrAnswer()}

        <TouchableOpacity onPress={() => this.markScore(1)}>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.markScore(0)}>
          <Text>Incorrect</Text>
        </TouchableOpacity>
        <Text>{this.state.correct}</Text>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  deck: state.deck
})
export default connect(mapStateToProps)(StartQuiz);
