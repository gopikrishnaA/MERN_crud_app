import React, { Component } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'

import './sequence.css'

class Pure extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      numberArray: []
    }
    this.onChangeListener = this.onChangeListener.bind(this)
    this.update = this.update.bind(this)
  }

  onChangeListener (event) {
    this.setState({
      value: event.target.value
    })
  }

  update () {
    const numberSeries = this.state.value.split(',')
    if (numberSeries.length > 1) {
      let numberArray = []
      let num = parseInt(numberSeries[0])
      numberSeries.shift()
      for (let i = 1; i < 10; i++) {
        if (numberSeries.includes((num*i).toString())) {
          numberArray.push(num*i)
        } else {
          numberArray.push(0)
        }
      }
      this.setState({
        numberArray
      })
    }
  }
  render () {
    return (
      <>
        <div className='App-button'>
          <input style={{ width: '330px' }}
            type="text" value={this.state.value}
            placeholder='enter sequence of nos'
            onChange={this.onChangeListener} />
          <Button onClick={this.update}> Update </Button>
        </div>
        <Container style={{ width: '300px' }}>
          <Row md={5}>
            {this.state.numberArray.map((num, index) =>
              <Col key={index}
                className={num > 0 ? 'col' : 'no_col'}>
                  {num > 0 ? num : ''}</Col>)}
          </Row>
        </Container>
      </>
    )
  }
}

Pure.propTypes = {
}
export default Pure
