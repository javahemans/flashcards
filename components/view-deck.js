import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Button, Text } from 'native-base';

class ViewDeck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params.title,
      headerRight: <Button transparent title="Add Card" onPress={ () => navigation.navigate('AddCard')}><Text style={{ color: 'white' }} >Add Card</Text></Button>,      
    }
  }

  render () {
    return (
      <Text> ViewDeck Page </Text>
    )
  }
}

export default ViewDeck