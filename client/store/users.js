import axios from 'axios'

const GET_USERS = 'GET_USERS'

const getUsers = users => {
  return {
    type: GET_USERS,
    users
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

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
