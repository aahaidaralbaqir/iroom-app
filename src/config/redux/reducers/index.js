import { combineReducers } from 'redux'
import auth from './authReducer'
import room from './roomReducer'
import costumer from './costumerReducer'

export default rootReducer = combineReducers({
    auth : auth,
    costumer : costumer,
    room : room,
})
