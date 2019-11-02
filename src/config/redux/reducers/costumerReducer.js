let initialState = {
    isLoading : false,
    costumer : []
  }

  export default (state = initialState , action) => {
    switch (action.type) {
      case 'SET_COSTUMER' :
          return {
            ...state,
            costumer : action.payload
          }
        break;

      case 'SET_IS_LOADING_COSTUMER' :
          return {
            ...state,
            isLoading : action.payload
          }
      default:
        return state
    }
  }
