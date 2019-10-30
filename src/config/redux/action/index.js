import {api, headerOptions} from '../../api';

export const fetchDataRoom = token => {
  return dispatch => {
    api
      .get('/rooms', headerOptions(token))
      .then(result => {
        let {data} = result;
        let newData = [...data,{ id : Date.now(), button : true }]
        dispatch({type: 'SET_ROOM', payload: newData});
      })
      .catch(error => {});
  };
};

export const fetchDataCostumer = token => {
  return dispatch => {
    api
      .get('/costumers', headerOptions(token))
      .then(result => {
        let {data} = result;
        dispatch({type: 'SET_COSTUMER', payload: data});
      })
      .catch(error => {});
  };
};

export const fetchRoomBooked = token => {
  return dispatch => {
    api.get('/checkin', headerOptions(token)).then(result => {
      let {data} = result;
      dispatch({type: 'SET_ROOM_BOOKED', payload: data});
    });
  };
};


export const setCurUser = objUser => {
  return {
    type: 'SET_CURR_USER',
    payload: objUser,
  };
};
