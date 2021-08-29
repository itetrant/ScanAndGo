
const cartItems = (state={value:0,
    items:[{
        ARCCODE: "376268",
        ARTNO: "376268",
        ALIBL: "QUAN D.PHUC JEAN DAI NAM-S30",
        VRATE: 10,
        PRICE_PERM: 341000,
        MMUN_WEIGHT: 1,
        MMUN_UNIT: "CAI",
        QTY: 1
        }]},
        action) => {
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
