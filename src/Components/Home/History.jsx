import { useState } from 'react';
import { IoWallet } from 'react-icons/io5';
import { RiShare2Line } from 'react-icons/ri';

const History = () => {
  const [visibleItems, setVisibleItems] = useState(6);

  const handleSeeMore = () => {
    setVisibleItems((prev) => prev + 6);
  };
  const History = [
    {
      id: '1',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x1',
      time: '2 hours',
    },
    {
      id: '2',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x1',
      time: '2 hours',
    },
    {
      id: '3',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x2',
      time: '2 hours',
    },
    {
      id: '4',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x1',
      time: '2 hours',
    },
    {
      id: '5',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x1',
      time: '2 hours',
    },
    {
      id: '6',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x1',
      time: '2 hours',
    },
    {
      id: '7',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x2',
      time: '2 hours',
    },
    {
      id: '8',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x1',
      time: '2 hours',
    },
    {
      id: '9',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x1',
      time: '2 hours',
    },
    {
      id: '10',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x2',
      time: '2 hours',
    },
    {
      id: '11',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x1',
      time: '2 hours',
    },
    {
      id: '12',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x1',
      time: '2 hours',
    },
    {
      id: '13',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x1',
      time: '2 hours',
    },
    {
      id: '14',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x1',
      time: '2 hours',
    },
    {
      id: '15',
      icon: <IoWallet />,
      Paymentid: 'ID 1869704',
      payment: '+20 USDT',
      level: 'x2',
      time: '2 hours',
    },
  ];
  return (
    <>
      <div className='mt-7 mb-3 pb-6 bg-Background shadow-xl shadow-[#00000079] rounded-xl '>
        <div className='overflow-scroll h-[470px]'>
          {History.slice(0, visibleItems).map((history, index) => {
            return (
              <div
                key={index}
                className='w-full h-auto border-b border-textColor2 flex justify-between items-center px-3 py-4'
              >
                <div className='flex gap-3'>
                  <div className='bg-textColor2 text-green-700 text-3xl h-10 justify-center items-center flex w-10 rounded-full'>
                    {history.icon}
                  </div>
                  <div>
                    <h1 className='text-[#a67912] text-base'>
                      {history.Paymentid}
                    </h1>
                    <p className='text-textColor2 flex gap-1 text-sm'>
                      <span className='text-textColor3'>{history.payment}</span>
                      in
                      <span className='text-[#a67912]'>{history.level}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <p className='flex gap-2 text-textColor2'>
                    ~{history.time}
                    <span className='text-textColor3 text-xl rotate-45'>
                      <RiShare2Line />
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className='flex justify-center mt-6'>
          <button
            onClick={handleSeeMore}
            className='text-textColor3 w-3/4 bg-gradient-to-r from-[#a67912] to-[#1a1303] shadow-xl shadow-[#00000079] rounded-lg py-3 font-medium'
          >
            See More
          </button>
        </div>
      </div>
    </>
  );
};
export default History;
