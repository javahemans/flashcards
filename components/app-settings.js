import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Container, Button, Text, Content, H1, H2, H3, screenHeight, Dimensions } from 'native-base';
import { MFLASH_STORAGE_KEY } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { fetchDecks, altFetchDecks } from '../actions'



class Settings extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Settings`,
      headerLeft: null
    }
  }

  wipe = () => {
    const { dispatch, navigation } = this.props
    const { params } = navigation.state;

    AsyncStorage.removeItem(MFLASH_STORAGE_KEY)
    altFetchDecks()

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
      ]
    })
    navigation.dispatch(resetAction)

  }


  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button danger
            style={{alignSelf: 'auto'}}
            onPress={this.wipe}
          >
          <Text>Reset Storage</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default connect(null, { altFetchDecks })(Settings)