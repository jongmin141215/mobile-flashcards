import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  onAddCard = ({ deck, question, answer }) => {
    console.log("deck", deck);
    console.log("question", question);
    console.log("answer", answer);
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
        </View>
        <TouchableOpacity onPress={() => this.onAddCard({deck: this.props.deck, question: this.state.question, answer: this.state.answer})}>
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
export default connect(mapStateToProps)(AddCard);
