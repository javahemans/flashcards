import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Button, Text, Content, H1, H2, H3, screenHeight, Dimensions } from 'native-base';
import { fetchDeck } from '../actions'
import { connect } from 'react-redux'
import _ from 'lodash'

class QuizView extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params.title,
      headerRight: <Button transparent title="Reset" onPress={ () => navigation.navigate('Home')}><Text style={{ color: 'white' }} >Reset Quiz</Text></Button>,      
    }
  }

  state = {
    view: "Quiz"
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

      this.state.view === "Quiz" 
        ?       
        <Container>
          <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
            <H1>{deck.title}</H1>          
            <H2>{`${deck.questions.length} Cards`}</H2>
            <H1> This is..  ooeu oeau au oeu aou oaueu oeau</H1>
          </Content>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button bordered warning style={{height:80, justifyContent: 'center', alignSelf:'auto', margin: 10, padding: 10}} onPress={() => this.setState({view: "Answer"})}>
              <H2>Show Answer</H2>
            </Button>  
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button full block bordered success style={{flex:1, justifyContent: 'center', height:80}}>
              <Text>Correct</Text>
            </Button>
            <Button full block bordered danger style={{flex:1, justifyContent: 'center', height:80}}>
              <Text>InCorrect</Text>
            </Button>
          </View>
        </Container>
        : <Container>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>Answer View</Text>
            <Button bordered warning style={{height:80, justifyContent: 'center', alignSelf:'auto', margin: 10, padding: 10}} onPress={() => this.setState({view: "Quiz"})}>
              <H2>Show Quiz</H2>
            </Button>  
          </View>

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