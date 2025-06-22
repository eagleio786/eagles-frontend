import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import updated from "../../assets/icons/updated.png"
const Program = ({ userData, preview }) => {
  const lvlx1 = Number(userData?.[2]) || 0;
  const lvlx2 = Number(userData?.[3]) || 0;
  const numberOfCircles = 12;
  const circles = Array.from({ length: numberOfCircles }, (_, index) => index);

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
        <div className="flex w-full flex-col" >
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
                    className={`w-7 h-7 rounded-full ${index < lvlx1 ? "bg-img" : "bg-[#5c5c5c]"
                      }`}
                  ></div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-[#08EDFD] to-[#9853E0] rounded-md flex justify-center items-center px-3 py-2 mt-6 font-medium">
                <button
                  className={`text-xs text-white ${lvlx1 >= 12 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={lvlx1 >= 12}
                >
                  {lvlx1 >= 11 ? "Max Level Reached" : `Upgrade for ${Price[lvlx1 + 1]?.cost}$`}
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
                    className={`w-7 h-7 rounded-full ${index < lvlx2 ? "bg-img" : "bg-[#5c5c5c]"
                      }`}
                  ></div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-[#08EDFD] to-[#9853E0] rounded-md flex justify-center items-center px-3 py-2 mt-6 font-medium">
                <button
                  className={`text-xs text-white ${lvlx2 >= 12 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={lvlx2 >= 12}
                >
                  {lvlx2 >= 11 ? "Max Level Reached" : `Upgrade for ${Price[lvlx2 + 1]?.cost}$`}
                </button>
              </div>
            </div>
          </Link>
          </div>
          <div className="w-full  flex justify-center pt-3" >
            {/* <div className=" w-1/2 bg-[#171B26] shadow-lg shadow-[#00000079] px-2 py-2 rounded-lg">
              <div className="flex justify-between text-textColor3">
                <h1 className="text-2xl capitalize">x3</h1>
                <p className="flex items-center gap-1">
                 $$$
                  <span>
                    <GoArrowUpRight className="mb-4" />
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
              
              </div>
              <div className="bg-gradient-to-r from-[#08EDFD] to-[#9853E0] rounded-md flex justify-center items-center px-3 py-2 mt-6 font-medium">
                <button
                  className={`text-xs text-white ${lvlx2 >= 12 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  disabled={lvlx2 >= 12}
                >
                  {`Upgrade for $`}
                </button>
              </div>
            </div> */}
            <div className="relative w-full bg-[#171B26] shadow-lg shadow-[#00000079] px-2 py-2 rounded-lg">
<img src={updated} alt="card image" />


  {/* Blur overlay for the card content */}
  {/* <div className="blur-sm">
    <div className="flex justify-between text-textColor3">
      <h1 className="text-2xl capitalize">x3</h1>
      <p className="flex items-center gap-1">
        $$$
        <span>
          <GoArrowUpRight className="mb-4" />
        </span>
      </p>
    </div>
    <div className="flex flex-wrap gap-2 mt-5">
    
    </div>
    <div className="bg-gradient-to-r from-[#08EDFD] to-[#9853E0] rounded-md flex justify-center items-center px-3 py-2 mt-6 font-medium">
      <button
        className={`text-xs text-white ${lvlx2 >= 12 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        disabled={lvlx2 >= 12}
      >
        {`Upgrade for $`}
      </button>
    </div>
  </div> */}
  
  {/* Coming Soon Overlay */}
  {/* <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
    <div className="text-center">
      <h2 className="text-white text-xl font-bold mb-2">Coming Soon</h2>
      <p className="text-gray-300 text-sm">This feature will be available soon!</p>
    </div>
  </div> */}
</div>
          </div>
          </div>
        </>
    
    </div>
  );
};

export default Program;
