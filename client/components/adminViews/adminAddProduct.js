import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {postProduct, fetchProducts} from '../../store/allProductsReducer'

class AddProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      inventory: 0,
      category: 'ice cream',
      clicked: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    console.log('Submit new pdt clicked')
    try {
      event.preventDefault()
      this.setState({clicked: true})
      const name = this.state.name
      const description = this.state.description
      const price = this.state.price
      const inventory = this.state.inventory
      const category = this.state.category
      const newProduct = {
        name,
        description,
        price,
        inventory,
        category
      }
      await this.props.addProduct(newProduct)
      await this.props.getProducts()
      this.setState({
        name: '',
        description: '',
        price: 0,
        inventory: 0,
        category: 'ice cream'
      })
    } catch (error) {
      console.log('Error creating new product', error)
    }
  }

  render() {
    console.log('add form PROPS', this.props)
    return (
      <div>
        <Link to="/admin/products">Back</Link>
        <form onSubmit={this.handleSubmit}>
          <h2>Add Product Form</h2>
          {/* <label htmlFor="id">id</label>
        <input name="id" placeholder="id" disabled></input> */}

          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            type="text"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />

          <label htmlFor="price">Price</label>
          <input
            name="price"
            type="text"
            placeholder="Price"
            value={this.state.price}
            onChange={this.handleChange}
          />

          <label htmlFor="inventory">Inventory</label>
          <input
            name="inventory"
            type="text"
            placeholder="Inventory"
            value={this.state.inventory}
            onChange={this.handleChange}
          />

          <label htmlFor="category">Category</label>
          <select name="category" onChange={this.handleChange}>
            <option value="ice cream">ice cream</option>
            <option value="healthy">healthy</option>
            <option value="dairy-free">dairy-free</option>
          </select>
          <br />
          <button type="submit">Submit Product</button>
          <Link to="/admin/products">
            <button type="button">Cancel</button>
          </Link>
          <div>
            {this.state.clicked ? (
              <p>
                Product was added to database!
                <button
                  type="button"
                  onClick={() => {
                    this.setState({clicked: false})
                  }}
                >
                  x
                </button>
              </p>
            ) : (
              <p>
                <button className="notVisible" type="button">
                  x
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addProduct: pdt => dispatch(postProduct(pdt))
  }
}

export default connect(null, mapDispatch)(AddProduct)