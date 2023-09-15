"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProcessInterface {
  main: number;
  decimal: number;
}

export interface metronomeState {
  isPlaying: boolean;
  bpm: number;
  emphasizeFirstKick: boolean;
  rythim: string;
  process: ProcessInterface;
}

const initialState: metronomeState = {
  isPlaying: false,
  bpm: 120,
  emphasizeFirstKick: true,
  rythim: "4/4",
  process: {
    main: 1,
    decimal: 0,
  },
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
    setProcess: (state, action: PayloadAction<ProcessInterface>) => {
      state.process = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBpm, setIsPlaying, setEmphasize, setRythim, setProcess } = metronomeSlice.actions;

export default metronomeSlice.reducer;
