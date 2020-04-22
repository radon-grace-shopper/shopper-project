import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteOrder, getOrders} from '../store/cart'

class CartView extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.user.id)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.cart.map(order => {
          return (
            <div key={order.id}>
              {order.products.map(product => (
                <div key={product.id}>
                  <h2>Name: {product.name}</h2>
                  <p>Description:{product.description}</p>
                  <img className="defaultIceCream" src={product.imageUrl} />
                  <br />
                  <a>Single Price: {product.price}</a>
                  <br />
                  <a>Quantity: {product.orderProduct.quantity}</a>
                  <br />
                  <a>
                    Total Price: {product.orderProduct.quantity * product.price}
                  </a>
                  <br />
                  <button
                    type="button"
                    onClick={() => this.props.deleteOrder(order.id)}
                  >
                    Remove
                  </button>
                  <hr />
                </div>
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
  deleteOrder: id => dispatch(deleteOrder(id)),
  getOrders: id => dispatch(getOrders(id))
})

export default connect(mapState, mapDispatch)(CartView)
