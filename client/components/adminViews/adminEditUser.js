import React from 'react'
import {connect} from 'react-redux'
import {editUser, fetchUsers} from '../../store/users'

class EditAdmin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      admin: this.props.user.isAdmin
    }
    this.toggleAdmin = this.toggleAdmin.bind(this)
  }

  async toggleAdmin(event) {
    try {
      let isAdmin = this.state.admin
      console.log('current state', isAdmin)
      console.log('Target', event.target.name)
      console.log('Value', event.target.value)
      isAdmin = !isAdmin
      console.log('new admin status', isAdmin)
      const id = this.props.user.id
      const updatedUser = {
        id,
        isAdmin
      }
      await this.props.updateUser(updatedUser)
      await this.props.loadUsers()
    } catch (error) {
      console.log('Error updating user', error)
    }
  }
  render() {
    const {user} = this.props
    return (
      <form>
        {user.isAdmin ? <div>true</div> : <div>false</div>}
        <button
          name="isAdmin"
          type="button"
          value={user.id}
          onClick={this.toggleAdmin}
        >
          Toggle
        </button>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: user => dispatch(editUser(user)),
    loadUsers: () => dispatch(fetchUsers())
  }
}

export default connect(null, mapDispatch)(EditAdmin)
