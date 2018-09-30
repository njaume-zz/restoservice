import {ORDER_ETA, ORDER_ISLOADING, ORDER_POSTSUCCESS} from '../actionstypes'
import {postOrder} from '../api'

export const orderIsLoading = (loading) => ({
    type: ORDER_ISLOADING,
    payload: {
      isLoading: loading
    }
  })
  
export const postOrderSuccess = (success) => ({
    type: ORDER_POSTSUCCESS,
    payload: {
        postOrderSuccess: success
    }
  })

  export const setEta = (eta) => ({
    type: ORDER_ETA,
    payload: {
      eta: eta
    }
  })


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