export default (state, { type, payload }) => {
  switch (type) {
    case 'set_location':
      return { ...state, location: payload };
    default:
      return state;
  }
};
