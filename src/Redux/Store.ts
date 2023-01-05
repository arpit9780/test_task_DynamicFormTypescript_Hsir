import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./Slice";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;
export type AppSelector = typeof store.dispatch;
