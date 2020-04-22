import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/cart'

class CartView extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.user.id)
  }

  render() {
    console.log('CART', this.props.cart)
    return (
      <div>
        {this.props.cart.map(order => {
          return <div key={order.id}>{order}</div>
        })}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getOrders: id => dispatch(getOrders(id))
})

export default connect(mapState, mapDispatch)(CartView)
