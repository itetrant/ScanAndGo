
const defaultState = { value: 0, highlight: false };
const Reducer = (state = defaultState, action) => {
  if (action.type === 'UP') return { value: state.value + 1, highlight: state.highlight };
  if (action.type === 'DOWN') return { value: state.value - 1, highlight: state.highlight };
  if (action.type === 'CHANGE_COLOR') return { value: state.value, highlight: !state.highlight }
  return state;
};
export default Reducer;