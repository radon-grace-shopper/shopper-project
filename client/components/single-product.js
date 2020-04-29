import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProductReducer'
import axios from 'axios'
import AddToCart from './addToCart'
const faker = require('faker')

class singleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      rating: 0,
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.calculateReviews = this.calculateReviews.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.loadProduct(productId)
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()
      //Creating new review
      let content = this.state.content
      let rating = this.state.rating
      let userId = this.props.user.id
      const productId = this.props.match.params.productId
      const newReview = {
        content,
        rating,
        productId,
        userId
      }
      await axios.post('/api/reviews', newReview)

      await this.props.loadProduct(productId)
      this.setState({
        content: '',
        rating: 0
      })
    } catch (error) {
      console.log('Error Submitting new review', error)
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  calculateReviews() {
    let sum = 0
    this.props.product.reviews.forEach(review => {
      sum += review.rating
    })
    return sum / this.props.product.reviews.length || 'Not yet rated'
  }

  render() {
    if (!this.props.product.name) {
      return (
        <div className="spinner-border text-primary">
          <h2 className="sr-only">Loading...</h2>
        </div>
      )
    }
    console.log('PROPS', this.props)
    return (
      <div className="container">
        <br />
        <div className="jumbotron">
          <h2>{this.props.product.name}</h2>
          <img className="defaultIceCream" src="/iceCreamDefault.jpg" />
          <div>${this.props.product.price}</div>
          <p>{this.props.product.description}</p>
          <a>Average Rating: {this.calculateReviews()}</a>

          {this.props.product.inventory ? (
            <div className="quantity">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
                min="1"
                max={this.props.product.inventory}
              />
              <AddToCart
                id="cartbtn"
                productId={this.props.match.params.productId}
                quantity={this.state.quantity}
                price={this.props.product.price}
              />
            </div>
          ) : (
            <h4>
              Sorry, this item is currently out of stock. Please come back
              later!
            </h4>
          )}
        </div>

        <hr />
        <div>
          <h3>Reviews</h3>
          {this.props.user.id ? (
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="content">Add a review</label>
              <input
                name="content"
                type="text"
                placeholder="What's your review?"
                onChange={this.handleChange}
                value={this.state.content}
              />
              <label htmlFor="rating">Rating:</label>
              <select name="rating" onChange={this.handleChange}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </form>
          ) : (
            <div>Please log in if you would like to leave a review</div>
          )}
          <br />
          <div>
            {this.props.product.reviews.length >= 1 ? (
              this.props.product.reviews.map(review => (
                <div className="card" key={review.id}>
                  <div className="card-body">
                    <h5 className="card-title">
                      Reviewed by: {'Loading' && review.user.email}
                    </h5>
                    <a>Rating: {review.rating}/5</a>
                    <p className="card-text">{review.content}</p>
                    <div />
                    <br />
                  </div>
                </div>
              ))
            ) : (
              <div>There are no reviews for this product yet!</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadProduct: id => dispatch(fetchProduct(id))
  }
}

export default connect(mapState, mapDispatch)(singleProduct)
