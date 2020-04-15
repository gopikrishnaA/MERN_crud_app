import React, { Component } from 'react'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import { push } from 'react-router-redux'
import { Button, OverlayTrigger, Tooltip, Table } from 'react-bootstrap'
import Proptypes from 'prop-types'
import {
  deleteComment,
  deleteJoke,
  deleteSelectedJoke,
  fetchJokeData,
  getJokes,
  getComments,
  onSucessAction,
  updateComment,
} from '../../actions'
import CustomModal from '../../components/Modals/Modal'
import 'react-confirm-alert/src/react-confirm-alert.css'
import './summary.css'
import { getItems } from './selectedItemsFilter'
const deleteIcon = require('./delete.png')
const downArrow = require('./down.png')
const upArrow = require('./up.png')

class Pure extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isDeleteDisabled: true,
      isChecked: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSortTimeStamp = this.onSortTimeStamp.bind(this)
    this.selectHandler = this.selectHandler.bind(this)
    this.selectAllHandler = this.selectAllHandler.bind(this)
    this.onDeleteHandler = this.onDeleteHandler.bind(this)
  }

  componentDidMount () {
    this.props.getJokes()
  }

  handleChange (event) {
    const value = event.target.value
    this.props.onUpdateState({ selectedvalue: value })
  }

  onSortTimeStamp () {
    const { isSort, onUpdateState } = this.props
    onUpdateState({ isSort: !isSort })
  }

  onDeleteHandler () {
    const { items } = this.props
    const updatedItems = items
      .filter((item) => item.checked)
      .reduce((acc, item) => {
        acc.push(item.id)
        return acc
      }, [])
    this.props.deleteSelectedJoke(updatedItems)
    this.setState({
      isChecked: false,
      isDeleteDisabled: true,
    })
  }

  deleteJoke (id) {
    confirmAlert({
      title: 'Cofirm',
      message: 'Are you sure to delete.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => (id ? this.props.deleteJoke(id)
           : this.onDeleteHandler()),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    })
  }
  selectAllHandler (event) {
    const {
      target: { checked },
    } = event
    const { items, onUpdateState } = this.props
    const updatedItems = items.map((item) => ({
      ...item,
      checked,
    }))
    onUpdateState({ items: updatedItems })
    const updatedItemsLength =
      updatedItems.filter((item) => item.checked).length
    this.setState({
      isChecked: checked,
      isDeleteDisabled: updatedItemsLength === 0,
    })
  }

  selectHandler (event, id) {
    const {
      target: { checked },
    } = event
    const { items, onUpdateState } = this.props
    const updatedItems = items.map((item) => {
      const value = item.id === id ? checked : item.checked
      return { ...item, checked: value }
    })
    onUpdateState({ items: updatedItems })

    const updatedItemsLength =
      updatedItems.filter((item) => item.checked).length
    const isChecked = updatedItemsLength === items.length
    this.setState({
      isChecked,
      isDeleteDisabled: updatedItemsLength === 0,
    })
  }
  handleClose = () => {
    this.props.onUpdateState({
      isShow: false,
      selectedId: -1,
    })
  }
  handleOpen = (selectedId) => {
    this.props.getComments({
      isShow: true,
      selectedId,
    })
  }
  handleInput = (event) => {
    this.props.onUpdateState({
      commentText: event.target.value,
    })
  }

  render () {
    const { isChecked, isDeleteDisabled } = this.state
    const {
      comments,
      commentText,
      items,
      isShow,
      isSort,
      deleteComment,
      selectedId,
      navigate,
      navigateToHome,
      updateComment,
      selectedvalue
    } = this.props
    if (items.length === 0 && selectedvalue === 'All') {
      return (
        <div>
          <h2 className='header'>Summary</h2>
          <h6 className='header'>
            No Summary data to display go back to home and do actions on jokes
          </h6>
          <div className='buttonDiv'>
            <Button className='deleteBtn' onClick={() => navigateToHome()}>
              Home
            </Button>
          </div>
        </div>
      )
    }
    return (
      <>
        <CustomModal
          show={isShow}
          handleClose={this.handleClose}
          handleSave={() => updateComment({ selectedId, commentText })}
          handleModalOnChange={this.handleInput}
          commentText={commentText}
          comments={comments}
          deleteComment={deleteComment}
        />
        <h2 className='header'>Summary</h2>
        <div className='buttonDiv'>
          <Button
            variant={isDeleteDisabled ? 'secondary' : 'success'}
            className={isDeleteDisabled ? 'deleteBtnDisabled' : 'deleteBtn'}
            disabled={isDeleteDisabled}
            onClick={() => this.deleteJoke()}
          >
            Delete
          </Button>
        </div>
        <Table responsive className='summery-table'>
          <thead>
            <tr>
              <th className='th1'>S.no</th>
              <th className='th2'>JokeId</th>
              <th className='th3'>Joke</th>
              <th className='th4'>
                <select value={selectedvalue} onChange={this.handleChange}>
                  <option value='New'>New</option>
                  <option value='Like'>Like</option>
                  <option value='Unlike'>Unlike</option>
                  <option value='All'>All</option>
                </select>
              </th>
              <th className='th5' onClick={this.onSortTimeStamp}>
                TimeStamp
                <img className='arrow-icon'
                  src={isSort ? upArrow : downArrow} alt='' />
              </th>
              <th className='th6'>Delete</th>
              <th className='th7'>
                <input
                  type='checkbox'
                  checked={isChecked}
                  onChange={this.selectAllHandler}
                  id='deleteAll'
                  name='deleteAll'
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              return (
                <tr data-qa={`tr${item.id}`} key={item.id}>
                  <td>{i + 1}</td>
                  <td className='td1' onClick={() => navigate(item.id)}>
                    {item.id}
                  </td>
                  <td onClick={() => this.handleOpen(item.id)}>
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Tooltip id='tooltip-top'>
                          See comments on clicking here ...
                        </Tooltip>
                      }
                    >
                      <span className='joke_text'>{item.joke}</span>
                    </OverlayTrigger>
                  </td>
                  <td>{item.status}</td>
                  <td>{item.createDate}</td>
                  <td>
                    <img
                      className='del_img'
                      src={deleteIcon}
                      alt=''
                      onClick={() => this.deleteJoke(item.id)}
                    />
                  </td>
                  <td>
                    <input
                      type='checkbox'
                      name='deleteItem'
                      checked={item.checked || false}
                      onChange={(e) => this.selectHandler(e, item.id)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </>
    )
  }
}

