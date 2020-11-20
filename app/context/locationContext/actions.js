const setLocation = (state, dispatch) => (location) => {
  dispatch({ type: 'set_location', payload: location });
};

export default { setLocation };
