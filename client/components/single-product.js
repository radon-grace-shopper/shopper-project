import React from 'react'
import {connect} from 'react-redux'

class singleProduct extends React.Component {
  // constructor(){
  //   super()
  // }

  render() {
    return (
      <div>
        <div>This is a single product page</div>
        <h2>Product Name(this.props.product.name)</h2>
        {/* <img src={this.props.product.imageUrl}/> */}
        <div>Product Price(this.props.product.price)</div>
        <p>
          This is where the product description would
          go......................(this.props.product.description)...............................................................................
        </p>
        <hr />
        <div>
          <h3>Reviews</h3>
          <label htmlFor="addReview">Add a review</label>
          <input />
          {/* Assuming reviews is an array of objects, will need to map over and populate them here */}
          <div>Rating: 5/5</div>
          <div>This product is great!</div>
        </div>
      </div>
    )
  }
}

export default connect()(singleProduct)
