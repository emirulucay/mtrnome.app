"use client";
import * as Slider from "@radix-ui/react-slider";
import { useSelector, useDispatch } from "react-redux";
import { setBpm } from "../store/metronomeSlice";
import type { RootState } from "@/app/store";

import React from "react";

export default function SpaceSlider() {
  const dispatch = useDispatch();
  function handleChange(value: number) {
    dispatch(setBpm(value));
    console.log("çalıştı");
  }

  const { bpm } = useSelector((state: RootState) => state.metronomeReducer);

  return (
    <Slider.Root
      onValueChange={(value: number[]) => handleChange(value[0])}
      // defaultValue={[bpm]}
      value={[bpm]}
      max={260}
      min={40}
      className="relative flex items-center select-none touch-none w-full h-5">
      <Slider.Track className="bg-white/70 relative grow rounded-full h-3">
        <Slider.Range className="absolute bg-spaceB-500 rounded-full h-full" />
      </Slider.Track>
      <Slider.Thumb className="block w-6 h-6 bg-white rounded-full" />
    </Slider.Root>
  );
}
