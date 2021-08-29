
const cartItems = (state={value:0,highlight:false},action) => {
    switch(action.type) {
        case 'UP':
            //do something
            //reture
            console.log(state.value);
            return { value: state.value + 1 };
        case 'DOWN':
            //
            return { value: state.value - 1 };
        case 'REMOVE':
            //
            return { value: 0 }          
    }
    return state
}
export default cartItems;
