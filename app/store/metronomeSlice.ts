import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface metronomeState {
  isPlaying: boolean;
  bpm: number;
  emphasizeFirstKick: boolean;
}

const initialState: metronomeState = {
  isPlaying: false,
  bpm: 120,
  emphasizeFirstKick: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    toggleFirstKick: (state) => {
      state.emphasizeFirstKick = !state.emphasizeFirstKick;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBpm, togglePlay, toggleFirstKick } = counterSlice.actions;

export default counterSlice.reducer;
