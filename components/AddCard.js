import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { saveCard, fetchDecks } from '../actions';

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  onAddCard = (title, card) => {
    this.props.saveCard(title, card)
    // ideally go back to the previous page. Currently the number of card is not being updated
      .then(() => this.props.navigation.popToTop());
  }
  render() {
    console.log("ADD Card PROPS: ", this.props)
    return (
      <View>
        <View>
          <Text>
            Question
          </Text>
          <TextInput
            style={{borderColor: 'gray', height: 40, borderWidth: 1, width: 200}}
            onChangeText={(question) => this.setState({ question })}
            value={this.state.question}
          />
        </View>
        <View>
          <Text>
            Answer
          </Text>
          <TextInput
            style={{borderColor: 'gray', height: 40, borderWidth: 1, width: 200}}
            onChangeText={(answer) => this.setState({ answer })}
            value={this.state.answer}
          />
          <Text>{JSON.stringify(this.props.deck)}</Text>
        </View>
        <TouchableOpacity onPress={() => this.onAddCard(this.props.deck.title, { question: this.state.question, answer: this.state.answer })}>
          <Text>Add Card</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    deck: state.deck
  }
}
export default connect(mapStateToProps, { saveCard, fetchDecks })(AddCard);
