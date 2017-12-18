import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Decks from './components/decks.js'
import ViewDeck from './components/view-deck.js'
import AddDeck from './components/add-deck.js'
import AddCard from './components/add-card.js'
import { purple, white, red } from './utils/colors'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

// const Tabs = TabNavigator({
//   Decks: {
//     screen: Decks,
//     navigationOptions: {
//       tabBarLabel: 'Decks',
//       tabBarIcon: ({ tintColor }) => <Ionicons name = 'ios-bookmarks' size={30} color={tintColor} />
//     }
//   },
// }, {
//   navigationOptions: {
//     // header: null,
//     headerStyle: {
//       backgroundColor: white
//     },    
//   },
//   tabBarOptions: {
//     activeTintColor: Platform.OS === 'ios' ? purple : white,
//     style: {
//       height: 56,
//       backgroundColor: Platform.OS === 'ios' ? red : purple,
//       shadowColor: 'rgba(0,0,0,0.24)',
//       shadowOffset: {
//         width: 0,
//         height: 3
//       },
//       shadowRadius: 6,
//       shadowOpacity: 1
//     }
//   }
// })


const MainNavigator = StackNavigator({
  Home: {
    screen: Decks,
    navigationOptions: {
      headerTintColor: red,
      headerStyle: {
        backgroundColor: white,
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
  // QuizView: {
  //   screen: QuizView,
  //   navigationOptions: {
  //     headerTintColor: red,
  //     headerStyle: {
  //       backgroundColor: white,
  //     }
  //   }
  // },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: red,
      }
    }
  },

})


const store = createStore(reducer, {}, applyMiddleware(thunk, logger));

export default class App extends React.Component {

  render() {
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
