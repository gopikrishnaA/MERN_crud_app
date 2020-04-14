import { createSelector } from 'reselect'

const existingItems = state => state.items
const selectedvalue = state => state.selectedvalue
const isSort = state => state.isSort

export const getItems = createSelector([existingItems, selectedvalue, isSort],
    (items, value, isSort) => {
        let updatedItems =
            items.filter((item) => {
                return value === 'All' ?
                item : item.status === value
            }).sort((a, b) => {
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
              })
        return updatedItems
    })
