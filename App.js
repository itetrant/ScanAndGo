
import * as React from 'react';
import { Provider } from 'react-redux';
import Navigation from './app/navigation';

import ScanAndGoStore from './app/stores/ScanAndGoStore';
//import Stores from './app/stores/stores';

export default function App() {
  return (
          <Provider store={ScanAndGoStore}>
                <Navigation/>
         </Provider>
  );
}

