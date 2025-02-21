import { useState, useEffect } from 'react';
import axios from 'axios';
import Notify from '../Components/Lvl1/Notify';
import UserTable from '../Components/Lvl1/UserTable';
import { HiOutlineArrowPath } from 'react-icons/hi2';
import { GoPeople } from 'react-icons/go';
import { RiLockLine } from 'react-icons/ri';
import './Pages.css';
import { activateLevel, getTxn, users } from '../Config/Contract-Methods';
import { useAccount } from 'wagmi';
import { ApiUrl, RandomAdress } from '../Config/config';
import { USDTapprove } from '../Config/Contract-Methods';
const Levelx1 = () => {
  const [apiData, setApiData] = useState(null);
  const [activeLevel, setActiveLevel] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const { isConnected, address } = useAccount();
  const [referredUsersCountByLevel, setReferredUsersCountByLevel] = useState(
    {}
  );

  console.log(apiData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await users(address);
        console.log('User Data API Response:', result);
        const level = result[2]?.toString();
        setActiveLevel(level);
        setData(result);

        if (result?.[1]) {
          const userId = result[1];
          const response = await axios.get(`${ApiUrl}/getalldata/${userId}`);
          setApiData(response.data);

          const referralUsers = response.data?.referredUsers || [];
          const connectedUserLevel = response.data?.data?.currentX1Level;

          const userCountByLevel = referralUsers.reduce((acc, user) => {
            const level = user?.currentX1Level;
            if (level && level <= connectedUserLevel) {
              acc[level] = (acc[level] || 0) + 1;
            }
            return acc;
          }, {});

          setReferredUsersCountByLevel(userCountByLevel);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const levels = [
    { level: 1, cost: 2.5 },
    { level: 2, cost: 5 },
    { level: 3, cost: 10 },
    { level: 4, cost: 20 },
    { level: 5, cost: 40 },
    { level: 6, cost: 80 },
    { level: 7, cost: 160 },
    { level: 8, cost: 320 },
    { level: 9, cost: 640 },
    { level: 10, cost: 1250 },
    { level: 11, cost: 2500 },
    { level: 12, cost: 5000 },
  ];

  const updatedLevels = levels.map((level) => {
    const filteredUsersCount = referredUsersCountByLevel[level.level] || 0;
    const recycleCount = Math.floor(filteredUsersCount / 4);

    return {
      ...level,
      maxUsers: filteredUsersCount,
      recycleCount,
    };
  });

  const handleActivateNextLevel = async (level, cost) => {
    try {
      setLoading(true); // Start loading
      console.log('level comming', level, cost);
      const val = cost * (1e18).toString();
      const usdtApp = await USDTapprove(val);
      const usdtapp_recipt = await getTxn(usdtApp);
      const approvetx = await activateLevel('1', level);
      const receipt = await getTxn(approvetx);
      if (!receipt || !usdtapp_recipt) {
        console.log('Level activation failed');
        setLoading(false); // Stop loading on failure
        return;
      }
      setActiveLevel((prevLevel) => Math.min(prevLevel + 1, 12));
    } catch (err) {
      console.error('Error activating level:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='text-white p-2 m-4 hello'>
        <p>
          ID {data?.[1]?.toString()} / Theeagles.io x1 ({activeLevel}/12)
        </p>
        <div className='flex justify-between p-2 m-4 items-center'>
          <p>Theeagles.io x1</p>
          <p>{updatedLevels[0].cost} USDT</p>
        </div>
      </div>
      <div className='x1program'>
        {updatedLevels.map((level) => {
          const isActive = level.level <= activeLevel;
          const isNextLevel = level.level === Number(activeLevel) + 1;
          const currentUsers = level.maxUsers % 4;
          const filteredUsersCount =
            referredUsersCountByLevel[level.level] || 0;

          return (
            <div className='levels' key={level.level}>
              <div className='level-value'>
                <p>Level {level.level}</p>
                <div className='logo-usdt'>
                  <img
                    src='/assets/LoginImages/tether.png'
                    alt='Tether Logo'
                    className='h-[12px] w-auto'
                  />
                  <p>{level.cost} USDT</p>
                </div>
              </div>

              {isActive ? (
                <div className='circles-x1'>
                  <div className='all-circle'>
                    <div className='flex-row'>
                      {[1, 2].map((circleIndex) => (
                        <div
                          key={circleIndex}
                          className={`circle ${
                            currentUsers >= circleIndex ? 'filled' : ''
                          }`}
                        ></div>
                      ))}
                    </div>
                    <div className='flex-row'>
                      {[3, 4].map((circleIndex) => (
                        <div
                          key={circleIndex}
                          className={`circle ${
                            currentUsers >= circleIndex ? 'filled' : ''
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='locked-level'>
                  {isNextLevel ? (
                    <button
                      className='active-btn'
                      onClick={() =>
                        handleActivateNextLevel(level.level, level.cost)
                      }
                      disabled={loading}
                    >
                      {loading ? (
                        <svg
                          aria-hidden='true'
                          className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                          viewBox='0 0 100 101'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                            fill='currentColor'
                          />
                          <path
                            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                            fill='currentFill'
                          />
                        </svg>
                      ) : (
                        'Activate'
                      )}
                    </button>
                  ) : (
                    <RiLockLine size={24} />
                  )}
                </div>
              )}

              <div className='level-value'>
                <div className='logo-usdt'>
                  <GoPeople />
                  {filteredUsersCount}
                </div>
                <div className='logo-usdt'>
                  <HiOutlineArrowPath />
                  {level.recycleCount}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Notify />
      <UserTable apiData={apiData} />
    </>
  );
};

export default Levelx1;
