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
const deleteIcon = require('./delete.png')
const downArrow = require('./down.png')
const upArrow = require('./up.png')

class Pure extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      items: this.props.existingItems,
      isSort: false,
      isDeleteEnabled: true,
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

  // To do:: update latest life cycle methods
  componentWillReceiveProps (nextProps) {
    if (
      JSON.stringify(nextProps.existingItems) !==
      JSON.stringify(this.props.existingItems)
    ) {
      this.setState({ items: nextProps.existingItems })
    }
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (JSON.stringify(nextProps.items) !==
  // JSON.stringify(prevState.items)) {
  //     return { items: nextProps.items };
  //   }
  //   return null;
  // }
  componentDidUpdate (prevProps) {
    const { isCommentUpload, onSuccessComment } = this.props
    if (prevProps.isCommentUpload !== isCommentUpload) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ commentText: '' })
      onSuccessComment({ isCommentUpload: false })
    }
  }

  handleChange (event) {
    const value = event.target.value
    const totalItems = this.props.existingItems
    this.setState({
      value,
      items:
        value === 'All' ? totalItems :
         totalItems.filter((item) => item.status === value),
    })
  }

  onSortTimeStamp () {
    const totalItems = this.state.items
    const isSort = !this.state.isSort
    this.setState({
      isSort,
      items: totalItems.sort((a, b) => {
        return isSort
          ? a.createDate < b.createDate
            ? -1
            : a.createDate > b.createDate
            ? 1
            : 0
          : a.createDate > b.createDate
          ? -1
          : a.createDate < b.createDate
          ? 1
          : 0
      }),
    })
  }

  onDeleteHandler () {
    const updatedItems = this.state.items
      .filter((item) => item.checked)
      .reduce((acc, item) => {
        acc.push(item.id)
        return acc
      }, [])
    this.props.deleteSelectedJoke(updatedItems)
    const { items } = this.state
    this.setState({
      items,
      isChecked: false,
      isDeleteEnabled: true,
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
    const items = this.state.items.map((item) => ({
      ...item,
      checked,
    }))
    const updatedItemsLength = items.filter((item) => item.checked).length
    this.setState({
      isChecked: checked,
      items,
      isDeleteEnabled: updatedItemsLength === 0,
    })
  }

  selectHandler (event, id) {
    const {
      target: { checked },
    } = event
    const { items } = this.state
    const updateItems = items.map((item) => {
      const value = item.id === id ? checked : item.checked
      return { ...item, checked: value }
    })

    const updatedItemsLength = updateItems.filter((item) => item.checked).length
    const isChecked = updatedItemsLength === items.length
    this.setState({
      items: updateItems,
      isChecked,
      isDeleteEnabled: updatedItemsLength === 0,
    })
  }
  handleClose = () => {
    this.props.onSuccessComment({
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
    this.setState({
      commentText: event.target.value,
    })
  }

  render () {
    const { commentText, isChecked,
       isDeleteEnabled, isSort, items, value } = this.state
    const {
      comments,
      existingItems,
      isShow,
      deleteComment,
      selectedId,
      navigate,
      navigateToHome,
      updateComment,
    } = this.props
    if (existingItems.length === 0) {
      return [
        <h2 className='header'>Summary</h2>,
        <h6 className='header'>
          No Summary data to display go back to home and do actions on jokes
        </h6>,
        <div className='buttonDiv'>
          <Button className='deleteBtn' onClick={() => navigateToHome()}>
            Home
          </Button>
        </div>,
      ]
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
            variant={isDeleteEnabled ? 'secondary' : 'success'}
            className={isDeleteEnabled ? 'deleteBtnDisabled' : 'deleteBtn'}
            disabled={isDeleteEnabled}
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
                <select value={value} onChange={this.handleChange}>
                  <option value='' selected disabled hidden>
                    Filter By
                  </option>
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
                  onClick={this.selectAllHandler}
                  id='deleteAll'
                  name='deleteAll'
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              return (
                <tr data-qa={`tr${item.id}`} key={i}>
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
                      id={item.id}
                      name='deleteAll'
                      value={item.id}
                      checked={item.checked}
                      onClick={(e) => this.selectHandler(e, item.id)}
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
  existingItems: jokes.items,
  isCommentUpload: jokes.isCommentUpload,
  isShow: jokes.isShow,
  comments: jokes.comments,
  selectedId: jokes.selectedId,
})

const mapDispatchToProps = (dispatch) => ({
  deleteComment: (payload) => dispatch(deleteComment(payload)),
  deleteJoke: (payload) => dispatch(deleteJoke(payload)),
  deleteSelectedJoke: (payload) => dispatch(deleteSelectedJoke(payload)),
  getComments: (payload) => dispatch(getComments(payload)),
  getJokes: () => dispatch(getJokes()),
  navigate: (payload) => dispatch(fetchJokeData(payload)),
  navigateToHome: () => dispatch(push('/login')),
  onSuccessComment: (payload) => dispatch(onSucessAction(payload)),
  updateComment: (payload) => dispatch(updateComment(payload)),
})

Pure.propTypes = {
  isCommentUpload: Proptypes.bool,
  isShow: Proptypes.bool,
  comments: Proptypes.array,
  selectedId: Proptypes.string,
  deleteComment: Proptypes.func,
  deleteJoke: Proptypes.func,
  deleteSelectedJoke: Proptypes.func,
  existingItems: Proptypes.array,
  getComments: Proptypes.func,
  getJokes: () => Proptypes.func,
  navigate: Proptypes.func,
  navigateToHome: Proptypes.func,
  onSuccessComment: Proptypes.func,
  updateComment: Proptypes.func
}

export const Summary = connect(mapStateToProps, mapDispatchToProps)(Pure)
