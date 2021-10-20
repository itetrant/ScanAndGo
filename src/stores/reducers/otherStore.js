
const initialState = {
    siteId:10011,
    barcode:'',
    totItem:0,
    totQty:0,
    totAmount:0,
    myItems:[]
};

function OtherStore (state = initialState,
    action) {
    switch (action.type) {

        case 'INCREASE':
            //do something
            //reture
            const existingItem = state.myItems.filter(p => p.V_ARTNO === action.id);

            if (existingItem.length > 0) {
                //console.log(existingItem[0].Qty);
                return {
                    ...state, totQty: state.totQty + action.qty, totAmount: state.totAmount + (action.qty * action.price),
                    myItems: [...state.myItems.filter(p => p.V_ARTNO !== action.id),
                    { V_ARTNO: action.id, V_ALIBL: action.name, V_PRICE_PERM: action.price, V_MMUN_UNIT: action.unit, IMGURL: action.imgurl, Qty: existingItem[0].Qty + action.qty, Amt: existingItem[0].Amt + action.qty * action.price }]

                };
            } else {
                //console.log('New item');
                return {
                    ...state, totItem: state.totItem + 1, totQty: state.totQty + action.qty, totAmount: state.totAmount + (action.qty * action.price),
                    myItems: [...state.myItems,
                    { V_ARTNO: action.id, V_ALIBL: action.name, V_PRICE_PERM: action.price, V_MMUN_UNIT: action.unit, IMGURL: action.imgurl, Qty: action.qty, Amt: action.qty * action.price }]

                };
            }
        case 'DECREASE':
            //do something
            //reture
            const existingItem1 = state.myItems.filter(p => p.V_ARTNO === action.id);

            if (existingItem1.length > 0 && existingItem1[0].Qty > 1) {
                //console.log(existingItem1[0].Qty);
                return {
                    ...state, totQty: state.totQty - action.qty, totAmount: state.totAmount - (action.qty * action.price),
                    myItems: [...state.myItems.filter(p => p.V_ARTNO !== action.id),
                    { V_ARTNO: action.id, V_ALIBL: action.name, V_PRICE_PERM: action.price, V_MMUN_UNIT: action.unit, IMGURL: action.imgurl, Qty: existingItem1[0].Qty - action.qty, Amt: existingItem1[0].Amt - action.qty * action.price }]

                };
            } else {
                return state;
            }
        case 'DELETE':
            //console.log(state.totItem > 0? state.totItem - 1 : 0);
            const existingItem2 = state.myItems.filter(p => p.V_ARTNO === action.id);
            return {
                ...state, totItem: state.totItem - 1, totQty: state.totQty - existingItem2[0].Qty, totAmount: state.totAmount - (existingItem2[0].Qty * existingItem2[0].V_PRICE_PERM),
                myItems: [...state.myItems.filter(p => p.V_ARTNO !== action.id)]
            };
        case 'EMPTY':
            // console.log(state.totItem > 0? state.totItem - 1 : 0);
            return {
                ...state,
                totItem: 0,
                totQty: 0,
                totAmount: 0,
                myItems: [],
            };
        case 'SITECHANGE':
            console.log("MY STORE SITE CHANGED FROM " + state.siteId + " TO " + action.siteId);
            return {
                ...state,
                siteId: action.site !== 'undefined' ? action.site : state.siteId,
                totItem: 0,
                totQty: 0,
                totAmount: 0,
                myItems: [],
            };
        case 'SCANNED':
            // console.log(state.totItem > 0? state.totItem - 1 : 0);
            return {
                ...state,
                barcode: action.ean !== 'undefined' ? action.ean : state.barcode,
            };
        default: return state;
    }
}
export default OtherStore;
