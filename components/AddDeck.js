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

class AddDeck extends Component {
  state = {
    deckTitle: ''
  }
  onAddDeck = (deckTitle) => {
    this.props.saveDeck(deckTitle)
      .then(() => {
        this.props.navigation.navigate('Deck', { id: deckTitle })
        this.setState({ deckTitle: ''})
      })
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={{borderColor: 'gray', height: 40, borderWidth: 1, width: 200}}
          onChangeText={(deckTitle) => this.setState({ deckTitle })}
          value={this.state.deckTitle} />
        <TouchableOpacity onPress={() => this.onAddDeck(this.state.deckTitle)}>
          <Text>Add Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default connect(null, { saveDeck })(AddDeck);
