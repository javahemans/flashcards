import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Decks from './components/decks.js'
import ViewDeck from './components/view-deck.js'
import AddDeck from './components/add-deck.js'
import AddCard from './components/add-card.js'
import QuizView from './components/quiz-deck.js'
import { setLocalNotification } from './utils/notifications'

import { purple, white, red } from './utils/colors'
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { Root } from "native-base";
import { Font, AppLoading } from "expo";


// Was told to split tho below out as a module, what's a good way to do that?

const MainNavigator = StackNavigator({
  Home: {
    screen: Decks,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
      }
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      headerTintColor: red,
      headerStyle: {
        backgroundColor: white,
      }
    }
  },
  ViewDeck: {
    screen: ViewDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: red,
      headerStyle: {
        backgroundColor: white,
      }
    }
  },

})

const store = createStore(reducer, {}, applyMiddleware(thunk, logger));

export default class App extends React.Component {

  state = { loading: true }

  componentDidMount() {
    setLocalNotification()
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <MainNavigator style={{flex: 1}} />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: red,
    // margin:20,
  },
});
