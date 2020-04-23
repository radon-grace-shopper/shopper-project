import React from 'react'
import {connect} from 'react-redux'

const addToCart = () => {
  return (
    <form>
      <button type="button">Add To Cart</button>
    </form>
  )
}

export default connect()(addToCart)
