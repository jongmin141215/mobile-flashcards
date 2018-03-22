import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchDeck } from '../actions';
import TextButton from './TextButton';

class Deck extends Component {
  componentDidMount() {
    console.log("hi")
    console.log("this.props.fetchDeck()", this.props.fetchDeck())
    this.props.fetchDeck(this.props.navigation.state.params.id);
  }
  goToAddCard = () => {
    this.props.navigation.navigate('AddCard');
  }
  goToStartQuiz = () => {
    this.props.navigation.navigate('StartQuiz');
  }
  render() {
    console.log("DECK PROPS: ", this.props)
    if (Object.keys(this.props.deck).length === 0) {
      return <ActivityIndicator />
    } else {
      return (
        <View>
          <Text>{this.props.deck.title}</Text>
          <Text>{this.props.deck.questions.length} cards</Text>
          <TextButton style={{}} onPress={this.goToAddCard}>
            Add Card
          </TextButton>
          <TextButton style={{backgroundColor: 'black', color: 'white'}} onPress={this.goToStartQuiz}>
            Start Quiz
          </TextButton>
        </View>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  deck: state.deck
})

export default connect(mapStateToProps, { fetchDeck })(Deck);
