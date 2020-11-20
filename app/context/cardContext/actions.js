import firestore from '@react-native-firebase/firestore';

const loadCards = (state, dispatch) => async (opts, cb) => {
  // load cards
  try {
    const { docs } = await firestore()
      .collection('Jobs')
      .orderBy('id', 'asc')
      .startAt(opts.startId)
      .limit(opts.limit)
      .get();

    dispatch({ type: 'add_job', payload: docs.map((doc) => doc.data()) });
  } catch (error) {
    console.log(error);
  } finally {
    if (cb) cb();
  }
};

const deleteCard = (state, dispatch) => (id) => {
  // delete card
  dispatch({ type: 'delete_job', payload: id });
};

const addToFavourites = (state, dispatch) => (item) => {
  // add to fdafvourite
  dispatch({ type: 'add_to_favourite', payload: item });
};

const removeFromFavourites = (state, dispatch) => (id) => {
  // add to fdafvourite
  dispatch({ type: 'remove_from_favourite', payload: id });
};

const setFilters = (state, dispatch) => (filters) => {
  dispatch({ type: 'set_filters', payload: filters });
};

export default {
  loadCards,
  deleteCard,
  addToFavourites,
  removeFromFavourites,
  setFilters,
};
