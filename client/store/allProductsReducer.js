import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const deleteProduct = productId => {
  return {type: DELETE_PRODUCT, productId}
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

export const removeProduct = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deleteProduct(productId))
    } catch (err) {
      console.log('error deleting product', err)
    }
  }
}

export default function allProductsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case DELETE_PRODUCT:
      const newProducts = state.filter(pdt => {
        return pdt.id !== action.productId
      })
      return [...newProducts]
    default:
      return state
  }
}
