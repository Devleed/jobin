import createDataContext from '../createDataContext';
import actions from './actions';
import reducer from './reducer';

const INITIAL_STATE = {
  location: {
    latitude: 49,
    longitude: -125.109268,
  },
  errors: [],
};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  INITIAL_STATE,
);
