
// import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import { previewApi } from "../services/reviewApi";
import { dashboardApi } from "../services/dashboardApi";
import { userApi } from "../services/userApi";
import reducers from "./reducers";
const sagaMiddleware = createSagaMiddleware();
// const persistConfig = {
//   key: "root",
//   storage: sessionStorage,
//   blacklist: [""],
// };
const middlewares = [sagaMiddleware];
// const rootReducer = combineReducers({
//   reducers,
// })

// // eslint-disable-next-line import/prefer-default-export
// export function configureStore(initialState) {
//   const store =   createStore(
//     rootReducer,
//     initialState,
//     compose(applyMiddleware(...middlewares))
//   )

//   // sagaMiddleware.run(sagas);

//   if (module.hot) {
//     module.hot.accept("./reducers", () => {
//       // eslint-disable-next-line global-require
//       const nextRootReducer = require("./reducers");
//       store.replaceReducer(nextRootReducer);
//     });
//   }

//   store.runSagaTask = () => {
//     store.sagaTask = sagaMiddleware.run(sagas);
//   };

//   store.runSagaTask();

//   return store;
// }

// initial states here
const initalState = {};

// creating store
// export const store = createStore(
//   reducers,
//   initalState,
//   compose(applyMiddleware(...middlewares))
//   // composeWithDevTools(applyMiddleware(...middlewares))
// );
// const persistedReducer = persistReducer(persistConfig, reducers);

export const createStore = (options) =>
  configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        previewApi.middleware,
        userApi.middleware,
        dashboardApi.middleware,
      ]),
    ...options,
  });
export const store = createStore();
// export let persistor = persistStore(store)
// persistStore
// assigning store to next wrapper    compose(applyMiddleware(...middlewares))

const makeStore = () => store;
// export const persistor = persistStore(store)
export const AppDispatch = store.dispatch
export const wrapper = createWrapper(makeStore);
