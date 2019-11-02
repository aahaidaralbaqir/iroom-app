import {api, headerOptions} from '../../api';

export const setIsLoading = (type,data) => {
  return  {
    type : type,
    payload : data
  }
}

export const fetchDataRoom = token => {
  return dispatch => {
    dispatch(setIsLoading('SET_IS_LOADING_ROOM',true))
    api
      .get('/rooms', headerOptions(token))
      .then(result => {
        let {data} = result;
        let newData = [...data,{ id : Date.now(), button : true }]
        dispatch(setIsLoading('SET_IS_LOADING_ROOM',false))
        dispatch({type: 'SET_ROOM', payload: newData});
      })
      .catch(error => {});
  };
};

export const fetchDataCostumer = token => {
  return dispatch => {
    dispatch(setIsLoading('SET_IS_LOADING_COSTUMER',true))
    api
      .get('/costumers', headerOptions(token))
      .then(result => {
        let {data} = result
        dispatch({type: 'SET_COSTUMER', payload: data})
        dispatch(setIsLoading('SET_IS_LOADING_COSTUMER',false))
      })
      .catch(error => {});
  };
};


export const fetchRoomBooked = token => {
  return dispatch => {
    dispatch(setIsLoading('SET_IS_LOADING_ROOM',true))
    api.get('/checkin', headerOptions(token)).then(result => {
      let {data} = result;
      dispatch({type: 'SET_ROOM_BOOKED', payload: data})
      dispatch(setIsLoading('SET_IS_LOADING_ROOM',false))
    });
  };
};


export const setCurUser = objUser => {
  return {
    type: 'SET_CURR_USER',
    payload: objUser,
  };
};
