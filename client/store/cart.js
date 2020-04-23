import axios from 'axios'

const SET_ORDERS = 'SET_ORDERS'
const DELETE_ORDER = 'DELETE_ORDER'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

const setOrders = orders => ({
  type: SET_ORDERS,
  orders
})

const deleteOrderAction = id => ({
  type: DELETE_ORDER,
  id
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

//change to delete route
export const deleteOrder = order => {
  return async dispatch => {
    try {
      order.status = 'completed'
      await axios.put(`/api/orders/${order.id}`, order)
      dispatch(deleteOrderAction(order.id))
    } catch (err) {
      console.log('ERROR DELETING ORDER', err)
    }
  }
}

export const updateQuantity = (orderProduct, quantity) => {
  console.log(orderProduct, quantity)
  return async dispatch => {
    try {
      await axios.put(
        `/api/orderProducts/${orderProduct.orderId}/${orderProduct.productId}`,
        {quantity: quantity}
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
      return state.filter(order => order.id !== action.id)
    case UPDATE_QUANTITY:
      // return state.map(order => {
      //   console.log('where do we go now')
      //   if (order.id === action.orderProduct.orderId) {
      //     order.products.map(product => {
      //       if (product.id === action.orderProduct.productId) {
      //         console.log('product id = action product id')
      //         product.orderProduct.quantity = action.orderProduct.quantity
      //         console.log(product)
      //         return product
      //       } else {
      //         console.log('else gang')
      //         return product
      //       }
      //     })
      //   } else {
      //     console.log('ultra else gang')
      //     return order
      //   }
      // })
      // console.log(state[0])
      // const [product] = state[0].products.filter(el => el.id = action.orderProduct.productId)
      // console.log(product)
      // product.quantity = action.orderProduct.quantity
      return [...state]
    default:
      return state
  }
}
