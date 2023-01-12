import { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MyApp from "./pages/_app";
import { configureStore } from "./redux/store";
import reportWebVitals from "./reportWebVitals";

const Main = () => {
  return (
    <Provider store={configureStore()}>
      <Suspense fallback={<div className="loading" />}>
        <MyApp />
      </Suspense>
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
