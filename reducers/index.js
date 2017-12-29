import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import JobsReducer from './JobsReducer'

export default combineReducers({
  auth: AuthReducer,
  jobs: JobsReducer,
})
