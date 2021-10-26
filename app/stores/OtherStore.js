import { createStore } from 'redux';
import OtherStore from './reducers/otherStore';
const MyStore = createStore(OtherStore);
export default MyStore;