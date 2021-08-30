
const cartItems = (state={value:0,
    items:[{
       // V_ARCCODE: "376268",
        V_ARTNO: "376268",
        V_ALIBL: "QUAN D.PHUC JEAN DAI NAM-S30",
       // V_VRATE: 10,
        V_PRICE_PERM: 341000,
        //V_MMUN_WEIGHT: 1,
        V_MMUN_UNIT: "CAI",
        //V_ROW:1,
        Qty: 1
        },
        {
           // V_ARCCODE: "376266",
            V_ARTNO: "376266",
            V_ALIBL: "QUAN D.PHUC JEAN DAI NAM-S36",
           // V_VRATE: 10,
            V_PRICE_PERM: 666000,
           // V_MMUN_WEIGHT: 1,
            V_MMUN_UNIT: "CAI",
           // V_ROW:2,
            Qty: 2
            }
        ]},
        action) => {
            switch(action.type) {
                case 'UP':
                    //do something
                    //reture
                    console.log(state.value+1);
                    console.log(state.items);    
                    return { value: state.value + 1, items: [ ...state.items.filter(p => p.V_ARTNO !== action.id), 
                        {  V_ARTNO:action.id, V_ALIBL:action.name, V_PRICE_PERM:action.price, V_MMUN_UNIT:action.unit,Qty:1} ] 
                    
                     };

                   //return { ...state, value: state.value + 1 };
                case 'DOWN':
                    //
                    console.log(state.value > 0? state.value - 1 : 0);
                    return { ...state, value: state.value > 0? state.value - 1 : 0};
                case 'REMOVE':
                    //
                    console.log(state.value > 0? state.value - 1 : 0);
                    return { ...state, value: state.value > 0? state.value - 1 : 0 };          
            }

            return state
}
export default cartItems;
