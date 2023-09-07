"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface metronomeState {
  isPlaying: boolean;
  bpm: number;
  emphasizeFirstKick: boolean;
  rythim: string;
}

const initialState: metronomeState = {
  isPlaying: false,
  bpm: 120,
  emphasizeFirstKick: false,
  rythim: "4/4",
};

export const metronomeSlice = createSlice({
  name: "metronome",
  initialState,
  reducers: {
    setBpm: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setEmphasize: (state, action: PayloadAction<boolean>) => {
      state.emphasizeFirstKick = action.payload;
    },
    setRythim: (state, action: PayloadAction<string>) => {
      state.rythim = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBpm, setIsPlaying, setEmphasize, setRythim } = metronomeSlice.actions;

export default metronomeSlice.reducer;
