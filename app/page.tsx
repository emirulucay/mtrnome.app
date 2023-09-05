import Image from "next/image";
import Header from "./components/Header";
import RythimSelector from "./components/RythimSelector";

export default function Home() {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-[400px] flex flex-col mt-16 border-b border-spaceB-50 pb-1">
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col items-center">
            <span className="text-white/30 text-xs">PROGRESS</span>
            <span className="text-[21px] text-white font-medium">001. 1</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/30 text-xs">PBM</span>
            <span className="text-[21px] text-white font-medium">92</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/30 text-xs">RYHTIM</span>
            <span className="text-[21px] text-white font-medium">
              <RythimSelector />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
