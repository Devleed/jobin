import createDataContext from '../createDataContext';
import actions from './actions';
import reducer from './reducer';
import data from '../../data.json';

const INITIAL_STATE = {
  jobList: [],
  favourites: [],
  filters: [],
};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  INITIAL_STATE,
);
