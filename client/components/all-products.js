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
    console.log('these are the products on props', this.props.products)
    if (this.props.products.length === 0) {
      return <h2>Loading...</h2>
    }
    if (this.state.dropDownSelect === 'all') {
      console.log('in the all render')
      return (
        <div>
          <select
            value={this.state.dropDownSelect}
            onChange={this.handleChange}
          >
            <option value="all">all</option>
            <option value="ice cream">ice cream</option>
            <option value="healthy">healthy</option>
            <option value="dairy-free">dairy-free</option>
          </select>
          <h2>All Products</h2>
          {this.props.products.map(el => (
            <div key={el.id}>
              <Link to={`/products/${el.id}`}>
                <h3>{el.name}</h3>
              </Link>
              <img src={el.imageUrl} />
              <p>{el.price}</p>
            </div>
          ))}
        </div>
      )
    } else {
      console.log(this.state.dropDownSelect)
      const filteredProducts = this.props.products.filter(
        el => el.category === this.state.dropDownSelect
      )
      console.log(filteredProducts)
      return (
        <div>
          <select
            value={this.state.dropDownSelect}
            onChange={this.handleChange}
          >
            <option value="all">all</option>
            <option value="ice cream">ice cream</option>
            <option value="healthy">healthy</option>
            <option value="dairy-free">dairy-free</option>
          </select>
          <h2>{this.state.dropDownSelect}</h2>
          {filteredProducts.map(el => (
            <div key={el.id}>
              <Link to={`/products/${el.id}`}>
                <h3>{el.name}</h3>
              </Link>
              <img src={el.imageUrl} />
              <p>{el.price}</p>
            </div>
          ))}
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
