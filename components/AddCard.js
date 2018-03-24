import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { saveCard, fetchDecks } from '../actions';
import TextButton from './TextButton';

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    addCard: false,
    questionError: null,
    answerError: null
  }
  onAddCard = (title, card) => {
    if (card.question === '' ) {
      this.setState({questionError: 'Question is required.'})
    } else {
      this.setState({questionError: null})
    }
    if (card.answer === '') {
      this.setState({answerError: 'Answer is required.'})
    } else {
        this.setState({answerError: null})
    }
    if (card.answer !== '' && card.question !== '') {
      this.props.saveCard(title, card)
        .then(() => this.goBackToDeck())
      this.setState({questionError: null, answerError: null})
    }
  }
  goBackToDeck = () => {
    const { navigation } = this.props;
    navigation.dispatch({
      routeName: 'Deck',
      type: 'GoBackToDeck'
    })
    navigation.state.params.onGoBackToDeck({ addCard: true })
  }
  render() {
    const { question, questionError, answer, answerError } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Question
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(question) => this.setState({ question })}
            value={question}
          />
          {questionError && <Text style={{color: 'red'}}>{questionError}</Text>}
        </View>
        <View>
          <Text style={styles.text}>
            Answer
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(answer) => this.setState({ answer })}
            value={answer}
          />
          {answerError && <Text style={{color: 'red'}}>{answerError}</Text>}
        </View>
        <TextButton style={{marginTop: 20}} onPress={() => this.onAddCard(this.props.deck.title, { question, answer })}>
          <Text>Add Card</Text>
        </TextButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100
  },
  text: {
    fontSize: 15,
    marginBottom: 5,
    marginTop: 5,
    color: '#121212'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ababab',
    height: 40,
    width: 200,
    padding: 5
  }
})
const mapStateToProps = (state) => {
  return {
    deck: state.deck
  }
}
export default connect(mapStateToProps, { saveCard, fetchDecks })(AddCard);
