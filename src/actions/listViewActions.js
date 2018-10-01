import {LIST_FETCHSUCCESS, LIST_ISLOADING, LIST_SELECTRESTAURANT, LIST_INIT} from '../actionstypes'
import {getRestaurants} from '../api'

export const listViewIsLoading = (loading) => ({
    type: LIST_ISLOADING,
    payload: {
      isLoading: loading
    }
  })
  
export const fetchRestaurantsSucccess = (restaurants) => ({
    type: LIST_FETCHSUCCESS,
    payload: {
        restaurants: restaurants
    }
  })

  export const selectRestaurant = (selectedRestaurant) => ({
    type: LIST_SELECTRESTAURANT,
    payload: {
        selectedRestaurant: selectedRestaurant
    }
  })

  export const listInitialState = () => ({
    type: LIST_INIT,
    payload: {
       
    }
  })

export function fetchRestaurants() {
    return async (dispatch) => {
      try {
        dispatch(listViewIsLoading(true));
        const response = await getRestaurants()
        dispatch(fetchRestaurantsSucccess(response));
        dispatch(listViewIsLoading(false));  
      } catch (error) {
        console.error(error);
        dispatch(listViewIsLoading(false));
      }
    }
  }