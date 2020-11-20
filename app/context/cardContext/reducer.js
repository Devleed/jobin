export default (state, { type, payload }) => {
  switch (type) {
    case 'add_job':
      return { ...state, jobList: [...state.jobList, ...payload] };
    case 'delete_job':
      return {
        ...state,
        jobList: state.jobList.filter((job) => job.id !== payload),
      };
    case 'add_to_favourite':
      return {
        ...state,
        favourites: [...state.favourites, payload],
      };
    case 'remove_from_favourite':
      return {
        ...state,
        favourites: state.favourites.filter(
          (favourite) => favourite.id !== payload,
        ),
      };
    case 'set_filters':
      return {
        ...state,
        filters: ((filters, payload) => {
          /**
           * [{"type": "oneOfWord", "value": "js"}, {"type": "oneOfWord", "value": ["js"]}]
           */

          const combinedFilters = [...filters, ...payload];
          const output = [];

          combinedFilters.forEach((filter) => {
            const existing = output.findIndex(
              (item) => item.type === filter.type,
            );

            if (existing !== -1) {
              output[existing].value = [
                ...new Set(output[existing].value.concat(filter.value)),
              ];
            } else {
              output.push(filter);
            }
          });

          return output;
        })(state.filters, payload),
      };
    default:
      return state;
  }
};
