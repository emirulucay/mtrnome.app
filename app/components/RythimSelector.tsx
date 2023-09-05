"use client";
import React, { ReactHTMLElement, ReactNode } from "react";
import { useState, useRef, useEffect } from "react";
import { DownArrow, Check } from "../lib/icons";
import cx from "classnames";

export default function RythimSelector() {
  const rythims = ["3/4", "4/4", "4/8", "5/8", "6/8", "8/8", "9/8"];
  const [rythim, setRythim] = useState<string>("4/4");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuButton = useRef<any>();
  const menuList = useRef<any>();

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (!e.composedPath().includes(menuList.current) && !e.composedPath().includes(menuButton.current)) {
        isOpen === true ? setIsOpen(false) : "";
      }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  function setRythimAndClose(r: string) {
    setRythim(r);
    return setIsOpen(false);
  }

  return (
    <div className="relative">
      <div
        ref={menuButton}
        onClick={() => setIsOpen(!isOpen)}
        className="w-[54px] text-white/80 hover:text-white text-base space-gradient flex items-center gap-1 cursor-pointer p-1 border border-spaceB-50 rounded-[4px] leading-none transition duration-300">
        {rythim} <DownArrow className="text-white" />
      </div>
      <ul
        ref={menuList}
        className={cx(
          "absolute top-10 backdrop-blur -left-[55px] space-gradient w-[164px] border border-spaceB-50 flex flex-col p-2 rounded-xl z-10 transition-all duration-300",
          {
            "pointer-events-none opacity-0 -translate-y-1": !isOpen,
          }
        )}>
        {rythims.map((r, i) => (
          <li
            key={i}
            onClick={() => setRythimAndClose(r)}
            className={cx(
              "text-white/50 w-full text-base flex items-center justify-between cursor-pointer transition border border-transparent hover:border-spaceB-50 rounded-[4px] p-1 leading-none duration-300 hover:text-white/80",
              {
                "!text-white": rythim === r,
              }
            )}>
            {r}
            <div
              className={cx({
                "opacity-0 invisible": rythim !== r,
              })}>
              <Check />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
