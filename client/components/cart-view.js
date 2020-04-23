import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteOrder, getOrders, updateQuantity} from '../store/cart'
import CartedProduct from './carted-product'

class CartView extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getOrders(this.props.user.id)
  }

  render() {
    if (!this.props.cart) {
      return <h3>loading</h3>
    }
    return (
      <div>
        {this.props.cart.map(order => {
          return (
            <div key={order.id}>
              {order.products.map(product => (
                <CartedProduct products={product} />
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
          )
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
  deleteOrder: order => dispatch(deleteOrder(order)),
  getOrders: id => dispatch(getOrders(id)),
  updateQuantity: (orderProduct, quantity) =>
    dispatch(updateQuantity(orderProduct, quantity))
})

export default connect(mapState, mapDispatch)(CartView)
