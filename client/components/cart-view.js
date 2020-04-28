import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  deleteOrder,
  getOrders,
  updateQuantity,
  getSessionOrders
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
    console.log(this.props.user)
    if (this.props.user.id) {
      console.log('ran the if')
      this.props.getOrders(this.props.user.id)
    } else {
      console.log('we ran this')
      this.definingUser()
      // console.log('already ran getOrders')
    }
  }
  async definingUser() {
    const holdUp = await this.props.me()
    if (this.props.user.id) {
      console.log('getting user orders')
      this.props.getOrders(this.props.user.id)
    } else {
      console.log('got to requesting session')
      this.props.getSessionOrders()
    }
  }

  render() {
    // console.log('this is props.cart', this.props.cart)
    if (!this.props.cart.products) {
      // console.log('got here')
      return (
        <div className="spinner-border text-primary" role="status">
          <h3 className="sr-only">loading</h3>
        </div>
      )
    } else {
      // console.log(
      //   'broke the rules and got here even though this.props.cart:',
      //   this.props.cart
      // )

      return (
        <div className="container">
          <div key={this.props.cart.id}>
            {this.props.cart.products.map(product => (
              <CartedProduct key={product.id} products={product} />
              // <div key={product.id}>
              //   <h2>Name: {product.name}</h2>
              //   <p>Description:{product.description}</p>
              //   <img className="defaultIceCream" src={product.imageUrl} />
              //   <br />
              //   <a>Single Price: {product.price}</a>
              //   <label htmlFor="quantity">Quantity:</label>
              //   <input
              //     type="number"
              //     id="quantity"
              //     value={Number(product.orderProduct.quantity)}
              //     onChange={this.handleChange}
              //   />
              //   <br />
              //   <a>
              //     Total Price: {product.orderProduct.quantity * product.price}
              //   </a>
              //   <br />
              //   <button
              //     type="button"
              //     onClick={() => this.props.deleteOrder(order)}
              //   >
              //     Remove
              //   </button>
              //   <hr />
              // </div>
            ))}
          </div>
          <Link className="btn btn-primary btn-lg" to="/checkout">
            Checkout
          </Link>
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
