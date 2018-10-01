import {ORDER_ETA, ORDER_ISLOADING, ORDER_POSTSUCCESS, ORDER_INIT} from '../actionstypes'
import {postOrder} from '../api'
import {listInitialState} from './listViewActions'
export const orderIsLoading = (loading) => ({
    type: ORDER_ISLOADING,
    payload: {
      isLoading: loading
    }
  })
  
export const postOrderSuccess = (success) => ({
    type: ORDER_POSTSUCCESS,
    payload: {
      postSuccess: success
    }
  })

  export const setEta = (eta) => ({
    type: ORDER_ETA,
    payload: {
      eta: eta
    }
  })

  export const init = () => ({
    type: ORDER_INIT,
    payload: {
      
    }
  })

  export function initialState(order) {
    return (dispatch) => {
      dispatch(init())
      dispatch(listInitialState())
      }}

export function postOrderForm(order) {
    return async (dispatch) => {
      try {
        dispatch(orderIsLoading(true));
        const response = await postOrder(order)
        dispatch(postOrderSuccess(true));
        dispatch(orderIsLoading(false));  
      } catch (error) {
        console.error(error);
        dispatch(orderIsLoading(false));
        dispatch(postOrderSuccess(false));

      }
    }
  }