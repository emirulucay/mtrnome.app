import React from "react";
import { Logo } from "../lib/icons";
import NextLink from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full py-2 px-2 border-b border-spaceB-100">
      <NextLink href="/" className="flex items-center opacity-80 transition duration-300 hover:opacity-100">
        <div>
          <Logo className="text-white scale-[80%]" />
        </div>
        <span className="text-white font-medium text-base leading-normal">mtronome.app</span>
      </NextLink>
    </header>
  );
}
