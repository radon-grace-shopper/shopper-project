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

export default connect()(CartView)
