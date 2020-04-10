import { combineReducers } from 'redux'

const currentKlassReducer = combineReducers({
  klass: currentKlass,
  grouping: currentGrouping,
  academics: showAcademics,
  behavior: showBehavior,
  studentsPage: showStudents,
  gearMenu: showGearMenu
})


function currentKlass(state = null, action) {
  switch(action.type) {
    case 'SET_CURRENT_KLASS':
      return {
        ...action.klass
      }

    case 'CLEAR_CURRENT_KLASS':
      return null

    default:
      return state;
  }
}

function currentGrouping(state = null, action) {
  switch(action.type) {
    case 'SET_CURRENT_GROUP':
      return action.group

    case 'CLEAR_CURRENT_KLASS':
      return null

    default:
      return state;
  }
}

function showAcademics(state = false, action) {
  switch(action.type) {
    case 'SHOW_ACADEMICS':
      return true

    case 'HIDE_ACADEMICS':
      return false

    default:
      return state;
  }
}

function showBehavior(state = false, action) {
  switch(action.type) {
    case 'SHOW_BEHAVIOR':
      return true

    case 'HIDE_BEHAVIOR':
      return false

    default:
      return state;
  }
}

function showStudents(state = false, action) {
  switch(action.type) {
    case 'SHOW_STUDENTS_PAGE':
      return true

    case 'HIDE_STUDENTS_PAGE':
      return false

    case 'CLEAR_CURRENT_KLASS':
      return false

    default:
      return state;
  }
}

function showGearMenu(state = false, action){
  switch(action.type) {
    case 'SHOW_GEAR_MENU':
      return true

    case 'HIDE_GEAR_MENU':
      return false 

    default:
      return state
  }
}

export default currentKlassReducer
