import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import currentUserReducer from './reducers/currentUserReducer.js'
import currentKlassReducer from './reducers/currentKlassReducer.js'
import klassesReducer from './reducers/klassesReducer.js'
import studentsReducer from './reducers/studentsReducer.js'
import flashReducer from './reducers/flashReducer.js'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  currentKlass: currentKlassReducer,
  klasses: klassesReducer,
  students: studentsReducer,
  flashMessage: flashReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

export default store
