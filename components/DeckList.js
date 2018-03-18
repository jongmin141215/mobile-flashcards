import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { NavigationOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { fetchDecks } from '../actions';

class DeckList extends Component {
  componentDidMount() {
    this.props.fetchDecks();
  }
  goToDeck = () => {
    console.log("this.props.navigation", this.props.navigation.navigate('Deck'))
    this.props.navigation.navigate('Deck')
  }
  renderDeckList() {
    if (Object.keys(this.props.decks).length === 0) {
      console.log("HIHIHIHIHIHIHIHHIHIHIHIHIHIHIHIH")
      return <Text>Hi</Text>
    } else {
      console.log("ELSELSELSELSELSELSELSELSEL")
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={Object.keys(this.props.decks)}
          renderItem={({item}) => {
            console.log("item", item)
            return (
              <TouchableOpacity onPress={() => this.goToDeck()}>
                <Text>{this.props.decks[item].title} ({this.props.decks[item].questions.length} cards)</Text>
              </TouchableOpacity>
            )
          }}
        />
        </View>
      )
    }

  }
  render() {
    console.log("DECKLIST props: ", this.props)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>DeckList</Text>
        <Text>{JSON.stringify(this.props.decks)}</Text>
        {this.renderDeckList()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  decks: state.decks
})
export default connect(mapStateToProps, { fetchDecks })(DeckList);
