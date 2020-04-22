import axios from 'axios'

const SET_ORDERS = 'SET_ORDERS'
const DELETE_ORDER = 'DELETE_ORDER'

const setOrders = orders => ({
  type: SET_ORDERS,
  orders
})

const deleteOrderAction = id => ({
  type: DELETE_ORDER,
  id
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

//change to delete route
export const deleteOrder = id => {
  return async dispatch => {
    try {
      await axios.put(`/api/orders/${id}`)
      dispatch(deleteOrderAction(id))
    } catch (err) {
      console.log('ERROR DELETING ORDER', err)
    }
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    case DELETE_ORDER:
      return state.filter(order => order.id !== action.id)
    default:
      return state
  }
}
