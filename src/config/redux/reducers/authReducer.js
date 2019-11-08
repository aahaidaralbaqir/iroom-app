let initialState = {
  isLoading : false,
  isLogin : false,
  currUser  : {}
}

export default (state = initialState , action) => {
  switch (action.type) {
    case 'SET_CURR_USER' :
        return {
          ...state,
          isLogin : true,
          currUser : action.payload
        }
    case 'SET_IS_LOADING' :
        return {
          ...state,
          isLoading : action.payload
        }
    default:
      return state
  }
}
