import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button } from 'react-bootstrap'
import { fetchJokeData, updateJoke } from '../../actions'
import './App.css'
class Pure extends Component {
  componentDidMount () {
    this.props.fetchJoke()
  }
  render () {
    const { id, joke,
     statusUpdate = () => {},
     navigate = () => {} } = this.props
    return (
      <div className='App'>
        <header className='App-header'>
          <p className='App-title'>{joke}</p>
          <div className='App-button'>
            <Button
              data-qa='like'
              onClick={() => statusUpdate({ id, joke, status: 'Like' })}
            >
              Like
            </Button>
            <Button
              data-qa='unlike'
              onClick={() => statusUpdate({ id, joke, status: 'Unlike' })}
            >
              Unlike
            </Button>
            <Button data-qa='summary' onClick={() => navigate()}>
              Summary
            </Button>
            <Button
              data-qa='refresh'
              onClick={() => statusUpdate({ id, joke, status: 'New' })}
            >
              Refresh
            </Button>
          </div>
        </header>
      </div>
    )
  }
}

const state = ({ jokes }) => ({
  joke: jokes.joke,
  id: jokes.id
})

const dispatch = (dispatch) => ({
  fetchJoke: () => dispatch(fetchJokeData()),
  statusUpdate: ({ id, joke, status }) =>
    dispatch(updateJoke({ id, joke, status })),
  navigate: () => dispatch(push('/summary')),
})

Pure.propTypes = {
  joke: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fetchJoke: PropTypes.func,
  statusUpdate: PropTypes.func,
  navigate: PropTypes.func
}

export const LoginPage = connect(state, dispatch)(Pure)
