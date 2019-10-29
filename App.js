import React from 'react';
import Routes from './src/config/routes'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store,persistor } from './src/config/redux/store'

function App () {
   return (
     <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
     </Provider>
   )
}

export default App;

console.disableYellowBox = true