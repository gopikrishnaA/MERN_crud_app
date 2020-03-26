import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ConnectedRouter as Router } from 'connected-react-router'
import { history } from './store'

import Loading from './components/Loading'
import { LoginPage } from './routes/Login'
import { Summary } from './routes/Summary'
import { JokeDetails } from './routes/JokeDetails'
import 'bootstrap/dist/css/bootstrap.min.css';

export default () => {
  return (
    <Router history={history}>
      <>
        <Loading />
          <Route path='/' render={() => (<Redirect to='/login' />)} />
          <Route path='/login' component={LoginPage} />
          <Route path='/summary' component={Summary} />
          <Route path='/joke/:id' component={JokeDetails} />
      </>
    </Router>
  )
}
