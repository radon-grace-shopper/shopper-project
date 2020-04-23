import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProductReducer'
import axios from 'axios'
import AddToCart from './addToCart'

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
      const productId = this.props.match.params.productId
      const newReview = {
        content,
        rating,
        productId
        //To do: userId add in later
      }
      await axios.post('/api/reviews', newReview)

      this.props.loadProduct(productId)
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
    // console.log('the state', this.state)
  }
  //To do: add button to add item to cart
  //To do: add to cart button should add item to cart but updating user's order and setting it to cart status

  render() {
    console.log('Props', this.props)
    if (!this.props.product.name) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        <h2>{this.props.product.name}</h2>
        <img className="defaultIceCream" src={this.props.product.imageUrl} />
        <div>${this.props.product.price}</div>
        <p>{this.props.product.description}</p>
        <input
          type="number"
          name="quantity"
          value={this.state.quantity}
          onChange={this.handleChange}
          min="1"
          max={this.props.product.inventory}
        />
        <AddToCart
          productId={this.props.match.params.productId}
          quantity={this.state.quantity}
        />
        <hr />
        <div>
          <h3>Reviews</h3>
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
            <button type="submit">Submit Review</button>
          </form>
          <br />
          <div>
            {this.props.product.reviews.length >= 1 ? (
              this.props.product.reviews.map(review => (
                <div key={review.id}>
                  <div>Reviewed by: {review.user.email}</div>
                  <div>Rating: {review.rating}/5</div>
                  <div>{review.content}</div>
                  <br />
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
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    loadProduct: id => dispatch(fetchProduct(id))
  }
}

export default connect(mapState, mapDispatch)(singleProduct)
