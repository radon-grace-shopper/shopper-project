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
      dispatch(setOrders(data))
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
  return async dispatch => {
    try {
      orderProduct.quantity = quantity
      console.log(orderProduct)
      await axios.put(
        `/api/orderProducts/${orderProduct.orderId}/${orderProduct.productId}`,
        orderProduct
      )
      dispatch(updateQuantityAction(orderProduct))
    } catch (err) {
      console.log('ERROR UPDATING QUANTITY', err)
    }
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    case DELETE_ORDER:
      return state.map(order => {
        if (order.id === action.orderId) {
          order.products = order.products.filter(
            product => product.id !== action.productId
          )
          console.log(order)
          return order
        } else {
          return order
        }
      })
    case UPDATE_QUANTITY:
      return state.map(order => {
        if (order.id === action.orderProduct.orderId) {
          order.products.map(product => {
            if (product.id === action.orders.orderProduct) {
              product.orderProduct.quantity = action.orderProduct.quantity
              return product
            } else {
              return product
            }
          })
        } else {
          return order
        }
      })
    default:
      return state
  }
}
