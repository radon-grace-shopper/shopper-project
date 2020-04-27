import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardElement} from '@stripe/react-stripe-js'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      address: ''
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

    const {stripe, elements} = this.props

    console.log(stripe)

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
      paymentMethod: {
        card: elements.getElement(CardElement),
        billingDetails: {
          name: 'Jenny Rosen'
        }
      }
    })

    if (result.error) {
      console.log('[error]', result.error.message)
    } else {
      console.log('success')
    }
  }

  render() {
    console.log(this.props.stripe)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="address">Address:</label>
          <input
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
          <button type="submit" disabled={!this.props.stripe}>
            Pay
          </button>
        </form>
      </div>
    )
  }
}

export default connect(null, null)(Checkout)
