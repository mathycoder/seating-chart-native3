import { combineReducers } from 'redux'

const seatsReducer = combineReducers({
  pairSeats: pairSeatsReducer,
  groupSeats: groupSeatsReducer
})

export default seatsReducer

function emptySeats(){
  const emptyObj = {}
  const myArray = [...Array(32).keys()]
  myArray.forEach(num => {
    emptyObj[`seat${num}`] = {}
  })
  return emptyObj
}

function pairSeatsReducer(state = {}, action) {
  switch(action.type) {
    case 'SET_SEAT_LOCATION':
      const { seatNumber, measurements } = action
      return {
        ...state,
        [`seat${seatNumber}`]: {
          x: measurements.screenX, y: measurements.screenY
        }
      }

    default:
      return emptySeats()
  }
}

function groupSeatsReducer(state = {}, action) {

  switch(action.type) {
    default:
      return emptySeats()
  }
}
