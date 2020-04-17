import { combineReducers } from 'redux'

const gearMenuReducer = combineReducers({
  gearMenu: showGearMenu,
  groupSize: toggleSize,
  groupType: toggleType,
  groupBy: toggleBy
})

export default gearMenuReducer

function showGearMenu(state = null, action) {
  switch(action.type) {

    default:
      return state;
  }
}

function toggleSize(state = 4, action) {
  switch(action.type) {

    case 'SET_GROUP_SIZE':
      return action.groupSize

    default:
      return state;
  }
}

function toggleType(state = 'Heterogenous', action) {
  switch(action.type) {

    case 'SET_GROUP_TYPE':
      return action.groupType

    default:
      return state;
  }
}

function toggleBy(state = 'Academics', action) {
  switch(action.type) {

    case 'SET_GROUP_BY':
      return action.groupBy

    default:
      return state;
  }
}
