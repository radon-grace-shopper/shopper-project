import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {getOrders} from '../store/cart'

class addToCart extends React.Component {
  constructor() {
    super()
    this.state = {
      clicked: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    console.log('Add to cart was clicked')
    this.setState({clicked: true})
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
        <button type="submit" className="addToCart">
          Add to Cart
        </button>
        <div id="cartMessage">
          {this.state.clicked ? (
            <p>
              Item was added to Cart!
              <button
                type="button"
                onClick={() => {
                  this.setState({clicked: false})
                }}
              >
                x
              </button>
            </p>
          ) : (
            <p>
              <button className="notVisible" type="button">
                x
              </button>
            </p>
          )}
        </div>
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
