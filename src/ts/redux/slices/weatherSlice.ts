import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { WeatherNowI, ForecastI, WeatherInTimeI } from '../../weatherAPI/weather.interface'
import { getCurrentWeather, getForecast } from '../../weatherAPI/weather'
import { parseWeather } from '../../weatherAPI/parseWeather'


interface WeatherSliceI {
  current: null | WeatherNowI
  forecast: null | WeatherInTimeI[][]
}

const initialState: WeatherSliceI = {
  current: null,
  forecast: null
}

export const fetchCurrentWeather = createAsyncThunk(
  'location/fetchCurrentWeather',
  getCurrentWeather
)

export const fetchForecast = createAsyncThunk(
  'location/fetchForecast',
  getForecast
)

export const weatherSlice = createSlice({
  name: 'weather',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentWeather.pending, (state) => {
      showLoader()
    })
    builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
      state.current = action.payload
      hideLoader()

    })
    builder.addCase(fetchCurrentWeather.rejected, (state, action) => {
      document.querySelector<HTMLDivElement>('.error').style.display = 'flex'
      hideLoader()
    })
    builder.addCase(fetchForecast.pending, (state, action) => {
      showLoader()
    })
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      const forecast = parseWeather(action.payload.list)

      state.forecast = forecast
      hideLoader()

    })
    builder.addCase(fetchForecast.rejected, (state, action) => {
      document.querySelector<HTMLDivElement>('.error').style.display = 'flex'

      hideLoader()
    })
  }
})

function showLoader() {
  const loader = document.querySelector<HTMLDivElement>('.loader')
  loader.style.display = 'block'
}

function hideLoader() {
  const loader = document.querySelector<HTMLDivElement>('.loader')
  loader.style.display = 'none'
}

export default weatherSlice.reducer