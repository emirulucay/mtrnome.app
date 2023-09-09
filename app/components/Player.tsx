"use client";
import React from "react";
import { Play, Stop } from "../lib/icons";
import { useSelector, useDispatch } from "react-redux";
import { setIsPlaying, setEmphasize, setProcess } from "../store/metronomeSlice";
import type { RootState } from "@/app/store";
import { Howl, Howler } from "howler";
import { useRef, useEffect, createRef } from "react";
import cx from "classnames";

export default function Player() {
  const dispatch = useDispatch();
  const { isPlaying, bpm, rythim, process } = useSelector((state: RootState) => state.metronomeReducer);
  const intervalRef = useRef<any>(null);

  // const elementsRef = useRef<any>(Array(+rythim[0]).map(() => createRef()));

  function manageProcess() {
    if (process.decimal >= +rythim[0]) {
      dispatch(
        setProcess({
          decimal: 1,
          main: process.main + 1,
        })
      );
    } else {
      dispatch(
        setProcess({
          ...process,
          decimal: process.decimal + 1,
        })
      );
    }
  }

  useEffect(() => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      const interval = (60 / bpm) * 1000;
      intervalRef.current = setInterval(() => {
        const sound = new Howl({
          src: ["./audio/sound1.wav"],
        });
        sound.play();
        manageProcess();
      }, interval);
    }
  }, [bpm, isPlaying, process]);

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
      dispatch(
        setProcess({
          main: 1,
          decimal: 0,
        })
      );
      return sound.stop();
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <button onClick={() => handleClick()} className="bg-spaceB-500 rounded-full p-4 text-white mt-4">
        {isPlaying ? <Stop /> : <Play />}
      </button>
      <div
        className={cx("flex items-center gap-4 sm:gap-6 mt-10", {
          "!gap-3": +rythim[0] > 5,
        })}>
        {Array(+rythim[0])
          .fill(true)
          .map((item, index) => (
            <div
              key={index}
              className={cx("w-6 h-6 sm:w-8 sm:h-8 bg-spaceB-700 rounded-full", {
                "!bg-spaceB-500": process.decimal >= index + 1,
                "!w-5 !h-5": +rythim[0] > 5,
              })}></div>
          ))}
      </div>
    </div>
  );
}
