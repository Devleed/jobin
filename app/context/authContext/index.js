import createDataContext from '../createDataContext';
import actions from './actions';
import reducer from './reducer';

const INITIAL_STATE = {
  user: null,
  loggedIn: null,
  errors: {},
};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  INITIAL_STATE,
);
