import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, removeProduct} from '../../store/allProductsReducer'
import {Link} from 'react-router-dom'

class AdminProducts extends React.Component {
  constructor() {
    super()
    this.deleteProduct = this.deleteProduct.bind(this)
  }
  componentDidMount() {
    this.props.getProducts()
  }

  async deleteProduct(event) {
    const productId = event.target.value
    try {
      await this.props.destroyProduct(productId)
      await this.props.getProducts()
    } catch (err) {
      console.log('Error deleting product', err)
    }
  }

  render() {
    console.log('Props', this.props)

    return (
      <div>
        {this.props.user.isAdmin === false ? (
          <h3>NOT AUTHORIZED</h3>
        ) : (
          <div>
            <Link to="/admin">Back </Link>
            <Link to="/admin/products/add">Add a Product</Link>
            <table className="adminProducts">
              <thead>
                <tr>
                  <th colSpan="8">Products</th>
                </tr>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Inventory</th>
                  <th>Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.props.products.map(pdt => {
                  return (
                    <tr key={pdt.id}>
                      <td>{pdt.id}</td>
                      <td>{pdt.name}</td>
                      <td>{pdt.description}</td>
                      <td>{pdt.price}</td>
                      <td>{pdt.inventory}</td>
                      <td>{pdt.category}</td>
                      <td>
                        <Link to={`/admin/products/edit/${pdt.id}`}>
                          <button type="button" value={pdt.id}>
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          type="button"
                          value={pdt.id}
                          onClick={this.deleteProduct}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    destroyProduct: id => dispatch(removeProduct(id))
  }
}

export default connect(mapState, mapDispatch)(AdminProducts)
