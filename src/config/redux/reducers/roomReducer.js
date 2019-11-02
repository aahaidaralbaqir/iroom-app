let initialState = {
  isLoading: false,
  room: [],
  roomIsBooked: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROOM':
      return {
        ...state,
        room: action.payload,
      };
    case 'SET_ROOM_BOOKED':
      return {
        ...state,
        roomIsBooked: action.payload,
      };
    case 'SET_IS_LOADING_ROOM':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
