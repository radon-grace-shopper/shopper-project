import axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT'

const getProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

export const fetchProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getProduct(data))
    } catch (error) {
      console.log('Error retreiving single product', error)
    }
  }
}

const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default singleProductReducer
