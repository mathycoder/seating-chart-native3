import { combineReducers } from 'redux'

const klassesReducer = combineReducers({
  byId: klassesById,
  allIds: allKlasses
})

export default klassesReducer

function klassesById(state = {}, action) {

  switch(action.type) {

    case 'FETCH_KLASSES':
      return {
        ...normalizedObject(action.klasses)
      }

    case 'ADD_KLASS':
      return {
        ...state,
        [`klass${action.klass.id}`]: action.klass
      }

    case 'EDIT_KLASS':
      return {
        ...state,
        [`klass${action.klass.id}`]: action.klass
      }

    case 'DELETE_KLASS':
      const deleteKlassId = `klass${action.klass.id}`
      const { [deleteKlassId]: value, ...withoutKlass } = state
      return { ...withoutKlass }

    default:
      return state;
  }
}

function allKlasses(state = [], action) {

  switch(action.type) {
    case 'FETCH_KLASSES':
      return [
        ...action.klasses.map(klass => `klass${klass.id}`)
      ]

    case 'ADD_KLASS':
      return [
        ...state, `klass${action.klass.id}`
      ]

    case 'DELETE_KLASS':
      const deleteKlassId = `klass${action.klass.id}`
        return [...state.filter(id => id !== deleteKlassId)]

    default:
      return state;
  }
}

function normalizedObject(klasses){
  const normalizedObj= {}
  klasses.forEach(klass => {
    normalizedObj[`klass${klass.id}`] = klass
  })
  return normalizedObj
}
