import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')

const App = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Navbar />
        <Routes />
      </Elements>
    </div>
  )
}

export default App
