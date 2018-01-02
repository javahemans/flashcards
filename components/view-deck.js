import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Button, Text, Content, H1, H2, H3 } from 'native-base';

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
      <Container>
        <Content>
          <H1>Yo</H1>
          <H2>Header Two</H2>
          <H3>Header Three</H3>
          <Text>Default</Text>
        </Content>
      </Container>
    )
  }
}

export default ViewDeck