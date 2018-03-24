import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { saveCard, fetchDecks } from '../actions';
import TextButton from './TextButton';

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    addCard: false
  }
  onAddCard = (title, card) => {
    this.props.saveCard(title, card)
      .then(() => this.goBackToDeck())
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
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Question
          </Text>
          <TextInput
            style={{borderColor: 'gray', height: 40, borderWidth: 1, width: 200}}
            onChangeText={(question) => this.setState({ question })}
            value={this.state.question}
          />
        </View>
        <View>
          <Text style={styles.text}>
            Answer
          </Text>
          <TextInput
            style={{borderColor: 'gray', height: 40, borderWidth: 1, width: 200}}
            onChangeText={(answer) => this.setState({ answer })}
            value={this.state.answer}
          />
        </View>
        <TextButton style={{marginTop: 20}} onPress={() => this.onAddCard(this.props.deck.title, { question: this.state.question, answer: this.state.answer })}>
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
    margin: 3,
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
