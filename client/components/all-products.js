import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProductsReducer'

class allProducts extends Component {
  componentDidMount() {}
  render() {
    if (this.props.products) {
      return <h2>Loading...</h2>
    }
    return (
      <div>
        <h2>All Products</h2>
        {this.props.products.map(el => (
          <div key={el.id}>
            <h3>{el.name}</h3>
            <img src={el.imageUrl} />
            <p>{el.price}</p>
          </div>
        ))}
      </div>
    )
  }
}
