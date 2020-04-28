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
          <div className="jumbotron" key={product.id}>
            <h5 className="display-4">{product.name}</h5>
            <div className="lead ">
              <img className="defaultIceCream" src={product.imageUrl} />
              <p>{product.description}</p>
            </div>
            <a>Price: ${product.orderProduct.quantity * product.price}</a>
            <br />
            <a>Amount:</a>
            <input
              type="number"
              id="quantity"
              value={this.state.quant}
              onChange={this.handleChange}
              min="1"
              max={this.props.products.inventory}
            />
            <br />
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() =>
                this.props.deleteOrder(product.orderProduct.orderId, product.id)
              }
            >
              Remove
            </button>
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
