import {LIST_ISLOADING, LIST_FETCHSUCCESS, LIST_SELECTRESTAURANT} from '../actionstypes'

const initialState = {
  isLoading: false,
  restaurants: [],
  selectedRestaurant: {}
}

const listViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ISLOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
      case LIST_FETCHSUCCESS:
      return {
        ...state,
        restaurants: [...action.payload.restaurants]
      }
      case LIST_SELECTRESTAURANT:
      return {
        ...state,
        selectedRestaurant: {...action.payload.selectedRestaurant}
      }
    default:
      return state
  }
}

export default listViewReducer;
