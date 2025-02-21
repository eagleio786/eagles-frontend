import { GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Program = () => {
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
    <div className='w-full h-full mt-4 pb-3 flex justify-between gap-2'>
      {/* X1 Program */}
      <Link to='/lvlxone' className='w-1/2'>
        <div className='bg-Background shadow-xl shadow-[#00000079] px-2 py-2 rounded-lg'>
          <div className='flex justify-between text-textColor3'>
            <h1 className='text-2xl capitalize'>x1</h1>
            <p className='flex items-center gap-1'>
              {/* {Price[lvlX1]?.cost || 0} USDT */}
              <span>
                <GoArrowUpRight className='mb-4' />
              </span>
            </p>
          </div>
          <div className='flex flex-wrap gap-2 mt-5'>
            {circles.map((_, index) => (
              <div
                key={index}
                // className={`w-7 h-7 rounded-full ${
                //   index < lvlX1 ? 'bg-[#a67912]' : 'bg-[#5c5c5c]'
                // }`}
              ></div>
            ))}
          </div>
          <div className='bg-gradient-to-r from-[#a67912] to-[#1a1303] rounded-md flex justify-center items-center px-3 py-2 mt-6 font-medium'>
            <button
            // className={`text-xs text-white ${
            //   lvlX1 >= 12 ? 'opacity-50 cursor-not-allowed' : ''
            // }`}
            // disabled={lvlX1 >= 12}
            >
              {/* {lvlX1 >= 12
                ? 'Max Level Reached'
                : `Upgrade for ${Price[lvlX1 + 1]?.cost || 5} USDT`} */}
            </button>
          </div>
        </div>
      </Link>

      {/* X2 Program */}
      <Link to='/lvlxtwo' className='w-1/2'>
        <div className='bg-Background shadow-lg shadow-[#00000079] px-2 py-2 rounded-lg'>
          <div className='flex justify-between text-textColor3'>
            <h1 className='text-2xl capitalize'>x2</h1>
            <p className='flex items-center gap-1'>
              {/* {Price[lvlX2]?.cost || 0} USDT */}
              <span>
                <GoArrowUpRight className='mb-4' />
              </span>
            </p>
          </div>
          <div className='flex flex-wrap gap-2 mt-5'>
            {circles.map((_, index) => (
              <div
                key={index}
                // className={`w-7 h-7 rounded-full ${
                //   index < lvlX2 ? 'bg-[#a67912]' : 'bg-[#5c5c5c]'
                // }`}
              ></div>
            ))}
          </div>
          <div className='bg-gradient-to-r from-[#a67912] to-[#1a1303] rounded-md flex justify-center items-center px-3 py-2 mt-6 font-medium'>
            <button
            // className={`text-xs text-white ${
            //   lvlX2 >= 12 ? 'opacity-50 cursor-not-allowed' : ''
            // }`}
            // disabled={lvlX2 >= 12}
            >
              {/* {lvlX2 >= 12
                ? 'Max Level Reached'
                : `Upgrade for ${Price[lvlX2 + 1]?.cost || 5} USDT`} */}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Program;
