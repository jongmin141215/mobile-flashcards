import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { fetchDecks } from '../actions';

class DeckList extends Component {
  componentDidMount() {
    this.props.fetchDecks();
  }
  goToCardPage = () => {
    console.log("card page")
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
              <TouchableOpacity onPress={() => this.goToCardPage()}>
                <Text>{this.props.decks[item].title}</Text>
              </TouchableOpacity>
            )
          }}
        />
        </View>
      )
    }

  }
  render() {
    console.log("props: ", Object.keys(this.props.decks))
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
