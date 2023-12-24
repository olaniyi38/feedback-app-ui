import { configureStore, combineReducers } from "@reduxjs/toolkit";
import feedbacksSlice from "./feedbacks/feedbacksSlice";
import userSlice from "./user/userSlice";
import logger from 'redux-logger'


const rootReducer = combineReducers({
    feedbacks: feedbacksSlice,
    currentUser: userSlice
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production"
});


export default store 

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch