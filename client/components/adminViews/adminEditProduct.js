import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../../store/singleProductReducer'
import {modifyProduct, fetchProducts} from '../../store/allProductsReducer'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: '',
      inventory: '',
      category: 'ice cream',
      clicked: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.loadProduct(this.props.match.params.productId)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()
      this.setState({clicked: true})
      console.log('Edit pdt submit was clicked!')
      const id = this.props.product.id
      const name = this.state.name || this.props.product.name
      const description =
        this.state.description || this.props.product.description
      const price = parseInt(this.state.price, 10) || this.props.product.price
      const inventory =
        parseInt(this.state.inventory, 10) || this.props.product.inventory
      const category = this.state.category || this.props.product.category
      const updatedProduct = {
        id,
        name,
        description,
        price,
        inventory,
        category
      }
      await this.props.updateProduct(updatedProduct)
      await this.props.getProducts()
    } catch (error) {
      console.log('Error Submitting edit to product', error)
    }
  }

  render() {
    // console.log('edit form PROPS', this.props)
    return (
      <div>
        {this.props.user.isAdmin === false ? (
          <h3>NOT AUTHORIZED</h3>
        ) : (
          <div>
            <Link to="/admin/products">Back</Link>
            <form onSubmit={this.handleSubmit}>
              <h2>Edit Product Form</h2>
              <label htmlFor="id">Id</label>
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
              <div>
                {this.state.clicked ? (
                  <p>
                    Product was Updated!
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
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.product,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    loadProduct: id => dispatch(fetchProduct(id)),
    updateProduct: pdt => dispatch(modifyProduct(pdt))
  }
}

export default connect(mapState, mapDispatch)(EditProduct)
