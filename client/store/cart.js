import axios from 'axios'

//ACTION TYPES
const SET_ORDERS = 'SET_ORDERS'

//STATE
const cart = []

//ACTION CREATOR
const setOrders = orders => ({
  type: SET_ORDERS,
  orders
})

//THUNK CREATOR
export const getOrders = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${id}`)
    dispatch(setOrders(data))
  } catch (err) {
    console.log('ERROR GETTING ORDERS', err)
  }
}

//REDUCER
export default function(state = cart, action) {
  switch (action) {
    case SET_ORDERS:
      return action.orders
    default:
      return state
  }
}
