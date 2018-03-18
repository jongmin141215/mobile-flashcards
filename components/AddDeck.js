import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
 } from 'react-native';
 import { saveDeckTitle } from '../utils/api';

export default class AddDeck extends Component {
  state = {
    deckTitle: ''
  }
  onAddDeck = (deckTitle) => {
    console.log("deck title: ",deckTitle)
    saveDeckTitle(deckTitle);
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={{borderColor: 'gray', height: 40, borderWidth: 1, width: 200}}
          onChangeText={(deckTitle) => this.setState({ deckTitle })}
          value={this.state.deckTitle} />
        <Text>{this.state.deckTitle}</Text>
        <TouchableOpacity onPress={() => this.onAddDeck(this.state.deckTitle)}>
          <Text>Add Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
