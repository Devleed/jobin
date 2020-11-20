export default (state, { type, payload }) => {
  switch (type) {
    case 'sign_up':
    case 'sign_in':
    case 'set_user':
      return { loggedIn: true, user: payload, errors: {} };
    case 'sign_out':
      return { ...state, loggedIn: false, user: null };
    case 'set_error':
      return {
        ...state,
        errors: {
          ...state.errors,
          [payload.key]: state.errors[payload.key]
            ? [...state.errors[payload.key], payload.message]
            : [payload.message],
        },
      };
    case 'clear_error':
      delete state.errors[payload];
      return {
        ...state,
      };
    default:
      return state;
  }
};
