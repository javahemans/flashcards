import React, { Component } from 'react'
import { View, Platform, StatusBar, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { purple, white, red, blue } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchDecks, altFetchDecks } from '../actions'
import { AppLoading } from 'expo'
import { setTimeout } from 'core-js/library/web/timers';
import { apiFetchDecks } from '../utils/api.js'
import _ from 'lodash'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

class Decks extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Decks`,
      headerRight: <Button transparent title="Add Deck" onPress={ () => navigation.navigate('AddDeck')}><Text>Add Deck</Text></Button>,      
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

  const { decks } = this.props
  const { loading, error } = this.state

  console.log("Entries is, ", this.props);

  if (loading) {
    return <AppLoading />;
  }
  if (error) {
  return <Text>Error...</Text>;
  }
  
  
  return (
    <Container>
      <Content>
      {_.map(decks, (value, key) => (
        <Card key={key}>
          <CardItem button onPress={ () => this.props.navigation.navigate('ViewDeck', {title: value.title} )}>
            <Body>
              <Text>{value.title}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="ios-albums" />
                <Text>{`${value.questions.length} Cards`}</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      ))}

      </Content>
    </Container>
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

function mapStateToProps({decks}){
  return { decks }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)