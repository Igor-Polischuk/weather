import { configureStore } from '@reduxjs/toolkit'
import { locationSlice } from './slices/locationSlice'
import { weatherSlice } from './slices/weatherSlice'

export const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
    weather: weatherSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState> 