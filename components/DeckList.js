import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { fetchDecks } from '../actions';
import { pluralizeCard } from '../utils/helpers';

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
    const { decks } = this.props;
    if (Object.keys(decks).length === 0) {
      return <Text style={styles.noDeckText}>Create flashcards by clicking {Platform.OS === 'ios' ? '“Add Deck”' : '“ADD DECK”'}.</Text>
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={Object.keys(decks)}
            keyExtractor={(item, index) => index}
            style={styles.deckList}
            renderItem={({item}) => {
              return (
                <Animated.View style={{transform: [{scale: this.state.bounceValue}]}}>
                  <TouchableOpacity onPress={() => this.goToDeck(item)} style={styles.deck}>
                    <Text style={styles.titleText}>{decks[item].title}</Text>
                    <Text style={styles.cardNumberText}>({pluralizeCard(decks[item].questions.length)})</Text>
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
  },
  noDeckText: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 200,
    marginLeft: 40,
    marginRight: 40
  }
})

const mapStateToProps = (state) => ({
  decks: state.decks
})
export default connect(mapStateToProps, { fetchDecks })(DeckList);
