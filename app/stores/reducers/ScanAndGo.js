import {UP,DOWN,REMOVE,CLEAR,SWITCHSITE,SCANNED} from '../actions';

const initialState = {
    site:10010,
    barcode:'',
    TotItem:0,
    TotQty:0,
    TotAmount:0,
    items:[]
};

function ScanAndGo(state = initialState,
    action) {
    switch (action.type) {

        case UP:
            //do something
            //reture
            const existingItem = state.items.filter(p => p.V_ARTNO === action.id);

            if (existingItem.length > 0) {
                //console.log(existingItem[0].Qty);
                return {
                    ...state, TotQty: state.TotQty + action.qty, TotAmount: state.TotAmount + (action.qty * action.price),
                    items: [...state.items.filter(p => p.V_ARTNO !== action.id),
                    { V_ARTNO: action.id, V_ALIBL: action.name, V_PRICE_PERM: action.price, V_MMUN_UNIT: action.unit, IMGURL: action.imgurl, Qty: existingItem[0].Qty + action.qty, Amt: existingItem[0].Amt + action.qty * action.price }]

                };
            } else {
                //console.log('New item');
                return {
                    ...state, TotItem: state.TotItem + 1, TotQty: state.TotQty + action.qty, TotAmount: state.TotAmount + (action.qty * action.price),
                    items: [...state.items,
                    { V_ARTNO: action.id, V_ALIBL: action.name, V_PRICE_PERM: action.price, V_MMUN_UNIT: action.unit, IMGURL: action.imgurl, Qty: action.qty, Amt: action.qty * action.price }]

                };
            }
        case DOWN:
            //do something
            //reture
            const existingItem1 = state.items.filter(p => p.V_ARTNO === action.id);

            if (existingItem1.length > 0 && existingItem1[0].Qty > 1) {
                //console.log(existingItem1[0].Qty);
                return {
                    ...state, TotQty: state.TotQty - action.qty, TotAmount: state.TotAmount - (action.qty * action.price),
                    items: [...state.items.filter(p => p.V_ARTNO !== action.id),
                    { V_ARTNO: action.id, V_ALIBL: action.name, V_PRICE_PERM: action.price, V_MMUN_UNIT: action.unit, IMGURL: action.imgurl, Qty: existingItem1[0].Qty - action.qty, Amt: existingItem1[0].Amt - action.qty * action.price }]

                };
            } else {
                return state;
            }
        case REMOVE:
            //console.log(state.TotItem > 0? state.TotItem - 1 : 0);
            const existingItem2 = state.items.filter(p => p.V_ARTNO === action.id);
            return {
                ...state, TotItem: state.TotItem - 1, TotQty: state.TotQty - existingItem2[0].Qty, TotAmount: state.TotAmount - (existingItem2[0].Qty * existingItem2[0].V_PRICE_PERM),
                items: [...state.items.filter(p => p.V_ARTNO !== action.id)]
            };
        case CLEAR:
            // console.log(state.TotItem > 0? state.TotItem - 1 : 0);
            return {
                ...state,
                TotItem: 0,
                TotQty: 0,
                TotAmount: 0,
                items: [],
            };
        case SWITCHSITE:
            // console.log(state.TotItem > 0? state.TotItem - 1 : 0);
            return {
                ...state,
                site: action.site !== 'undefined' ? action.site : state.site,
                TotItem: 0,
                TotQty: 0,
                TotAmount: 0,
                items: [],
            };
        case SCANNED:
            // console.log(state.TotItem > 0? state.TotItem - 1 : 0);
            return {
                ...state,
                barcode: action.ean !== 'undefined' ? action.ean : state.barcode,
            };
        default: return state;
    }
}
export default ScanAndGo;
