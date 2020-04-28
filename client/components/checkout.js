import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardElement} from '@stripe/react-stripe-js'
import axios from 'axios'
import {checkout} from '../store/cart'
import {Link} from 'react-router-dom'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      address: '',
      completed: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  async handleSubmit() {
    event.preventDefault()
    this.setState({completed: true})

    const {stripe, elements} = this.props

    if (!stripe || !elements || this.state.completed) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    this.props.cart.status = 'completed'
    this.props.cart.products.map(product => {
      product.inventory -= product.orderProduct.quantity
      return product
    })

    this.props.checkout(this.props.cart)

    // const {data} = await axios.get('/secret')
    // console.log(data)

    // const result = await stripe.confirmCardPayment(data.client_secret, {
    //   paymentMethod: {
    //     card: elements.getElement(CardElement),
    //     billingDetails: {
    //       name: 'Jenny Rosen',
    //     },
    //   },
    // })

    // if (result.error) {
    //   console.log('[error]')
    // } else {
    //   console.log('success')
    // }
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            className="form-control"
            id="name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="email">E-mail:</label>
          <input
            className="form-control"
            id="email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="address">Address:</label>
          <input
            className="form-control"
            id="address"
            name="address"
            type="text"
            value={this.state.address}
            onChange={this.handleChange}
          />
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4'
                  }
                },
                invalid: {
                  color: '#9e2146'
                }
              }
            }}
          />
          <button
            type="submit"
            disabled={!this.props.stripe}
            className="btn btn-primary"
          >
            Pay
          </button>
          {this.state.completed ? (
            <div className="alert alert-primary" role="alert">
              Order Complete <Link to="/home">Return Home</Link>
            </div>
          ) : null}
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  checkout: order => dispatch(checkout(order))
})

export default connect(mapState, mapDispatch)(Checkout)
