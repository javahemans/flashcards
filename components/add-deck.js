import React, { Component } from 'react'
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Form, Label } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addDeck } from '../actions';


class AddDeck extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Add Deck`,
    }
  }

  submit = values => {
    const { addDeck, dispatch, navigation } = this.props
    
    console.log("values is ", values)
    addDeck(values.title)
    this.props.reset()
    navigation.navigate('Home')
  }

  renderInput = ({ input, label, type, meta: { touched, error, warning } }) => {

    return ( 
      <Item stackedLabel last error={!!(touched && error)}>
      <Label>Deck Title</Label>
        <Input {...input}/>
        {touched && error ? <Text>{error}</Text> : <Text />}
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

function mapDispatchToProps (dispatch) {
  return {
    addDeck: (request) => dispatch(addDeck(request)),
  }
}

function mapStateToProps({ decks }){ // ES6: equivalent to state here and then const posts = state.posts in the body.
  return { decks }; // ES6 as opposed to posts:posts
}

AddDeck = connect(mapStateToProps, mapDispatchToProps )(AddDeck)


export default AddDeck =  reduxForm({
  validate,
  form: 'NewDeckForm'
})(AddDeck);

