import { combineReducers } from 'redux'
import listViewReducer from './listViewReducer';

const restoServiceAppReducer = combineReducers({
    listView: listViewReducer
})

export default restoServiceAppReducer;
