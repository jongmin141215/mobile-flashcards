import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchDeck } from '../actions';

class Deck extends Component {
  componentDidMount() {
    console.log("hi")
    console.log("this.props.fetchDeck()", this.props.fetchDeck())
    this.props.fetchDeck(this.props.navigation.state.params.id);
  }
  render() {
    console.log("DECK PROPS: ", this.props)
    
    return (
      <View>
        <Text>{this.props.deck.title}</Text>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  deck: state.deck
})

export default connect(mapStateToProps, { fetchDeck })(Deck);
