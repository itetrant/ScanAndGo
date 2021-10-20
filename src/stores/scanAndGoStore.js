import { createStore } from 'redux';
import ScanAndGo from './reducers/scanAndGo';
const ScanAndGoStore = createStore(ScanAndGo);
export default ScanAndGoStore;