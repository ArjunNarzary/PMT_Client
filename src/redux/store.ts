import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { serviceApi } from "./services"
import authReducer from "./slices/authUser"

const store = configureStore({
  reducer: {
    [serviceApi.reducerPath]: serviceApi.reducer,
    AUTHUSER: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      serviceApi.middleware
    ),
})

setupListeners(store.dispatch)

export default store
