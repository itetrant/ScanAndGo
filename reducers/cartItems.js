
const cartItems = (state={value:0,
    items:[{
        V_ARCCODE: "376268",
        V_ARTNO: "376268",
        V_ALIBL: "QUAN D.PHUC JEAN DAI NAM-S30",
        V_VRATE: 10,
        V_PRICE_PERM: 341000,
        V_MMUN_WEIGHT: 1,
        V_MMUN_UNIT: "CAI",
        QTY: 1
        },
        {
            V_ARCCODE: "376266",
            V_ARTNO: "376266",
            V_ALIBL: "QUAN D.PHUC JEAN DAI NAM-S36",
            V_VRATE: 10,
            V_PRICE_PERM: 666000,
            V_MMUN_WEIGHT: 1,
            V_MMUN_UNIT: "CAI",
            QTY: 2
            }
        ]},
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
