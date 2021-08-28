
const cartItems = (state={value:0,highlight:false},action) => {
    switch(action.type) {
        case 'UP':
            //do something
            //reture
            return { value: state.value + 1, highlight: state.highlight };
        case 'DOWN':
            //
            return { value: state.value - 1, highlight: state.highlight };
        case 'CHANGE_COLOR':
            //
            return { value: state.value, highlight: !state.highlight }          
    }
    return state
}
export default cartItems;
