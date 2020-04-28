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
  // async formatData(data){
  //   if(data.length>1){
  //     console.log('actually doing this')
  //     const sendUpdate = {orderId:data[0].id}
  //     for(let i = 0; i< data[1].products.length;i++){
  //       const resTwo = await axios.put(`/api/orderProducts/${data[1].id}/${data[1].products[i].id}`,sendUpdate)

  //     }
  //     await axios.put(`/api/orders/${data[1].id}`, {status:'completed'})
  //   }

  //   }
  async definingUser() {
    const holdUp = await this.props.me()
    if (this.props.user.id) {
      await this.props.getSessionOrders()
      if (this.props.cart.products) {
        const sessionOrder = this.props.cart.id
        await this.props.getOrders(this.props.user.id)
        const userOrder = this.props.cart.id
        await formatData(sessionOrder, userOrder)
        await this.props.getOrders(this.props.user.id)
      } else {
        await this.props.getOrders(this.props.user.id)
      }
    } else {
      await this.props.getSessionOrders()
    }

    // if(this.props.user.id){
    //   this.props.getSessionOrders()
    //   if(this.props.cart.products){

    //   }
    // }
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
