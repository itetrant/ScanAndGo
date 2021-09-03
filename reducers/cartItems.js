
const cartItems = (state={site:10010,TotItem:0,TotQty:0,TotAmount:0,
    items:[
    //     {
    //    // V_ARCCODE: "376268",
    //     V_ARTNO: "376268",
    //     V_ALIBL: "QUAN D.PHUC JEAN DAI NAM-S30",
    //    // V_VRATE: 10,
    //     V_PRICE_PERM: 341000,
    //     //V_MMUN_WEIGHT: 1,
    //     V_MMUN_UNIT: "CAI",
    //     //V_ROW:1,
    //     Qty: 1,
    //     Amt: 341000    
    //     },
    //     {
    //        // V_ARCCODE: "376266",
    //         V_ARTNO: "376266",
    //         V_ALIBL: "QUAN D.PHUC JEAN DAI NAM-S36",
    //        // V_VRATE: 10,
    //         V_PRICE_PERM: 666000,
    //        // V_MMUN_WEIGHT: 1,
    //         V_MMUN_UNIT: "CAI",
    //        // V_ROW:2,
    //         Qty: 2,
    //         Amt: 666000
    //         }
        ]
    },
        action) => {
            switch(action.type) {
                
                case 'UP':
                    //do something
                    //reture

                    const existingItem = state.items.filter(p => p.V_ARTNO === action.id); 
                    
                    if (existingItem.length > 0 ) {
                        //console.log(existingItem[0].Qty);
                    return { ...state, TotQty: state.TotQty + action.qty ,TotAmount:  state.TotAmount + (action.qty*action.price),
                        items: [ ...state.items.filter(p => p.V_ARTNO !== action.id), 
                            { V_ARTNO:action.id, V_ALIBL:action.name, V_PRICE_PERM:action.price, V_MMUN_UNIT:action.unit,Qty:existingItem[0].Qty+action.qty,Amt:existingItem[0].Amt + action.qty*action.price} ] 
                    
                     };
                    } else {
                        //console.log('New item');
                        return { TotItem: state.TotItem + 1, TotQty:  state.TotQty + action.qty ,TotAmount:  state.TotAmount + (action.qty*action.price),
                            items: [ ...state.items, 
                            { V_ARTNO:action.id, V_ALIBL:action.name, V_PRICE_PERM:action.price, V_MMUN_UNIT:action.unit,Qty:action.qty,Amt:action.qty*action.price} ] 
                        
                         };
                    }
                case 'DOWN':
                    //do something
                    //reture

                    const existingItem1 = state.items.filter(p => p.V_ARTNO === action.id); 
                    
                    if (existingItem1.length > 0 ) {
                        //console.log(existingItem1[0].Qty);
                    return { ...state,  TotQty:  state.TotQty - action.qty ,TotAmount:  state.TotAmount - (action.qty*action.price),
                        items: [ ...state.items.filter(p => p.V_ARTNO !== action.id), 
                        { V_ARTNO:action.id, V_ALIBL:action.name, V_PRICE_PERM:action.price, V_MMUN_UNIT:action.unit,Qty:existingItem1[0].Qty-action.qty, Amt:existingItem1[0].Amt - action.qty*action.price} ] 
                    
                        };
                    }else{
                        return state 
                    }
                case 'REMOVE':
                    //console.log(state.TotItem > 0? state.TotItem - 1 : 0);
                    const existingItem2 = state.items.filter(p => p.V_ARTNO === action.id);
                    return { TotItem: state.TotItem - 1, TotQty:  state.TotQty - existingItem2[0].Qty ,TotAmount:  state.TotAmount - (existingItem2[0].Qty*existingItem2[0].V_PRICE_PERM),
                        items: [ ...state.items.filter(p => p.V_ARTNO !== action.id)] 
                     };
                case 'CLEAR':
                    // console.log(state.TotItem > 0? state.TotItem - 1 : 0);
                   
                    return {
                        ...state,
                        TotItem: 0,
                        TotQty: 0,
                        TotAmount:0,
                        items: [],
                    }    
                default: return state         
            }

            
}
export default cartItems;
