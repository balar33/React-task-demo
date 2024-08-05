import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/reducers/user";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const combinedReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

const persistConfig = {
  key: "rootValues",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
