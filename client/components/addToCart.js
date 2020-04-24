import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {getOrders} from '../store/cart'

class addToCart extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    console.log('Add to cart was clicked')
    const userId = this.props.user.id
    const order = {
      productId: this.props.productId,
      quantity: this.props.quantity,
      price: this.props.price
    }
    await axios.post(`/api/orders/user/addToCart`, order)
    this.props.getOrders(userId)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Add To Cart</button>
      </form>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: id => dispatch(getOrders(id))
  }
}

export default connect(mapState, mapDispatch)(addToCart)
