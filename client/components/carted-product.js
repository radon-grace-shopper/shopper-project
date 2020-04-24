import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteOrder, getOrders, updateQuantity} from '../store/cart'
class CartedProduct extends Component {
  constructor() {
    super()
    this.state = {
      quant: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    console.log(this.props)
    this.setState({
      quant: this.props.products.orderProduct.quantity
    })
  }
  handleChange(event) {
    this.setState({
      quant: event.target.value
    })
    this.props.updateQuantity(
      this.props.products.orderProduct,
      event.target.value
    )
  }
  render() {
    console.log(this.state.quant)
    const product = this.props.products
    if (this.props.products) {
      return (
        <form>
          <div key={product.id}>
            <h2>Name: {product.name}</h2>
            <p>Description:{product.description}</p>
            <img className="defaultIceCream" src={product.imageUrl} />
            <br />
            <a>Single Price: {product.price}</a>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={this.state.quant}
              onChange={this.handleChange}
            />
            <br />
            <a>Total Price: {product.orderProduct.quantity * product.price}</a>
            <br />
            <button
              type="button"
              onClick={() =>
                this.props.deleteOrder(product.orderProduct.orderId, product.id)
              }
            >
              Remove
            </button>
            <hr />
          </div>
        </form>
      )
    } else {
      return null
    }
  }
}

const mapDispatchToProps = dispatch => ({
  deleteOrder: (orderId, productId) =>
    dispatch(deleteOrder(orderId, productId)),
  getOrders: id => dispatch(getOrders(id)),
  updateQuantity: (orderProduct, quantity) =>
    dispatch(updateQuantity(orderProduct, quantity))
})

export default connect(null, mapDispatchToProps)(CartedProduct)
