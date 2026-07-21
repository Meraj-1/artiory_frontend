import React from "react";
import { CircularCard } from "./CircularCard";
import { Londrina_Solid } from "next/font/google";
import WaveDivider from "./WaveDivider";
import { useBreakpoint } from "../hooks/useBreakpoint";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});


//CircularCard Props
// type CircularCardProps = {
//   id: string; // unique id for SVG defs
//   topLabel: string;
//   bottomLabel?: string;
//   imageSrc: string;
//   outerColor?: string; // tailwind color or any css color
//   size?: number; // px width/height of outer circle (default 192)
//   onClick?: () => void;
//   className?: string;
// };

const AGE_OPTIONS = [
  {
    id: "INFANT",
    topLabel: "Infant",
    bottomLabel: "Up to 1 Year",
    imageSrc: "/productbyage/1.webp",
    color: "#D87F20",
    className: "hover:scale-105 transition-transform duration-200 z-10",
  },
  {
    id: "TOODLER",
    topLabel: "Toddler",
    bottomLabel: "1 Year",
    imageSrc: "/productbyage/2.webp",
    color: "#76C80C",
  },
  {
    id: "pre-school",
    topLabel: "Pre-Schooler",
    bottomLabel: "2 Year",
    imageSrc: "/productbyage/3.webp",
    color: "#eac02b",
  },
  {
    id: "aged",
    topLabel: "Aged",
    bottomLabel: "3-4 Year",
    imageSrc: "/productbyage/4.webp",
    color: "#00b8a2",
  },
  {
    id: "adolescent",
    topLabel: "Adolescent",
    bottomLabel: "Over 4 Year",
    imageSrc: "/productbyage/5.webp",
    color: "#675aa8",
  },
];

export default function ProductByAge() {

  const currentBreakpoint = useBreakpoint();

  const getSize = () => {
    switch (currentBreakpoint) {
      case 'sm':
        return 170;
      case 'md':
        return 200;
      case 'lg':
      case 'xl':
        return 270;
      case '2xl':
        return 300; // Example: Larger for bigger screens
      default:
        return 140;
    }
  };

  return (

    <>
      <section className="relative h-[100%] md:h-[140%] w-full">
        <div className=" h-auto flex items-center justify-center bg-[#88a7e1] md:-mt-[150px] -mt-[50px]">

          <div className="max-w-5xl w-full mt-24">
            <h2 className={`${londrina.className} xl:mt-40  tracking-[1px] md:mt-20 text-4xl md:text-6xl xl:text-7xl font-extrabold text-white text-center md:mb-12`}>Selection by Age</h2>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center"> */}
            <div className="flex flex-wrap flex-cols-3 items-center justify-center gap-8 py-12">
              {AGE_OPTIONS.map((a) => (
                <CircularCard
                  key={a.id}
                  id={a.id}
                  topLabel={a.topLabel}
                  bottomLabel={a.bottomLabel}
                  imageSrc={a.imageSrc}
                  outerColor={a.color}
                  size={getSize()}
                  className={`md:-mt-8 hover:scale-105 transition-transform ${londrina.className}  duration-200`}
                  onClick={() => console.log("clicked", a.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <div>
          <WaveDivider bgColor="#88a7e1" className="z-10 transform -translate-y-1" />
      </div>

    </>
  );
}
