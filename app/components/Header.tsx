import React from "react";
import { Logo, GitHub } from "../lib/icons";
import NextLink from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full py-2 px-4 border-b border-spaceB-100">
      <NextLink href="/" className="flex items-center opacity-80 transition duration-300 hover:opacity-100">
        <Logo className="text-white scale-[80%] -ml-[3px]" />
        <span className="text-white font-medium text-base leading-none p-0">mtronome.app</span>
      </NextLink>
      <a href="https://github.com/emirulucay/mtrnome.app">
        <GitHub className="text-white/70 transition duration-300 hover:text-white" />
      </a>
    </header>
  );
}
