import axios from 'axios'

const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'

const getUsers = users => {
  return {
    type: GET_USERS,
    users
  }
}

const deleteUser = userId => {
  return {
    type: DELETE_USER,
    userId
  }
}

const updateUser = user => {
  return {
    type: UPDATE_USER,
    user
  }
}

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getUsers(data))
    } catch (err) {
      console.log('error retreiving users', err)
    }
  }
}

export const removeUser = userId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${userId}`)
      dispatch(deleteUser(userId))
    } catch (err) {
      console.log('error removing user', err)
    }
  }
}

export const editUser = user => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${user.id}`, user)
      dispatch(updateUser(data))
    } catch (err) {
      console.log('error editing user', err)
    }
  }
}

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case UPDATE_USER:
      const updatedUsers = state.filter(user => {
        return user.id !== action.user.id
      })
      return [...updatedUsers, action.user]
    case DELETE_USER:
      const otherUsers = state.filter(user => {
        return user.id !== action.userId
      })
      return [...otherUsers]
    default:
      return state
  }
}
