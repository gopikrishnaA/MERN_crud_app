import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import spinner from './spinner.gif'
import './loading.css'

class Pure extends Component {
  render () {
    const { isLoading } = this.props
    return (
      isLoading && (
        <div className='loading-container'>
          <img src={spinner} alt='loader' />
        </div>
      )
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.loading.loading,
})

Pure.propTypes = {
  isLoading: PropTypes.bool
}
export default connect(mapStateToProps)(Pure)
