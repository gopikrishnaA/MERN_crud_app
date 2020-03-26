import React, { Component } from 'react'
import { connect } from 'react-redux'
import spinner from './spinner.gif'
import './loading.css'

export class Pure extends Component {
  render () {
    const {
      isLoading
    } = this.props
    return (
      isLoading && <div className='loading-container' >
        <img src={spinner} alt='loader'/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.loading.loading
})

export default connect(mapStateToProps)(Pure)
