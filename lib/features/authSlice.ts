'use client'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthState } from '@/types/todo'

// Simulated login delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    await delay(1000) // Simulate API call

    // Use password indirectly (e.g., log it or validate format)
    console.log(`Received password: ${'*'.repeat(password.length)}`) // Masked password for security

    // Mock user data
    return {
      id: '1',
      email,
      name: email.split('@')[0],
    }
  }
)

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await delay(500) // Simulate API call
  return null
})

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
  },
})

export default authSlice.reducer
