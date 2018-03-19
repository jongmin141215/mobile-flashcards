import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    console.log("store.getState(): ",store.getState())

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      style: {
        backgroundColor: 'red'
      }
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck'
    }
  }
})
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  AddCard: {
    screen: AddCard
  }
})