const mapStateToProps = ({ jokes }) => ({
  commentText: jokes.commentText,
  items: getItems(jokes),
  isShow: jokes.isShow,
  isSort: jokes.isSort,
  comments: jokes.comments,
  selectedId: jokes.selectedId,
  selectedvalue: jokes.selectedvalue,
})

const mapDispatchToProps = (dispatch) => ({
  deleteComment: (payload) => dispatch(deleteComment(payload)),
  deleteJoke: (payload) => dispatch(deleteJoke(payload)),
  deleteSelectedJoke: (payload) => dispatch(deleteSelectedJoke(payload)),
  getComments: (payload) => dispatch(getComments(payload)),
  getJokes: () => dispatch(getJokes()),
  navigate: (payload) => dispatch(fetchJokeData(payload)),
  navigateToHome: () => dispatch(push('/login')),
  onUpdateState: (payload) => dispatch(onSucessAction(payload)),
  updateComment: (payload) => dispatch(updateComment(payload)),
})

Pure.propTypes = {
  isShow: Proptypes.bool,
  isSort: Proptypes.bool,
  comments: Proptypes.array,
  commentText: Proptypes.string,
  selectedId: Proptypes.number,
  deleteComment: Proptypes.func,
  deleteJoke: Proptypes.func,
  deleteSelectedJoke: Proptypes.func,
  getComments: Proptypes.func,
  getJokes: Proptypes.func,
  items: Proptypes.array,
  navigate: Proptypes.func,
  navigateToHome: Proptypes.func,
  onUpdateState: Proptypes.func,
  selectedvalue: Proptypes.string,
  updateComment: Proptypes.func
}

export const Summary = connect(mapStateToProps, mapDispatchToProps)(Pure)
