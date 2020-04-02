import { combineReducers } from 'redux'

const seatsReducer = combineReducers({
  pairSeats: combineReducers({
    byId: pairSeatsById,
    allIds: pairSeatsAllIds
  }),
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

function pairSeatsById(state = emptySeats(), action) {
  switch(action.type) {
    case 'SET_SEAT_LOCATION':
      const { seatNumber, measurements } = action
      const { screenX, screenY, width, height } = measurements
      return {
        ...state,
        [`seat${seatNumber}`]: {
          topLeft: { x: screenX, y: screenY },
          topRight: { x: screenX + width, y: screenY },
          bottomLeft: { x: screenX, y: screenY + height },
          bottomRight: { x: screenX + width, y: screenY + height },
          center: { x: screenX + width/2, y: screenY + height/2 },
        }
      }

    default:
      return state
  }
}

function pairSeatsAllIds(state = emptySeats(), action) {
  switch(action.type) {

    default:
      return [...Array(32).keys()].map(num => `seat${num}`)
  }
}

function groupSeatsReducer(state = {}, action) {

  switch(action.type) {
    default:
      return state
  }
}
