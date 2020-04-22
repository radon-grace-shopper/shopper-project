import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCT'

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (err) {
      console.log('error retrieving products', err)
    }
  }
}

export default function allProductsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
