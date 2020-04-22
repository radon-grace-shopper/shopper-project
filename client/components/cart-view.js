import React, {Component} from 'react'
import {connect} from 'react-redux'

class CartView extends Component {
  render() {
    return (
      <div>
        <a>item list</a>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(CartView)
