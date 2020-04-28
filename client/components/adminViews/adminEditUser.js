import React from 'react'
import {connect} from 'react-redux'
import {editUser, fetchUsers} from '../../store/users'
import {fetchUser} from '../../store/user'

class EditAdmin extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   admin: this.props.user.isAdmin,
    // }
    this.toggleAdmin = this.toggleAdmin.bind(this)
  }
  // componentDidMount() {
  //   // this.props.loadUser(this.props.user.id)
  //   // this.setState({admin: this.props.user.isAdmin})
  // }

  async toggleAdmin() {
    try {
      // this.setState({admin: !this.props.user.isAdmin})
      // let isAdmin = this.state.admin
      const id = this.props.user.id
      const updatedUser = {
        id,
        isAdmin: !this.props.isAdmin
      }
      console.log('adminSTAT', updatedUser.isAdmin)
      await this.props.updateUser(updatedUser)
      // await this.props.loadUser(id)
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
    loadUsers: () => dispatch(fetchUsers()),
    loadUser: id => dispatch(fetchUser(id))
  }
}

export default connect(null, mapDispatch)(EditAdmin)
