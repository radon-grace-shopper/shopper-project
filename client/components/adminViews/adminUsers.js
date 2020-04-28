import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers} from '../../store/users'

class adminUsers extends React.Component {
  componentDidMount() {
    this.props.loadUsers()
  }
  render() {
    console.log('PROPS', this.props)
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
                  <th colSpan="3">Users</th>
                </tr>
                <tr>
                  <th>Id</th>
                  <th>Email</th>
                  <th>isAdmin</th>
                  {/* <th>Delete</th> */}
                </tr>
              </thead>
              <tbody>
                {this.props.users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? <p>true</p> : <p>false</p>}</td>
                      {/* <td>
                        <button
                          type="button"
                          value={user.id}
                          onClick={this.deleteUser}
                        >
                          Delete
                        </button>
                      </td> */}
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
    loadUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(adminUsers)
