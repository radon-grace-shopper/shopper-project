import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../../store/singleProductReducer'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: '',
      inventory: '',
      category: 'ice cream'
      // clicked: false,
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.loadProduct(this.props.match.params.productId)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log('edit form PROPS', this.props)
    return (
      <form>
        <h2>Edit Product Form</h2>
        <label htmlFor="id">id</label>
        <input name="id" placeholder={this.props.product.id} disabled />

        <label htmlFor="name">Name</label>
        <input
          name="name"
          placeholder={this.props.product.name}
          value={this.state.name}
          onChange={this.handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder={this.props.product.description}
          value={this.state.description}
          onChange={this.handleChange}
        />

        <label htmlFor="price">Price</label>
        <input
          name="price"
          placeholder={this.props.product.price}
          value={this.state.price}
          onChange={this.handleChange}
        />

        <label htmlFor="inventory">Inventory</label>
        <input
          name="inventory"
          placeholder={this.props.product.inventory}
          value={this.state.inventory}
          onChange={this.handleChange}
        />

        <label htmlFor="category" onChange={this.handleChange}>
          Category
        </label>
        <select name="category">
          <option value="ice cream">ice cream</option>
          <option value="healthy">healthy</option>
          <option value="dairy-free">dairy-free</option>
        </select>
        <br />
        <button type="submit">Submit Change</button>
        <Link to="/admin/products">
          <button type="button">Cancel</button>
        </Link>
      </form>
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

export default connect(mapState, mapDispatch)(EditProduct)
