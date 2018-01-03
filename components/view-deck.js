import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Button, Text, Content, H1, H2, H3, screenHeight, Dimensions } from 'native-base';

class ViewDeck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params.title,
      headerRight: <Button transparent title="Add Card" onPress={ () => navigation.navigate('AddCard', {deck: params.deck})}><Text style={{ color: 'white' }} >Add Card</Text></Button>,      
    }
  }

  render () {
    const { params } = this.props.navigation.state;

    return (
      <Container>
        <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'space-around', padding: 10}}>
          <H1>{params.deck.title}</H1>
          <View style={{justifyContent: 'center'}}>
            <H2>{`${params.deck.questions.length} Cards`}</H2>
            <Text>{JSON.stringify(params.deck.questions)}</Text>
          </View>
          <Button block success>
            <Text>Start Quiz</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default ViewDeck