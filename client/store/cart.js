import axios from 'axios'

const SET_ORDERS = 'SET_ORDERS'
const DELETE_ORDER = 'DELETE_ORDER'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const COMPLETE_ORDER = 'COMPLETE_ORDER'

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

export const getSessionOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/session`)
      const [destructuredData] = data
      dispatch(setOrders(destructuredData))
    } catch (err) {
      console.log('ERROR GETTING SESSION ORDERS', err)
    }
  }
}
const completeOrder = order => ({
  type: COMPLETE_ORDER,
  order
})

export async function formatData(sessionVal, userOrderVal) {
  const {data} = await axios.get(`/api/orderProducts/${sessionVal}`)
  const sendUpdate = {orderId: userOrderVal}
  const resTwo = await axios.put(`/api/orderProducts/${sessionVal}`, sendUpdate)

  await axios.put(`/api/orders/${sessionVal}`, {status: 'completed'})
}

export const getOrders = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/orders/user/${id}`)
      const {data} = res
      const [destructuredData] = data
      dispatch(setOrders(destructuredData))
    } catch (err) {
      console.log('ERROR GETTING ORDERS', err)
    }
  }
}

export const checkout = order => {
  return async dispatch => {
    try {
      await axios.put(`/api/orders/${order.id}`, order)
      order.products.forEach(async product => {
        await axios.put(`/api/products/${product.id}`, product)
      })
      dispatch(completeOrder(order))
    } catch (err) {
      console.log('ERROR CHECKING OUT', err)
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
      const {data} = await axios.put(
        `/api/orderProducts/${orderProduct.orderId}/${orderProduct.productId}`,
        {quantity: quantity}
      )
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
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productId
        )
      }

    case UPDATE_QUANTITY:
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
    case COMPLETE_ORDER:
      return action.order

    default:
      return state
  }
}
