import React from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

class adminDash extends React.Component {
  render() {
    console.log('PROPS', this.props)
    if (!this.props.user.id) {
      return <h3>Loading...</h3>
    }
    return (
      <div>
        {this.props.user.isAdmin === false ? (
          <h3>NOT AUTHORIZED</h3>
        ) : (
          <div>
            <nav>
              <h3>Welcome to the admin dashboard</h3>
              <Link to="/admin/products">Edit Products</Link>
            </nav>

            {/* Link to editing products */}
            {/* <AdminProducts products={this.props.products} /> */}

            {/* Link to editing users */}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
    // products: state.products,
  }
}
// const mapDispatch = (dispatch) => {
//   return {
//     getProducts: () => dispatch(fetchProducts()),
//   }
// }

export default connect(mapState)(adminDash)
