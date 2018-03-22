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
import StartQuiz from './components/StartQuiz';
import Result from './components/Result';

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
  },
  StartQuiz: {
    screen: StartQuiz
  },
  Result: {
    screen: Result
  }
})

const defaultGetStateForAction = MainNavigator.router.getStateForAction;
MainNavigator.router.getStateForAction = (action, state) => {
    if (state && action.type === 'GoBackToDeck') {
        let index = state.routes.findIndex((item) => {
            return item.routeName === action.routeName
        });
        const routes = state.routes.slice(0, index+1);
        return {
            routes,
            index
        };
    }
    return defaultGetStateForAction(action, state);
};
