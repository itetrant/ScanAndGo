import { createStore } from 'redux';
import ScanAndGo from './reducers/ScanAndGo';
const ScanAndGoStore = createStore(ScanAndGo);
export default ScanAndGoStore;