import React, { Component } from 'react'
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Form, Label } from 'native-base';
import { Field, reduxForm, reset, untouch } from 'redux-form';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { NavigationActions } from 'react-navigation'


class AddCard extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add Card`,
    }
  }

  submit = values => {
    const { addCard, dispatch, navigation } = this.props
    const { params } = navigation.state;
    console.log("values is ", values)

    addCard(params.deck.title, values)
    dispatch(reset('NewCardForm'));
    dispatch(untouch('NewCardForm'));
    // navigation.navigate('Home') //navigation.goBack is borked.

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'ViewDeck', params: {title: params.deck.title, deck: params.deck}})
      ]
    })
    navigation.dispatch(resetAction)

  }

  renderInput = ({ input, label, last, type, meta: { touched, error, warning } }) => {

    return ( 
      <Item stackedLabel last error={!!(touched && error)}>
      <Label>{label}</Label>
        <Input 
        {...input}
        multiline={true}
        numberOfLines={4}
        />
        <Text>{touched && error ? error : null }</Text>
      </Item>
    )
  }

  render() {
    const { handleSubmit, reset } = this.props;
    
    return (
      <Container>
        <Content padder>
          <Form>
          <Field name="question" last="" label="question" component={this.renderInput} />
          <Field name="answer" last="last" label="answer" component={this.renderInput} />

          <Button block primary onPress={handleSubmit(this.submit)} style={{ marginTop: 20 }}>
            <Text>Submit</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

function validate(values) {
  const errors = {}

  if(!values.question) {
    errors.question = "Enter a question";
  }

  if(!values.answer) {
    errors.answer = "Enter an answer";
  }
  

  // If errors is empty, form is fine to submit.

  return errors;
}

// function mapDispatchToProps (dispatch) {
//   return {
//     addCard: (title, card) => dispatch(addCard(title, card)),
//   }
// }

function mapStateToProps({ decks }){ // ES6: equivalent to state here and then const posts = state.posts in the body.
  return { decks }; // ES6 as opposed to posts:posts
}

AddCard = connect(mapStateToProps, {addCard} )(AddCard)


export default AddCard =  reduxForm({
  validate,
  form: 'NewCardForm'
})(AddCard);

