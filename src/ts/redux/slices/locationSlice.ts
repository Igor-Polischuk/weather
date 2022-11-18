import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getUserLocation } from '../../location/location'
import { CurrentLocation } from '../../location/location.interface'

// Define a type for the slice state
interface LocationState {
  city: string
  lat: number
  lon: number
}

// Define the initial state using that type
const initialState: LocationState = {
  city: '',
  lat: 0,
  lon: 0
}

export const fetchPosition = createAsyncThunk(
  'location/fetchLocation',
  getUserLocation
)

export const locationSlice = createSlice({
  name: 'location',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<CurrentLocation>) => {
      state.city = action.payload.city
      state.lat = action.payload.lat
      state.lon = action.payload.lon
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosition.pending, (state, action) => {

    })
    builder.addCase(fetchPosition.fulfilled, (state, action) => {
      state.city = action.payload.city
      state.lat = action.payload.lat
      state.lon = action.payload.lon
    })
    builder.addCase(fetchPosition.rejected, (state, action) => {

    })
  }
})

export const { setLocation } = locationSlice.actions

export default locationSlice.reducer