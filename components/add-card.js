import React, { Component } from 'react'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

class AddCard extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add Card`,
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Text>Add Card Page</Text>
        </Content>
      </Container>
    )
  }
}

export default AddCard