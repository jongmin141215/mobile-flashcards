import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AsyncStorage
 } from 'react-native';
 import { saveDeck } from '../actions';
 import { saveDeckTitle } from '../utils/api';
 import { NavigationActions } from 'react-navigation';
 import TextButton from './TextButton';

class AddDeck extends Component {
  state = {
    deckTitle: '',
    titleError: null
  }
  onAddDeck = (deckTitle) => {
    if (deckTitle === '') {
      this.setState({titleError: 'Deck title is required.'})
    } else {
      this.props.saveDeck(deckTitle)
        .then(() => {
          this.props.navigation.navigate('Deck', { id: deckTitle })
          this.setState({ deckTitle: ''})
        })
      this.setState({titleError: null})
    }
  }
  render() {
    const { deckTitle, titleError } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Add a new deck of flashcards!</Text>
        <TextInput
          style={styles.input}
          onChangeText={(deckTitle) => this.setState({ deckTitle })}
          placeholder='Deck name'
          value={deckTitle} />
        {titleError && <Text style={{color: 'red'}}>{titleError}</Text>}
        <TextButton style={{marginTop: 20}} onPress={() => this.onAddDeck(deckTitle)}>
          <Text>Add Deck</Text>
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
    fontSize: 20,
    marginBottom: 10,
    marginTop: 30,
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
export default connect(null, { saveDeck })(AddDeck);
