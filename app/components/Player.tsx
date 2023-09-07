"use client";
import React from "react";
import { Play } from "../lib/icons";
import { useSelector, useDispatch } from "react-redux";
import { setIsPlaying, setEmphasize } from "../store/metronomeSlice";
import type { RootState } from "@/app/store";
import { Howl, Howler } from "howler";
import { useRef, useEffect } from "react";

export default function Player() {
  const dispatch = useDispatch();
  const { isPlaying, bpm, rythim } = useSelector((state: RootState) => state.metronomeReducer);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      const interval = (60 / bpm) * 1000;
      intervalRef.current = setInterval(() => {
        const sound = new Howl({
          src: ["./audio/sound1.wav"],
        });
        sound.play();
      }, interval);
    }
  }, [bpm, isPlaying]);

  function handleClick() {
    dispatch(setIsPlaying(!isPlaying));
    toggleMetronome();
  }

  const toggleMetronome = () => {
    const sound = new Howl({
      src: ["./audio/sound1.wav"], // Ses dosyasının yolu
    });
    if (isPlaying) {
      clearInterval(intervalRef.current);
      return sound.stop();
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <button onClick={() => handleClick()} className="bg-spaceB-500 rounded-full p-4 text-white">
        {isPlaying ? "Pause" : <Play />}
      </button>
      <div className="flex items-center gap-6 mt-8">
        {Array(+rythim[0])
          .fill(true)
          .map((item, index) => (
            <div key={index} className="w-8 h-8 bg-spaceB-700 rounded-full"></div>
          ))}
      </div>
    </div>
  );
}
