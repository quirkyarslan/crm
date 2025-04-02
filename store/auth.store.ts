import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from 'next-auth';

export interface AuthState {
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  session: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearAuth: (state) => {
      state.session = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setSession, setLoading, setError, clearAuth } = authSlice.actions;
export default authSlice.reducer; 