import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/allProductsReducer'
import {Link} from 'react-router-dom'

class adminProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        <Link to="/admin">Back</Link>
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
                    <button type="button">edit</button>
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

export default connect(mapState, mapDispatch)(adminProducts)
