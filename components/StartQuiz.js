import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class StartQuiz extends Component {
  state = {
    index: 0,
    showAnswer: false
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
  toNextCard = () => {
    if (this.state.index + 1 === this.props.deck.questions.length) {
      this.props.navigation.navigate('Result');
    } else {
      this.setState({index: this.state.index + 1})
    }
  }

  render() {
    console.log("Start quiz (decks): ", this.props)
    return (
      <View>
      <Text>({this.state.index + 1}/{this.props.deck.questions.length})</Text>
        {this.displayQuestionOrAnswer()}

        <TouchableOpacity onPress={this.toNextCard}>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toNextCard}>
          <Text>Incorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  deck: state.deck
})
export default connect(mapStateToProps)(StartQuiz);
