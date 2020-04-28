import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const deleteProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    productId
  }
}

const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
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

export const postProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/products`, product)
      dispatch(addProduct(data))
    } catch (err) {
      console.log('error adding new product', err)
    }
  }
}

export const modifyProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${product.id}`, product)
      dispatch(updateProduct(data))
    } catch (err) {
      console.log('error updating product', err)
    }
  }
}

export default function allProductsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case UPDATE_PRODUCT:
      const updatedProducts = state.filter(pdt => {
        return pdt.id !== action.product.id
      })
      return [...updatedProducts, action.product]
    case DELETE_PRODUCT:
      const newProducts = state.filter(pdt => {
        return pdt.id !== action.productId
      })
      return [...newProducts]
    default:
      return state
  }
}
