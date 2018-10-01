import {ORDER_ISLOADING, ORDER_POSTSUCCESS, ORDER_ETA, ORDER_INIT} from '../actionstypes'

const initialState = {
  isLoading: false,
  postSuccess: false,
  eta: ''
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ISLOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
      case ORDER_POSTSUCCESS:
      return {
        ...state,
        postSuccess: action.payload.postSuccess
      }
      case ORDER_ETA:
      return {
        ...state,
        eta: {...action.payload.eta}
      }
      case ORDER_INIT:
      return initialState
    default:
      return state
  }
}

export default orderReducer;
