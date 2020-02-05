import React, { Component } from 'react';
import { connect } from 'react-redux';
import { favoriteRecipe } from '../actions';

class RecipeItem extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      favorited: false
    }
  }
  
  favorite(recipe) {
    this.props.favoriteRecipe(recipe);
    this.setState({ favorited: true });
  }
  
  unfavorite(recipe) {
    
    this.setState({ favorited: false });
  }

  render() {
    const { recipe } = this.props;
    // const ingredients = recipe.analyzedInstructions.steps.ingredients;

    return (
      <div className='recipe-item'>
        {
          this.props.favoriteButton ?
            this.state.favorited ?
              <div
                className='star'
                onClick={() => this.unfavorite(recipe)}
              >
                &#9733;
              </div>
            :
              <div
                className='star' 
                onClick={() => this.favorite(recipe)}
              >
                &#9734;
              </div>
          :
            <div></div>
        }
        <div className='recipe-text'>
          <a href={recipe.sourceUrl} target='_blank' rel="noopener noreferrer">
            <h4>{recipe.title}</h4>
          </a>
        </div>
        <img
          className='recipe-img' 
          src={recipe.image} 
          alt={recipe.title} 
        />
      </div>
    );
  }
}

export default connect(null, { favoriteRecipe })(RecipeItem);