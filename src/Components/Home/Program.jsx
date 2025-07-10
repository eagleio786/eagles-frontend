import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Program = ({ userData, preview }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(12, 0, 0, 0); // Set to 12:00 PM

      const difference = tomorrow - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const lvlx1 = Number(userData?.[2]) || 0;
  const lvlx2 = Number(userData?.[3]) || 0;
  const lvlx3 = 4;

  const numberOfCirclesX3 = 8;
  const numberOfCircles = 12;
  const circles = Array.from({ length: numberOfCircles }, (_, index) => index);
  const circlesX3 = Array.from(
    { length: numberOfCirclesX3 },
    (_, index) => index
  );

  const PriceX3 = [
    { cost: 20 },
    { cost: 40 },
    { cost: 80 },
    { cost: 160 },
    { cost: 320 },
    { cost: 640 },
    { cost: 1250 },
  ];

  const Price = [
    { cost: 2.5 },
    { cost: 5 },
    { cost: 10 },
    { cost: 20 },
    { cost: 40 },
    { cost: 80 },
    { cost: 160 },
    { cost: 320 },
    { cost: 640 },
    { cost: 1250 },
    { cost: 2500 },
    { cost: 5000 },
  ];

  return (
    <div className="w-full h-full mt-4 pb-3 flex justify-between gap-2">
      {/* X1 Program */}

      <>
        <div className="flex w-full flex-col">
          <div className="w-full flex flex-row">
            <Link to="/lvlxone" className="w-1/2">
              <div className="bg-[#171B26] shadow-xl shadow-[#00000079] px-2 py-2 rounded-lg">
                <div className="flex justify-between text-textColor3">
                  <h1 className="text-2xl capitalize">x1</h1>
                  <p className="flex items-center gap-1">
                    {Price[lvlx1]?.cost || 0}$
                    <span>
                      <GoArrowUpRight className="mb-4" />
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {circles.map((_, index) => (
                    <div
                      key={index}
                      className={`w-7 h-7 rounded-full ${
                        index < lvlx1 ? "bg-img" : "bg-[#5c5c5c]"
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-[#08EDFD] to-[#9853E0] rounded-md flex justify-center items-center px-3 py-2 mt-6 font-medium">
                  <button
                    className={`text-xs text-white ${
                      lvlx1 >= 12 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={lvlx1 >= 12}
                  >
                    {lvlx1 >= 11
                      ? "Max Level Reached"
                      : `Upgrade for ${Price[lvlx1 + 1]?.cost}$`}
                  </button>
                </div>
              </div>
            </Link>

            {/* X2 Program */}
            <Link to="/lvlxtwo" className="w-1/2">
              <div className="bg-[#171B26] shadow-lg shadow-[#00000079] px-2 py-2 rounded-lg">
                <div className="flex justify-between text-textColor3">
                  <h1 className="text-2xl capitalize">x2</h1>
                  <p className="flex items-center gap-1">
                    {Price[lvlx2]?.cost || 0}$
                    <span>
                      <GoArrowUpRight className="mb-4" />
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {circles.map((_, index) => (
                    <div
                      key={index}
                      className={`w-7 h-7 rounded-full ${
                        index < lvlx2 ? "bg-img" : "bg-[#5c5c5c]"
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-[#08EDFD] to-[#9853E0] rounded-md flex justify-center items-center px-3 py-2 mt-6 font-medium">
                  <button
                    className={`text-xs text-white ${
                      lvlx2 >= 12 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={lvlx2 >= 12}
                  >
                    {lvlx2 >= 11
                      ? "Max Level Reached"
                      : `Upgrade for ${Price[lvlx2 + 1]?.cost}$`}
                  </button>
                </div>
              </div>
            </Link>
          </div>
          {/* x3 program */}
          <div className="w-full flex justify-center pt-3 relative">
            <div className="absolute w-1/2 h-full z-20 flex justify-center items-center">
              <div className="bg-black/60 backdrop-blur-sm w-full h-full rounded-lg flex flex-col justify-center items-center px-2">
                <div className="text-white text-center">
                  <div className="text-sm sm:text-base font-semibold mb-2">
                    Launches in:
                  </div>
                  <div className="flex justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-lg sm:text-xl">
                        {timeLeft.hours.toString().padStart(2, '0')}
                      </span>
                      <span className="text-xs opacity-75">HRS</span>
                    </div>
                    <span className="font-bold text-lg sm:text-xl">:</span>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-lg sm:text-xl">
                        {timeLeft.minutes.toString().padStart(2, '0')}
                      </span>
                      <span className="text-xs opacity-75">MIN</span>
                    </div>
                    <span className="font-bold text-lg sm:text-xl">:</span>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-lg sm:text-xl">
                        {timeLeft.seconds.toString().padStart(2, '0')}
                      </span>
                      <span className="text-xs opacity-75">SEC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/lvlxthree" className="w-1/2 pointer-events-none">
              <div className="bg-[#171B26] shadow-lg shadow-[#00000079] px-2 py-2 rounded-lg filter blur-sm">
                <div className="flex justify-between text-textColor3">
                  <h1 className="text-2xl capitalize">x3</h1>
                  <p className="flex items-center gap-1">
                    {PriceX3[lvlx3]?.cost || 0}$
                    <span>
                      <GoArrowUpRight className="mb-4" />
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {circlesX3.map((_, index) => (
                    <div
                      key={index}
                      className={`w-7 h-7 rounded-full ${
                        index < lvlx3 ? "bg-img-2" : "bg-[#5c5c5c]"
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-[#FF1493] to-[#FFFF00] rounded-md flex justify-center items-center px-3 py-2 mt-6 font-medium">
                  <button
                    className={`text-xs text-white ${
                      lvlx3 >= 7 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={lvlx3 >= 7}
                  >
                    {lvlx3 >= 7
                      ? "Max Level Reached"
                      : `Upgrade for ${PriceX3[lvlx3 + 1]?.cost}$`}
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </>
    </div>
  );
};

export default Program;