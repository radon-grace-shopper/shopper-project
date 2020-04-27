import React from 'react'
import {connect} from 'react-redux'

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
            <h3>Welcome to the admin dashboard</h3>
            <div />
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

export default connect(mapState)(adminDash)
