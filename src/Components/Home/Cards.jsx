import { BsShare } from 'react-icons/bs';
import { GoArrowUp } from 'react-icons/go';

const Cards = ({referralData, getUsdt,profit,Profit24}) => {
  const partnerCount = referralData?.Partner ?? 0;
  const teamCount = referralData?.Team ?? 0;
  const USDTProfit = getUsdt
  let x=profit
  console.log("Profits here",x);
  
  return (
    <>
      <div className='bg-Background w-full h-full bg-image rounded-lg shadow-xl shadow-[#00000079] px-2 mt-4 pb-3'>
        <div className='h-full w-full py-3'>
          <p className='text-textColor3 font-semibold font-sans text-base flex gap-2 items-center'>
            Profits{' '}
            <span className='bg-[#5c5c5c] rounded-full p-1'>
              <BsShare className='text-textColor3' />
            </span>
          </p>
        </div>
        <div className='flex justify-between font-semibold'>
          <div className='text-textColor3'>
            <p>{USDTProfit/1e18} USDT</p>
          </div>
          <div className='text-textColor3'>
            <p className='flex items-center gap-1 '>
              <GoArrowUp />{Profit24/1e18}
            </p>
          </div>
        </div>
      </div>

      <div className='w-full h-full mt-4 pb-3 flex justify-between gap-2'>
        <div className='bg-Background px-2 shadow-xl shadow-[#00000079] py-3 w-1/2 rounded-lg bg-person2'>
          <p className='text-textColor3 font-sans text-base flex gap-2 items-center'>
            Partners
            <span className='bg-[#5c5c5c] rounded-full p-1 mt-1'>
              <BsShare className='text-textColor3' />
            </span>
          </p>
          <p className='text-3xl text-textColor3'>{partnerCount}</p>
          <div className='w-[85%] mx-auto mt-7 flex justify-between p-1 rounded-full bg-[#a67912] bg-opacity-20'>
            <div className='flex items-center text-white font-medium text-xl'>
              <GoArrowUp /> 0
            </div>
            <div className='gradient-circle'></div>
          </div>
        </div>
        <div className='bg-Background px-2 shadow-xl shadow-[#00000079] py-3 w-1/2 rounded-lg bg-person3'>
          <p className='text-textColor3 font-sans text-base flex gap-2 items-center'>
            Team
            <span className='bg-[#5c5c5c] rounded-full p-1 mt-1'>
              <BsShare className='text-textColor3' />
            </span>
          </p>
          <p className='text-3xl text-textColor3'>{teamCount}</p>
          <div className='w-[85%] mx-auto mt-7 flex justify-between p-1 rounded-full bg-[#a67912] bg-opacity-20'>
            <div className='flex items-center text-white font-medium text-xl'>
              <GoArrowUp /> 0
            </div>
            <div className='gradient-circle'></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cards;
