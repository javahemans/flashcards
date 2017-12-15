import React, { Component } from 'react'
import { View, Text, Platform, StatusBar, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { purple, white, red, blue } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchDecks, altFetchDecks } from '../actions'
import { AppLoading } from 'expo'
import { setTimeout } from 'core-js/library/web/timers';
import { apiFetchDecks } from '../utils/api.js'
import _ from 'lodash'

class Decks extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Decks`
    }
  }


  state = { 
    loading: true,
    error: false, 
  };
  
async componentDidMount() {

  const { altFetchDecks, fetchDecks, dispatch } = this.props

  try {
    const request = await apiFetchDecks();
    this.setState({ 
      loading: false, 
    });
    console.log("The request from await is: ", request);
    fetchDecks(request)
  } catch (e) {
    this.setState({ 
      loading: false, 
      error: true,
    }); 
  }
}

render() {

  const { entries } = this.props
  const { loading, error } = this.state

  console.log("Entries is, ", entries);

  if (loading) {
    return <AppLoading />;
  }
  if (error) {
  return <Text>Error...</Text>;
  }
  
  
  return (
    <View style={styles.container}>
      <View style={{flex: 1, backgroundColor: 'red'}}>
        {_.map(entries, (value, key) => (<Text>Deck Name: {value.title} && number of questions is: {value.questions.length} </Text>))}
        {/* <Text>{JSON.stringify(entries)}</Text> */}

      </View>
      <TouchableOpacity style={styles.container} onPress={ () => this.props.navigation.navigate(
          'ViewDeck' 
      )}>
      <Text>Hello</Text>
      </TouchableOpacity>
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue,
  },
});


function mapDispatchToProps (dispatch) {
  return {
    fetchDecks: (request) => dispatch(fetchDecks(request)),
    altFetchDecks: () => dispatch(altFetchDecks())
  }
}

function mapStateToProps(entries){
  return { entries }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)