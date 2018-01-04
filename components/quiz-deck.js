import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Button, Text, Content, H1, H2, H3, screenHeight, Dimensions } from 'native-base';
import { fetchDeck } from '../actions'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification} from '../utils/notifications'


class QuizView extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      title: params.title,
      headerRight: <Button transparent title="Reset" onPress={ () => navigation.navigate('Home')}><Text style={{ color: 'white' }} >Exit Quiz</Text></Button>,      
    }
  }

  state = {
    view: "Quiz",
    questionIndex: 0,
    correct: 0,
    incorrect: 0,
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { fetchDeck, dispatch } = this.props
    console.log("Params deck - This value is ", params.deck.title)
    fetchDeck(params.deck.title)
  }

  gotCorrect = () => {
    const { deck } = this.props;
    this.setState({correct: this.state.correct+1 })
    console.log("Got it correct! ", this.state.questionIndex, this.state.correct+1, deck.questions.length)
    this.state.questionIndex < (deck.questions.length - 1)
      ? this.setState({ questionIndex: this.state.questionIndex+1})
      : this.setState({view: "Finished"})
  }

  gotInCorrect = () => {
    const { deck } = this.props;
    this.setState({incorrect: this.state.incorrect+1 })
    console.log("Got it Wrong! ", this.state.questionIndex, this.state.incorrect+1, deck.questions.length)
    this.state.questionIndex < (deck.questions.length -1)
      ? this.setState({ questionIndex: this.state.questionIndex+1})
      : this.setState({view: "Finished"})

  }

  resetNotification = () => {
    console.log("Finished, clearning notifications ", this.state.view)
    clearLocalNotification()
      .then(setLocalNotification);
  }

  render () {
    const { params } = this.props.navigation.state;
    const { deck } = this.props;
    this.state.view === "Finished" ?  this.resetNotification() : console.log("Going ", this.state.view)
    
    return (

      this.state.view === "Quiz" 
        ?       
        <Container>
          <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
            <H1>{deck.questions[this.state.questionIndex].question}</H1>
            <H2>{`Q${this.state.questionIndex+1} of ${deck.questions.length}`}</H2>
            {/* <H2>{JSON.stringify(deck)}</H2> */}
          </Content>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Button 
              full block bordered success 
              style={{flex:1, justifyContent: 'center', height: 80, marginLeft: 10, marginRight: 10}}
              onPress={this.gotCorrect}
            >
              <Text>Correct</Text>
            </Button>
            <Button 
              full block bordered danger 
              style={{flex:1, justifyContent: 'center', height: 80, marginRight: 10}}
              onPress={this.gotInCorrect}
            >
              <Text>InCorrect</Text>
            </Button>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button 
              bordered warning 
              style={{height:80, justifyContent: 'center', alignSelf:'auto', margin: 10, padding: 10}} 
              onPress={() => this.setState({view: "Answer"})}
            >
              <Text>Show Answer</Text>
            </Button>  
          </View>

        </Container>
        : this.state.view === "Answer" 
          ?
          <Container>
            <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
            <H1>Answer</H1>
            <H2>{deck.questions[this.state.questionIndex].answer}</H2>
            </Content>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button bordered warning 
              style={{height:80, justifyContent: 'center', alignSelf:'auto', margin: 10, padding: 10}} 
              onPress={() => this.setState({view: "Quiz"})}
            >
              <Text>Show Quiz</Text>
            </Button>  
          </View>
            
          </Container>
          : 
          <Container>
            <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
              <H1>Your Summary</H1>
              <H2>Correct:{`${this.state.correct}/${deck.questions.length}`}</H2>
            </Content>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Button bordered warning 
                style={{height:80, justifyContent: 'center', alignSelf:'auto', margin: 10, padding: 10}} 
                onPress={() => this.setState({questionIndex: 0, correct: 0, incorrect: 0, view: "Quiz"})}
              >
                <Text>Restart Quiz</Text>
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