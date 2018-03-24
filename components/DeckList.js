import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import { NavigationOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { fetchDecks } from '../actions';

class DeckList extends Component {
  state = {
    bounceValue: new Animated.Value(1)
  }
  componentDidMount() {
    this.props.fetchDecks()
  }
  goToDeck = (item) => {
    const { bounceValue } = this.state;
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.05 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 })
    ]).start()
    setTimeout(() => {
      this.props.navigation.navigate('Deck', { id: item })
    }, 300)
  }
  renderDeckList() {
    if (Object.keys(this.props.decks).length === 0) {
      return <Text>Create flashcards by clicking “Add Deck”.</Text>
    } else {
      return (
        <View>
          <FlatList
            data={Object.keys(this.props.decks)}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => {
              return (
                <Animated.View style={{transform: [{scale: this.state.bounceValue}]}}>
                  <TouchableOpacity onPress={() => this.goToDeck(item)}>
                    <Text>{this.props.decks[item].title} ({this.props.decks[item].questions.length} cards)</Text>
                  </TouchableOpacity>
                </Animated.View>
              )
            }}
          />
        </View>
      )
    }

  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderDeckList()}
      </View>
    );
  }
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  }
})

const mapStateToProps = (state) => ({
  decks: state.decks
})
export default connect(mapStateToProps, { fetchDecks })(DeckList);
