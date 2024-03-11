import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createRoot } from "react-dom/client";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import rootReducer from "./reducers";

const store = createStore(rootReducer);
const persistor = persistStore(store);

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
