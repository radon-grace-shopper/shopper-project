import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AddProduct extends React.Component {
  render() {
    console.log('add form PROPS', this.props)
    return (
      <form>
        <h2>Add Product Form</h2>
        {/* <label htmlFor="id">id</label>
        <input name="id" placeholder="id" disabled></input> */}

        <label htmlFor="name">name</label>
        <input name="name" placeholder="name" />

        <label htmlFor="description">description</label>
        <input name="description" placeholder="description" />

        <label htmlFor="price">price</label>
        <input name="price" placeholder="price" />

        <label htmlFor="inventory">inventory</label>
        <input name="inventory" placeholder="inventory" />

        <label htmlFor="category">category</label>
        <input name="category" placeholder="category" />
        <br />
        <button type="submit">Submit Change</button>
        <Link to="/admin/products">
          <button type="button">Cancel</button>
        </Link>
      </form>
    )
  }
}

export default connect()(AddProduct)
