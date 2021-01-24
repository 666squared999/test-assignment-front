import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createRootStore } from './store/utils/createRootStore';
import { StoreProvider } from './store/utils/storeContext';

const rootStore = createRootStore()

ReactDOM.render(
  <StoreProvider value={rootStore}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
