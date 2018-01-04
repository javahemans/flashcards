import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Button, Text, Content, H1, H2, H3, screenHeight, Dimensions } from 'native-base';
import { fetchDeck } from '../actions'
import { connect } from 'react-redux'

class QuizView extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params.title,
      headerRight: <Button transparent title="Reset" onPress={ () => navigation.navigate('Home')}><Text style={{ color: 'white' }} >Reset Quiz</Text></Button>,      
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { fetchDeck, dispatch } = this.props
    console.log("Params deck - This value is ", params.deck.title)
    fetchDeck(params.deck.title)
  }

  render () {
    const { params } = this.props.navigation.state;
    const { deck } = this.props;

    return (
      <Container>
        <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'space-around', padding: 10}}>
          {/* <H1>{params.deck.title}</H1> */}
          <H1>{deck.title}</H1>          
          <View style={{justifyContent: 'center'}}>
            {/* <H2>{`${params.deck.questions.length} Cards`}</H2> */}
            <H2>{`${deck.questions.length} Cards`}</H2>
            {/* <Text>{JSON.stringify(params.deck.questions)}</Text> */}
          </View>
          <Button block success>
            <Text>Start Quiz</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}


function mapStateToProps({decks}, ownProps){
  const { params } = ownProps.navigation.state;
  return { 
    deck: decks[params.deck.title]
   }
}

export default connect(mapStateToProps, { fetchDeck })(QuizView)