import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/allProductsReducer'
import {Link} from 'react-router-dom'

class AdminProducts extends React.Component {
  constructor() {
    super()
    this.onEdit = this.onEdit.bind(this)
  }
  componentDidMount() {
    this.props.getProducts()
  }

  onEdit(event) {
    // this.props.history.push(`/admin/products/edit/${event.target.value}`)
  }

  render() {
    console.log('Props', this.props)
    return (
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
                    <Link to="/admin/products/edit">
                      <button type="button" value={pdt.id}>
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button type="button">delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AdminProducts)
