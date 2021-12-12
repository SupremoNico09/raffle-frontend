import { configureStore } from '@reduxjs/toolkit'
import rouletteReducer from './roulette'

export default configureStore({
  reducer: {
    roulette: rouletteReducer,
  },
})