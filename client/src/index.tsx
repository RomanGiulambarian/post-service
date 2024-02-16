import ReactDOM from "react-dom/client";
import App from "./app";
import "./assets/scss/index.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Service from "./services";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const services = new Service();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
