import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, CartView, CheckoutForm} from './components'
import {me} from './store'
import singleProduct from './components/single-product'
import allProducts from './components/all-products'
import AdminDash from './components/adminViews/adminDash'
import AdminProducts from './components/adminViews/adminProducts'
import EditProduct from './components/adminViews/adminEditProduct'
import AddProduct from './components/adminViews/adminAddProduct'
import AdminUsers from './components/adminViews/adminUsers'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/products/:productId" component={singleProduct} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={CartView} />
        <Route path="/products" component={allProducts} />
        <Route path="/checkout" component={CheckoutForm} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/admin/products" component={AdminProducts} />
            <Route
              path="/admin/products/edit/:productId"
              component={EditProduct}
            />
            <Route path="/admin/products/add" component={AddProduct} />
            <Route path="/admin/users" component={AdminUsers} />
            <Route path="/admin" component={AdminDash} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
