import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProductReducer'

class singleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      review: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    console.log('Product ID', productId)
    this.props.loadProduct(productId)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('Submitting review', this.state.review)
    //will make a PUT (update) request to add to db
  }

  handleChange(event) {
    this.setState({
      review: event.target.value
    })
  }
  //For review: will need an onChange & onSubmit
  //To do: add button to add item to cart
  //To do: add to cart button should add item to cart but updating user's order and setting it to cart status

  render() {
    console.log('Here are the Props', this.props)

    if (!this.props.product.name) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        <h2>{this.props.product.name}</h2>
        <img className="defaultIceCream" src={this.props.product.imageUrl} />
        <div>${this.props.product.price}</div>
        <p>{this.props.product.description}</p>
        <button type="button">Add To Cart</button>
        <hr />
        <div>
          <h3>Reviews</h3>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="addReview">Add a review</label>
            <input
              name="addReview"
              type="text"
              placeholder="What's your review?"
              onChange={this.handleChange}
              value={this.state.review}
            />
            <button type="submit">Submit Review</button>
          </form>
          <br />
          <div>
            {this.props.product.reviews.length >= 1 ? (
              this.props.product.reviews.map(review => (
                <div key={review.id}>
                  <div>Reviewed by:{review.userId}...how to access email?</div>
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
