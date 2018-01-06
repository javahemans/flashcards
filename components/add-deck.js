import React, { Component } from 'react'
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Form, Label } from 'native-base';
import { Field, reduxForm, reset, untouch } from 'redux-form';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { NavigationActions } from 'react-navigation'


class AddDeck extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add Deck`,
    }
  }




  submit = values => {
    const { addDeck, dispatch, navigation } = this.props
    const { params } = navigation.state;
    const title = values.title
    // console.log("values is ", values, title)
    addDeck(title)
    dispatch(reset('NewDeckForm'));
    dispatch(untouch('NewDeckForm'));

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'ViewDeck', params: {title}})        
      ]
    })
    
    navigation.dispatch(resetAction)
    // setTimeout(() => {navigation.dispatch(resetAction)}, 250)
  }

  renderInput = ({ input, label, type, meta: { touched, error, warning } }) => {

    return ( 
      <Item stackedLabel last error={!!(touched && error)}>
      <Label>Deck Title</Label>
        <Input {...input}/>
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
          <Field name="title" component={this.renderInput} />
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

  if(!values.title) {
    errors.title = "Enter a title";
  }

  // If errors is empty, form is fine to submit.

  return errors;
}


// Leaving this here for learning: I prefer to use bound action creators, rather than mapping here which
// seems redundant

// function mapDispatchToProps (dispatch) {
//   return {
//     addDeck: (request) => dispatch(addDeck(request)),
//   }
// }

function mapStateToProps({ decks }){ 
  return { decks };
}

AddDeck = connect(mapStateToProps, {addDeck} )(AddDeck)


export default AddDeck =  reduxForm({
  validate,
  form: 'NewDeckForm'
})(AddDeck);

