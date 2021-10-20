import { createStore,combineReducers} from 'redux';
import { subspace } from 'redux-subspace';

import OtherStore from './reducers/otherStore';
import ScanAndGo from './reducers/scanAndGo';
const reducer = combineReducers({
    OtherStore,
    ScanAndGo
});

const Stores = createStore(reducer);
const App1Store = subspace((state) => state.ScanAndGo)(Stores);
const App2Store = subspace((state) => state.OtherStore)(Stores);

export { App1Store, App2Store} ;
export default Stores;