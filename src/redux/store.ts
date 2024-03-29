import { configureStore } from "@reduxjs/toolkit";
import outputReducer from "./outputState.ts";

const store = configureStore({
  reducer: {
    outputState: outputReducer,
  },
});

export default store

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
