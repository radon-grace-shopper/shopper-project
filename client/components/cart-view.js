import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class CartView extends Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get(`/api/orders/${this.props.user.id}`)
    this.setState({cart: data})
  }

  render() {
    return (
      <div>
        {this.state.cart.map(order => {
          console.log(order)
          return (
            <div key={order.id}>
              {order.products.map(product => (
                <div key={product.id}>
                  Name: {product.name}
                  <br />
                  Description:{product.description}
                  <br />
                  <img src={product.imageUrl} />
                  <br />
                  Single Price: {product.price}
                  <br />
                  Quantity: {product.orderProduct.quantity}
                  <br />
                  Total Price: {product.orderProduct.quantity * product.price}
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
