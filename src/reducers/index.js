import { combineReducers } from 'redux'
import listViewReducer from './listViewReducer';
import orderReducer from './orderReducer';

const restoServiceAppReducer = combineReducers({
    listView: listViewReducer,
    order: orderReducer
})

export default restoServiceAppReducer;
