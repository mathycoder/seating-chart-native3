export function fetchKlasses(){
  return (dispatch) => {
    dispatch({ type: 'FETCH_KLASSES_REQUEST' })
     fetch(`/klasses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(klasses => {
        if (klasses.error){

        } else {
          dispatch({ type: 'FETCH_KLASSES', klasses })
        }
      })
      .catch(console.log)
  }
}

export function addKlass(klassData){
  return (dispatch) => {
    dispatch({type: 'START_ADDING_KLASS_REQUEST'})
    fetch('/klasses', {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(klassData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(klass => {
        if (klass.error){
          //dispatch({ type: 'ADD_FLASH_MESSAGE', message: klass.error })
        } else {
          dispatch({ type: 'ADD_KLASS', klass })
        }
      })
  }
}

export function updateKlass(klassData, klass){
  return (dispatch) => {
    dispatch({type: 'START_EDITING_KLASS_REQUEST'})
    fetch(`/klasses/${klass.id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(klassData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(klass => {
        if (klass.error){
          //dispatch({ type: 'ADD_FLASH_MESSAGE', message: klass.error })
        } else {
          dispatch({ type: 'EDIT_KLASS', klass })
        }
      })
  }
}

export function deleteKlass(klass){
  return (dispatch) => {
    dispatch({type: 'START_DELETING_KLASS_REQUEST'})
    fetch(`/klasses/${klass.id}`, {
      method: 'DELETE',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch({ type: 'DELETE_KLASS', klass })
      })
  }
}
