import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class CartView extends Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
    this.deleteOrder = this.deleteOrder.bind(this)
  }

  async deleteOrder(removedOrder) {
    removedOrder.status = 'completed'
    const newOrder = await axios.put(
      `/api/orders/${removedOrder.id}`,
      removedOrder
    )
    this.setState(prevState => ({
      cart: prevState.cart.filter(order => order.id !== removedOrder.id)
    }))
  }

  async componentDidMount() {
    const {data} = await axios.get(`/api/orders/user/${this.props.user.id}`)
    this.setState({cart: data})
  }

  render() {
    return (
      <div>
        {this.state.cart.map(order => {
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
                  <button type="button" onClick={() => this.deleteOrder(order)}>
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
  user: state.user
})

export default connect(mapState, null)(CartView)
