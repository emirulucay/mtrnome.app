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
  const { bpm, isPlaying } = useSelector((state: RootState) => state.metronomeReducer);
  return (
    <>
      <Header />
      <div className="mx-auto max-w-[400px] flex flex-col mt-16">
        <div className="flex items-center justify-between px-2 border-b border-spaceB-50 pb-1">
          <div className="flex flex-col items-center">
            <span className="text-white/30 text-xs">PROGRESS</span>
            <span className="text-[21px] text-white font-medium">001. 1</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/30 text-xs">is playing</span>
            <span className="text-[21px] text-white font-medium">{isPlaying.toString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/30 text-xs">PBM</span>
            <span className="text-[21px] text-white font-medium">{bpm}</span>
          </div>
          <div className="flex flex-col">
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
        <div className=" mt-8">
          <Player />
        </div>
      </div>
    </>
  );
}
