import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchDeck } from '../actions';
import TextButton from './TextButton';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.id
    }
  }
  state = {
    addCard: false
  }
  componentDidMount() {
    this.props.fetchDeck(this.props.navigation.state.params.id);
  }
  onGoBackToDeck = (newState) => {
    this.props.fetchDeck(this.props.navigation.state.params.id);
  }
  goToAddCard = () => {
    this.props.navigation.navigate('AddCard', { onGoBackToDeck: this.onGoBackToDeck });
  }
  goToStartQuiz = () => {
    this.props.navigation.navigate('StartQuiz');
  }
  render() {
    const { deck } = this.props;
    if (Object.keys(deck).length === 0) {
      return <ActivityIndicator />
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.deckHeader}>
            <Text style={styles.deckHeaderText}>{deck.title}</Text>
            <Text style={styles.deckSubHeaderText}>{deck.questions.length} cards</Text>
          </View>
          <View style={styles.body}>
            <TouchableOpacity onPress={this.goToAddCard} style={{alignSelf: 'center'}}>
              <Text style={styles.button}>Add Card</Text>
            </TouchableOpacity>
            {deck.questions.length !== 0 &&
              <TouchableOpacity onPress={this.goToStartQuiz} style={{alignSelf: 'center', marginTop: 10}}>
                <Text style={styles.button}>Start Quiz</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      );
    }
  }
}
styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deckHeader: {
    marginTop: 100,
    alignItems: 'center',
  },
  deckHeaderText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  deckSubHeaderText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#888',
    marginTop: 5,
  },
  body: {
    marginTop: 50
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    width: 200,
    height: 40,
    backgroundColor: '#000',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
  }
})
const mapStateToProps = (state) => ({
  deck: state.deck
})

export default connect(mapStateToProps, { fetchDeck })(Deck);
