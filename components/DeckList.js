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
        <View style={styles.container}>
          <FlatList
            data={Object.keys(this.props.decks)}
            keyExtractor={(item, index) => index}
            style={styles.deckList}
            renderItem={({item}) => {
              return (
                <Animated.View style={{transform: [{scale: this.state.bounceValue}]}}>
                  <TouchableOpacity onPress={() => this.goToDeck(item)} style={styles.deck}>
                    <Text style={styles.titleText}>{this.props.decks[item].title}</Text>
                    <Text style={styles.cardNumberText}>({this.props.decks[item].questions.length} cards)</Text>
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
      <View>
        {this.renderDeckList()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20
  },
  deckList: {
    width: '100%'
  },
  deck: {
    margin: 20,
    padding: 20,
    borderColor: '#888',
    backgroundColor: '#fff',
      shadowColor: '#ddd',
      shadowOpacity: 0.8,
       shadowRadius: 2,
    shadowOffset: {
      width: 3,
      height: 3
    },
    marginBottom: 10
  },
  titleText: {
    fontSize: 25
  },
  cardNumberText: {
    fontSize: 15,
    color: "#888"
  }
})

const mapStateToProps = (state) => ({
  decks: state.decks
})
export default connect(mapStateToProps, { fetchDecks })(DeckList);
