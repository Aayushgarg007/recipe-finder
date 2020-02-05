import React, { Component } from 'react';
import { Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setRecipes } from '../actions';

const API_KEY = '80d49d0442c84831bd3bd442a2cbedb0';

class SearchRecipes extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ingredients: '',
      dish: ''
    }
  }
  
  search = () => {
    let { ingredients, dish } = this.state;
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&includeIngredients=${ingredients}&query=${dish}`;
    console.log('state', this.state, 'url', url);
    
    fetch(url, {
      method: 'GET'
    }).then(response => response.json())
      .then(json => {
        this.props.setRecipes(json.results);
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <FormLabel>Ingredients</FormLabel>
            {' '}
            <FormControl 
              type='text' 
              placeholder='garlic, chicken...' 
              value={this.state.ingredients}
              onChange={event => this.setState({ ingredients: event.target.value })}
            />
          </FormGroup>
          {' '}
          <FormGroup>
          <FormLabel>Dish</FormLabel>
            {' '}
            <FormControl 
              type='text' 
              placeholder='adobo'
              value={this.state.dish}
              onChange={event => this.setState({ dish: event.target.value })} 
            />
          </FormGroup>
          {' '}
          <Button onClick={() => this.search()}>Submit</Button>
        </Form>
      </div>
    );
  }
}


export default connect(null, { setRecipes })(SearchRecipes);