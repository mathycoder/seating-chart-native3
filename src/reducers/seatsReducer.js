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

    case 'SET_SEAT_LOCATIONS':
      const { screenWidth, screenHeight, grouping } = action
      console.log(grouping)
      const newLocations = grouping === 'Pairs'
        ? setPairSeatLocations({...state}, screenWidth, screenHeight)
        : setGroupSeatLocations({...state}, screenWidth, screenHeight)
      return {
        ...state, ...newLocations
      }

    default:
      return state
  }
}

function setPairSeatLocations(stateCopy, screenWidth, screenHeight){
  const deskWidth = 65
  const deskHeight = 52
  const paddingHorizontal = 20
  const paddingVertical = 15

  const marginHorizontal = (screenWidth - deskWidth*8 - paddingHorizontal) / 8  // 47
  const marginVertical = (screenHeight - deskHeight*4 - paddingVertical) / 5

  for (let key in stateCopy){
    const seat = parseInt(key.split("seat")[1])
    const row = Math.floor(seat / 8)
    const col = seat % 8

    const relMarHor = 10 + marginHorizontal
                                + Math.floor(col / 2) * marginHorizontal*2
                                + col * deskWidth
    const relMarTop = -10 + marginVertical
                                + row * marginVertical
                                + row * deskHeight

    stateCopy[key].topLeft = { x: relMarHor, y: relMarTop }
    stateCopy[key].topRight = { x: relMarHor + deskWidth, y: relMarTop }
    stateCopy[key].bottomLeft = { x: relMarHor, y: relMarTop + deskHeight }
    stateCopy[key].bottomRight = { x: relMarHor + deskWidth, y: relMarTop + deskHeight }
    stateCopy[key].center = { x: relMarHor + deskWidth/2, y: relMarTop + deskHeight/2 }
  }
  return stateCopy
}

function setGroupSeatLocations(stateCopy, screenWidth, screenHeight){
  const deskWidth = 65
  const deskHeight = 52
  const paddingHorizontal = 20
  const paddingVertical = 15

  const marginHorizontal = (screenWidth - deskWidth*8 - paddingHorizontal) / 8  // 47
  const marginVertical = (screenHeight - deskHeight*4 - paddingVertical) / 4

  for (let key in stateCopy){
    const seat = parseInt(key.split("seat")[1])
    const row = Math.floor(seat / 8)
    const col = seat % 8

    const relMarHor = 10 + marginHorizontal
                                + Math.floor(col / 2) * marginHorizontal*2
                                + col * deskWidth
    const relMarTop = marginVertical
                                + row * marginVertical
                                + row * deskHeight

    stateCopy[key].topLeft = { x: relMarHor, y: relMarTop }
    stateCopy[key].topRight = { x: relMarHor + deskWidth, y: relMarTop }
    stateCopy[key].bottomLeft = { x: relMarHor, y: relMarTop + deskHeight }
    stateCopy[key].bottomRight = { x: relMarHor + deskWidth, y: relMarTop + deskHeight }
    stateCopy[key].center = { x: relMarHor + deskWidth/2, y: relMarTop + deskHeight/2 }
  }
  return stateCopy
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
