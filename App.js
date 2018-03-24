import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import reducer from './reducers';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import StartQuiz from './components/StartQuiz';
import Result from './components/Result';
import { setLocalNotification } from './utils/helpers';

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
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
      title: 'Decks',
      tabBarLabel: 'Decks',
      tabBarIcon: () => <MaterialCommunityIcons name='cards' size={30} style={{marginBottom: -10}} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'Add Deck',
      tabBarLabel: 'Add Deck',
      tabBarIcon: () => <Ionicons name='ios-create' size={30} style={{marginBottom: -10}} />
    }
  }
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 15,
      marginBottom: -20
    },
    activeTintColor: '#000'
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
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card'
    }
  },
  StartQuiz: {
    screen: StartQuiz,
    navigationOptions: {
      title: 'Quiz'
    }
  },
  Result: {
    screen: Result,
    navigationOptions: {
      title: 'Results'
    }
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
