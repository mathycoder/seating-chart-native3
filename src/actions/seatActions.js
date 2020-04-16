export function setSeatLocation(seatNumber, measurements){
  return {type: 'SET_SEAT_LOCATION', seatNumber, measurements}
}

export function setSeatLocations(screenWidth, screenHeight, grouping){
  return {type: 'SET_SEAT_LOCATIONS', screenWidth, screenHeight, grouping}
}
