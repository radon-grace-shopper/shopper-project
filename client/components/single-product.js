import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProductReducer'

class singleProduct extends React.Component {
  // constructor(){
  //   super()
  // }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.loadProduct(productId)
  }

  //For review: will need an onChange & onSubmit

  render() {
    if (!this.props.product.name) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        <div>This is a single product page</div>
        <h2>{this.props.product.name}</h2>
        <img className="defaultIceCream" src={this.props.product.imageUrl} />
        <div>${this.props.product.price}</div>
        <p>{this.props.product.description}</p>
        <hr />
        <div>
          <h3>Reviews</h3>
          <label htmlFor="addReview">Add a review</label>
          <input
            name="addReview"
            type="text"
            placeholder="What's your review?"
          />
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
