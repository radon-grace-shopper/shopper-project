import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AdminDash extends React.Component {
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
              <h3>Welcome to the Admin Dashboard</h3>
              <Link to="/admin/products">Edit Products</Link>
              <Link to="/admin/users">Edit Users</Link>
            </nav>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(AdminDash)
