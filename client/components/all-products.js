import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProductsReducer'
import {Link} from 'react-router-dom'

class allProducts extends Component {
  constructor() {
    super()
    this.state = {
      dropDownSelect: 'all'
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
    this.setState({
      dropDownSelect: event.target.value
    })
  }
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    if (this.props.products.length === 0) {
      return (
        <div className="spinner-border text-primary">
          <h2 className="sr-only">Loading...</h2>
        </div>
      )
    }
    if (this.state.dropDownSelect === 'all') {
      return (
        <div className="container">
          <select
            value={this.state.dropDownSelect}
            onChange={this.handleChange}
            className="btn btn-secondary dropdown-toggle"
          >
            <option value="all">all</option>
            <option value="ice cream">ice cream</option>
            <option value="healthy">healthy</option>
            <option value="dairy-free">dairy-free</option>
          </select>
          <h2>All Products</h2>
          <div className="row">
            {this.props.products.map(el => (
              <div className="card" style={{width: '250px'}} key={el.id}>
                <img
                  className="card-img-top defaultIceCream"
                  src={el.imageUrl}
                />
                <div className="card-body">
                  <Link to={`/products/${el.id}`}>
                    <h5>{el.name}</h5>
                  </Link>
                  <a>${el.price}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      const filteredProducts = this.props.products.filter(
        el => el.category === this.state.dropDownSelect
      )
      return (
        <div className="container">
          <select
            value={this.state.dropDownSelect}
            onChange={this.handleChange}
            className="btn btn-secondary dropdown-toggle"
          >
            <option value="all">all</option>
            <option value="ice cream">ice cream</option>
            <option value="healthy">healthy</option>
            <option value="dairy-free">dairy-free</option>
          </select>
          <h2>{this.state.dropDownSelect}</h2>
          <div className="row">
            {filteredProducts.map(el => (
              <div className="card" key={el.id}>
                <img
                  className="card-img-top defaultIceCream"
                  src={el.imageUrl}
                />
                <div className="card-body">
                  <Link to={`/products/${el.id}`}>
                    <h5>{el.name}</h5>
                  </Link>
                  <a>{el.price}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
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
