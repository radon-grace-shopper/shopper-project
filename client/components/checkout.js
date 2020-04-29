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
      completed: false,
      outOfStock: [],
      error: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.cart.products) {
      this.props.cart.products.forEach(product => {
        if (product.inventory === 0) {
          this.setState(prevState => ({
            outOfStock: [...prevState.outOfStock, product]
          }))
        }
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  async handleSubmit() {
    event.preventDefault()

    const {stripe, elements} = this.props

    if (!stripe || !elements || this.state.completed) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    this.props.checkout(this.props.cart)

    var response = await axios.get('/secret')

    const result = await stripe.confirmCardPayment(
      response.data.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: this.state.name,
            address: this.state.address,
            email: this.state.email
          }
        }
      }
    )

    if (result.error) {
      this.setState({error: true})
      console.log('[error]')
    } else {
      this.setState({completed: true})
      this.props.cart.status = 'completed'
      this.props.cart.products.map(product => {
        product.inventory -= product.orderProduct.quantity
        return product
      })
      this.setState({completed: true})
    }
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
            disabled={
              !this.props.stripe ||
              this.props.cart.products === undefined ||
              this.state.outOfStock.length
            }
            className="btn btn-primary"
          >
            Pay
          </button>

          {this.state.error ? (
            <a className="alert alert-primary" role="alert">
              Your payment was not accepted
            </a>
          ) : null}

          {this.state.outOfStock.length ? (
            <div>
              {this.state.outOfStock.map(product => (
                <a
                  key={product.id}
                  className="alert alert-primary"
                  role="alert"
                >
                  {product.name} is out of stock please edit your cart and try
                  again.
                </a>
              ))}
            </div>
          ) : null}

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
