import React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useSelector, useDispatch } from "react-redux";
import { setIsPlaying, setEmphasize, setProcess } from "@/app/store/metronomeSlice";

const CheckboxDemo = () => {
  const dispatch = useDispatch();
  function handleChange(state: boolean) {
    dispatch(setEmphasize(state));
  }

  return (
    <form>
      <div className="flex items-center">
        <Checkbox.Root
          className="hover:bg-violet3 flex h-[22px] w-[22px] appearance-none items-center justify-center rounded-[4px] bg-spaceB-700 shadow-[0_2px_10px] shadow-spaceB-50 outline-none focus:shadow-[0_0_0_2px_white]"
          onCheckedChange={(state: boolean) => handleChange(state)}
          defaultChecked
          id="c1">
          <Checkbox.Indicator className="text-violet11">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className="pl-3 text-[15px] leading-none text-white" htmlFor="c1">
          Emphasize first hit
        </label>
      </div>
    </form>
  );
};

export default CheckboxDemo;
