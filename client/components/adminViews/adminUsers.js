import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers, removeUser} from '../../store/users'
import AdminEditUser from './adminEditUser'

class adminUsers extends React.Component {
  constructor() {
    super()
    this.deleteUser = this.deleteUser.bind(this)
  }
  componentDidMount() {
    this.props.loadUsers()
  }

  async deleteUser(event) {
    const userId = event.target.value
    console.log('delete was clicked on user', userId)
    try {
      await this.props.deleteUser(userId)
      await this.props.loadUsers()
    } catch (err) {
      console.log('Error deleting user', err)
    }
  }

  render() {
    // console.log('PROPS', this.props)
    return (
      <div>
        {this.props.user.isAdmin === false ? (
          <h3>NOT AUTHORIZED</h3>
        ) : (
          <div>
            <Link to="/admin">Back </Link>
            <table className="adminUsers">
              <thead>
                <tr>
                  <th colSpan="4">Users</th>
                </tr>
                <tr>
                  <th>Id</th>
                  <th>Email</th>
                  <th>isAdmin</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.props.users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>
                        <AdminEditUser key={user.id} user={user} />
                      </td>
                      <td>
                        <button
                          type="button"
                          value={user.id}
                          onClick={this.deleteUser}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    loadUsers: () => dispatch(fetchUsers()),
    deleteUser: id => dispatch(removeUser(id))
  }
}

export default connect(mapState, mapDispatch)(adminUsers)
