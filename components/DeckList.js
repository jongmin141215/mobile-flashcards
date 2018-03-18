import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { fetchDecks } from '../actions';

class DeckList extends Component {
  state = {
    decks: []
  }
  componentDidMount() {
    this.props.fetchDecks();
  }
  render() {
    console.log("props: ", this.props.decks)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>DeckList</Text>
        <Text>{JSON.stringify(this.props.decks)}</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  decks: state.decks
})
export default connect(mapStateToProps, { fetchDecks })(DeckList);
