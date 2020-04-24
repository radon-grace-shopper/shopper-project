import {ElementsConsumer} from '@stripe/react-stripe-js'
import React from 'react'
import Checkout from './checkout'

const CheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({elements, stripe}) => <Checkout elements={elements} stripe={stripe} />}
    </ElementsConsumer>
  )
}

export default CheckoutForm
