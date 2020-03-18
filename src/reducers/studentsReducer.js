import { combineReducers } from 'redux'

const studentsReducer = combineReducers({
  byId: studentsById,
  allIds: allStudents,
  loading: loading
})

export default studentsReducer

function studentsById(state = {}, action) {

  switch(action.type) {
    case 'FETCH_STUDENTS':
      return {
        ...normalizedObject(action.students)
      }

    case 'ADD_STUDENT':
      return {
        ...state, ...normalizedObject([action.student])
      }

    case 'START_EDITING_STUDENT':
      return {
        ...state,
        [`student${action.studentId}`]: action.studentData
      }

    case 'EDIT_STUDENT':
      return {
        ...state, ...normalizedObject([action.student])
      }

    case 'SWAP_STUDENTS_REQUEST':
      const { student1, student2, grouping } = action
      return {
        ...state, ...swapSeats(student1, student2, grouping)
      }

    case 'SWAP_STUDENTS':
      return {
        ...state, ...normalizedObject(action.students)
      }

    case 'NEW_SEAT_REQUEST':
      const editedStudent = action.student
      if (action.style == "pair"){
        editedStudent.seatPair = action.seat
      } else {
        editedStudent.seatGroup = action.seat
      }

      return {
        ...state,
        [`student${action.student.id}`]: editedStudent
      }

    case 'NEW_SEAT':
      return {
        ...state, ...normalizedObject([action.student])
      }

    case 'DELETE_STUDENT':
      const {[`student${action.student.id}`]: value, ...newState } = state
      return {
        ...newState
      }

    default:
      return state;
  }
}

function allStudents(state = [], action) {

  switch(action.type) {
    case 'FETCH_STUDENTS':
      return [ ...action.students.map(student => `student${student.id}`)]

    case 'ADD_STUDENT':
      return [...state, `student${action.student.id}`]

    case 'DELETE_STUDENT':
      return state.filter(stId => stId !== `student${action.student.id}`)

    default:
      return state;
  }
}

function loading(state = false, action){
  switch(action.type){
    case 'REQUEST_GENERATE':
      return true

    case 'FETCH_STUDENTS':
      return false

    default:
      return state
  }
}

function normalizedObject(students){
  const normalizedObj= {}
  students.forEach(student => {
    normalizedObj[`student${student.id}`] = {
      firstName: student.first_name,
      lastName: student.last_name,
      academicScore: student.academic_score,
      behaviorScore: student.behavior_score,
      id: student.id,
      seatGroup: student.seat_group,
      seatPair: student.seat_pair
    }
  })
  return normalizedObj
}

function swapSeats(student1, student2, grouping){
  const newObj = {}
  newObj[`student${student1.id}`] = {...student1}
  newObj[`student${student2.id}`] = {...student2}
  if (grouping === "pair"){
    newObj[`student${student1.id}`].seatPair = student2.seatPair
    newObj[`student${student2.id}`].seatPair = student1.seatPair
  } else {
    newObj[`student${student1.id}`].seatGroup = student2.seatGroup
    newObj[`student${student2.id}`].seatGroup = student1.seatGroup
  }
  return newObj
}
