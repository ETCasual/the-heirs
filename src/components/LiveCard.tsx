/* eslint-disable @next/next/no-img-element */
import { type FunctionComponent, useEffect, useState } from "react";
import type { Post } from "~/pages/live";

const generatePastelColor = (seed: string): string => {
  const seedNum = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = seedNum % 360;
  const saturation = 30 + (Math.floor(seedNum / 360) % 21);
  const lightness = 70 + (Math.floor(seedNum / 3600) % 11);
  const colorString = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  const hslToHex = (hsl: string): string => {
    // Convert HSL color string to RGB values
    const hslRegex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
    const match = hsl.match(hslRegex);
    if (!match) {
      throw new Error("Invalid HSL color string");
    }
    const hue = parseInt(match[1] as string);
    const saturation = parseInt(match[2] as string) / 100;
    const lightness = parseInt(match[3] as string) / 100;
    let r, g, b;

    if (saturation === 0) {
      r = g = b = lightness;
    } else {
      const hueToRgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q =
        lightness < 0.5
          ? lightness * (1 + saturation)
          : lightness + saturation - lightness * saturation;
      const p = 2 * lightness - q;
      r = hueToRgb(p, q, hue / 360 + 1 / 3);
      g = hueToRgb(p, q, hue / 360);
      b = hueToRgb(p, q, hue / 360 - 1 / 3);
    }

    // Convert RGB values to hexadecimal format
    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    const hexColor = `${toHex(r)}${toHex(g)}${toHex(b)}`;
    return hexColor;
  };

  const color = hslToHex(colorString);
  return color;
};

const generateReturnString = (seedString: string) => {
  const vowels = ["a", "e", "i", "o", "u"];
  const firstLetter = seedString.charAt(1).toLowerCase();

  if (vowels.includes(firstLetter)) {
    return "From : ";
  } else {
    return "-";
  }
};

export const LiveCard: FunctionComponent<
  Post & { number: number } & { onMounted: (el: Element) => void } & {
    onClick?: () => void;
  }
> = ({ cg, id, msg, name, number, onClick, approved }) => {
  const [color, setColor] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");

  useEffect(() => {
    setColor(generatePastelColor(name));
    setColor2(generatePastelColor(cg));
    setColor3(generatePastelColor(id));
  }, [cg, id, name]);

  return (
    <div
      id={id}
      data-aos="fade-up"
      className={`flex w-[1300px] flex-col gap-3 rounded-xl border-2 border-white p-5 3xl:w-[1700px] ${
        number % 2 === 1 ? "self-start" : "self-end"
      }`}
    >
      <div className="h-full rounded-xl p-2 font-merged text-white">
        <div className="h mb-2 flex flex-row items-center gap-5"></div>
        <p className="w-full overflow-hidden text-6xl  leading-tight tracking-wider">
          {msg}
        </p>
        <div className="item-center flex flex-row justify-end">
          <p className="my-auto mr-5 text-4xl font-bold tracking-wider">{`${generateReturnString(
            name
          )} ${name} | ${cg}`}</p>
          <img
            className="h-[50px] w-[50px] rounded-full"
            alt="open-peeps"
            src={`https://api.dicebear.com/5.x/open-peeps/svg?seed=${name}&backgroundColor=${color},${color2},${color3}&backgroundType=gradientLinear&backgroundRotation=135`}
          />
        </div>
      </div>

      {!approved && (
        <button
          className="text-md mb-2 w-full rounded-lg bg-green-400 py-2 capitalize text-white"
          onClick={onClick}
        >
          Approve
        </button>
      )}
    </div>
  );
};
