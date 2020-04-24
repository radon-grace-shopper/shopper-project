import axios from 'axios'

const SET_ORDERS = 'SET_ORDERS'
const DELETE_ORDER = 'DELETE_ORDER'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

const setOrders = orders => ({
  type: SET_ORDERS,
  orders
})

const deleteOrderAction = (orderId, productId) => ({
  type: DELETE_ORDER,
  orderId,
  productId
})

const updateQuantityAction = orderProduct => ({
  type: UPDATE_QUANTITY,
  orderProduct
})

export const getOrders = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/user/${id}`)
      const [destructuredData] = data
      dispatch(setOrders(destructuredData))
    } catch (err) {
      console.log('ERROR GETTING ORDERS', err)
    }
  }
}

export const deleteOrder = (orderId, productId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orderProducts/${orderId}/${productId}`)
      dispatch(deleteOrderAction(orderId, productId))
    } catch (err) {
      console.log('ERROR DELETING ORDER', err)
    }
  }
}

export const updateQuantity = (orderProduct, quantity) => {
  // console.log(orderProduct, quantity)
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/orderProducts/${orderProduct.orderId}/${orderProduct.productId}`,
        {quantity: quantity}
      )
      // console.log(data)
      dispatch(updateQuantityAction(data))
    } catch (err) {
      console.log('ERROR UPDATING QUANTITY', err)
    }
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case SET_ORDERS:
      if (action.orders) {
        return action.orders
      } else {
        return {}
      }
    case DELETE_ORDER:
      // return state.map(order => {
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productId
        )
      }

    case UPDATE_QUANTITY:
      const testproducts = state.products.map(product => {
        if (product.id === action.orderProduct.productId) {
          return {
            ...product,
            orderProduct: action.orderProduct
          }
        } else {
          return product
        }
      })
      console.log(testproducts)
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.orderProduct.productId) {
            return {
              ...product,
              orderProduct: action.orderProduct
            }
          } else {
            return product
          }
        })
      }

    default:
      return state
  }
}
