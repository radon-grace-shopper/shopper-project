import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProductsReducer'

class allProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    console.log('these are the products on props', this.props.products)
    if (this.props.products.length === 0) {
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

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(allProducts)
