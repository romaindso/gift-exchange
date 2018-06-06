import { createStore } from "redux";
import reducer from "./reducers/index";
import App from "./views/App";
import "./app.scss";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log(store.getState());

const app = new App(store);
document.addEventListener("DOMContentLoaded", function() {
  app.render();
});
