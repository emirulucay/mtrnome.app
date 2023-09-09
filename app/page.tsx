"use client";
import Image from "next/image";
import Header from "./components/Header";
import RythimSelector from "./components/RythimSelector";
import { Minus, Plus } from "@/app/lib/icons";
import SpaceSlider from "./components/SpaceSlider";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { setBpm } from "./store/metronomeSlice";
import Player from "./components/Player";

export default function Home() {
  const dispatch = useDispatch();
  const { bpm, process } = useSelector((state: RootState) => state.metronomeReducer);
  return (
    <>
      <Header />
      <div className="mx-auto max-w-[420px] flex flex-col mt-12 px-2 sm:px-0">
        <div className="flex items-center justify-between px-2 border-b border-spaceB-50 pb-1">
          <div className="flex flex-col items-center">
            <span className="text-white/30 text-xs">PROGRESS</span>
            <span className="text-[21px] text-white font-medium">
              {process.main}. {process.decimal}
            </span>
          </div>
          <div className="flex flex-col  items-center">
            <span className="text-white/30 text-xs">PBM</span>
            <span className="text-[21px] text-white font-medium">{bpm}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white/30 text-xs">RYHTIM</span>
            <span className="text-[21px] text-white font-medium">
              <RythimSelector />
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-10 mt-12">
          <button
            onClick={() => dispatch(setBpm(bpm - 1))}
            className="flex items-center p-2 rounded-full border border-spaceB-50 space-gradient hover:opacity-80 transition duration-300">
            <Minus className="text-white" />
          </button>
          <div className="flex flex-col items-center gap-1 text-white text-7xl font-medium -translate-y-2">
            <span className="text-sm text-white/70 font-regular">BPM</span>
            {bpm}
          </div>
          <button
            onClick={() => dispatch(setBpm(bpm + 1))}
            className="flex items-center p-2 rounded-full border border-spaceB-50 space-gradient hover:opacity-80 transition duration-300">
            <Plus className="text-white" />
          </button>
        </div>
        <div className="flex items-center mt-8 px-4">
          <SpaceSlider />
        </div>
        <div className="mt-8">
          <Player />
        </div>
        <div className="w-20 h-[1px] bg-spaceB-50 mx-auto mt-12"></div>
        <div className="flex flex-col mt-8">
          <h1 className="text-white font-medium text-center">Simply beautiful and awesome metronome for musicians.</h1>
          <p className="text-white/50 text-center">Simple metronome for musicians with great user experience and gorgeus interface.</p>
          <p className="text-[13px] text-white/50 mt-2 text-center pb-8">
            Created by{" "}
            <a href="https://x.com/astrodokki" target="_blank" rel="noopener noreferrer" className="text-white">
              Emir Uluçay
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
