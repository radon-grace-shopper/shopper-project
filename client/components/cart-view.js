import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  deleteOrder,
  getOrders,
  updateQuantity,
  getSessionOrders,
  formatData
} from '../store/cart'

import {me} from '../store/user'

import CartedProduct from './carted-product'
import {Link} from 'react-router-dom'

class CartView extends Component {
  constructor() {
    super()

    this.definingUser = this.definingUser.bind(this)
  }
  componentDidMount() {
    this.definingUser()
  }

  async definingUser() {
    const holdUp = await this.props.me()
    if (this.props.user.id) {
      console.log('there is a user')
      await this.props.getSessionOrders()
      if (this.props.cart.products) {
        console.log('products after session cart obtained')
        const sessionOrder = this.props.cart.id
        await this.props.getOrders(this.props.user.id)
        if (this.props.cart.products) {
          console.log('products after user cart obtained')
          const userOrder = this.props.cart.id
          await formatData(sessionOrder, userOrder)
          await this.props.getOrders(this.props.user.id)
        }
      } else {
        console.log('nothing on session')
        await this.props.getOrders(this.props.user.id)
      }
    } else {
      console.log('no user')
      await this.props.getSessionOrders()
    }
  }

  render() {
    if (!this.props.cart.products) {
      return (
        <div className="spinner-border text-primary" role="status">
          <h3 className="sr-only">loading</h3>
        </div>
      )
    } else {
      return (
        <div className="container">
          <div key={this.props.cart.id}>
            {this.props.cart.products.map(product => (
              <CartedProduct key={product.id} products={product} />
            ))}
          </div>
          <Link to="/checkout">Checkout</Link>
        </div>
      )
    }
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  deleteOrder: (orderId, productId) =>
    dispatch(deleteOrder(orderId, productId)),
  me: () => dispatch(me()),
  getOrders: id => dispatch(getOrders(id)),
  updateQuantity: (orderProduct, quantity) =>
    dispatch(updateQuantity(orderProduct, quantity)),
  getSessionOrders: () => dispatch(getSessionOrders())
})

export default connect(mapState, mapDispatch)(CartView)
