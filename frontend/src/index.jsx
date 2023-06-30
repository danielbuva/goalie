import { ColorProvider } from "./components/ColorProvider.jsx";
import { ModalProvider } from "./components/Modal/index.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";

import * as sessionActions from "./store/session";
import configureStore from "./store";

import App from "./App.jsx";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ColorProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ColorProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
