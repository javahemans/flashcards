import React, { Component } from 'react'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

class AddDeck extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add Deck`,
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Text>Add Deck Page</Text>
        </Content>
      </Container>
    )
  }
}

export default AddDeck