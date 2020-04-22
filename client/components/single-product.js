import React from 'react'
import {connect} from 'react-redux'

class singleProduct extends React.Component {
  // constructor(){
  //   super()
  // }

  render() {
    return <div>This is a single product page</div>
  }
}

export default connect()(singleProduct)
