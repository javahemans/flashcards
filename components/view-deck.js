import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Button, Text, Content, H1, H2, H3, screenHeight, Dimensions } from 'native-base';
import { fetchDeck } from '../actions'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'


class ViewDeck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params.title,
      headerRight: <Button transparent title="Add Card" onPress={ () => navigation.navigate('AddCard', {title: params.title })}><Text style={{ color: 'white' }} >Add Card</Text></Button>,      
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { fetchDeck, dispatch } = this.props
    // console.log("Params deck - This value is ", params.title)
    fetchDeck(params.title)
  }

  render () {
    const { params } = this.props.navigation.state;
    const { deck } = this.props;
    return (
      typeof deck === 'undefined' ? <AppLoading /> :

      <Container>
        <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'space-around', padding: 10}}>
          {/* <H1>{params.deck.title}</H1> */}
          <H1>{deck.title}</H1>          
          <View style={{justifyContent: 'center'}}>
            {/* <H2>{`${params.deck.questions.length} Cards`}</H2> */}
            <H2>{`${deck.questions.length} Cards`}</H2>
            {/* <Text>{JSON.stringify(params.deck.questions)}</Text> */}
          </View>
          <Text>{deck.questions.length ? "" : "Add a card to get started" }</Text>
        </Content>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Button bordered
            block success disabled={!deck.questions.length} 
            style={{height:80, margin: 10, padding: 10}}
            onPress={ () => this.props.navigation.navigate('QuizView', {title: "Quiz", deck} )}
          >
            <Text>Start Quiz</Text>
          </Button>
        </View>
      </Container>
    )
  }
}


function mapStateToProps({decks}, ownProps){
  const { params } = ownProps.navigation.state;
  return { 
    deck: decks[params.title]
   }
}

export default connect(mapStateToProps, { fetchDeck })(ViewDeck)