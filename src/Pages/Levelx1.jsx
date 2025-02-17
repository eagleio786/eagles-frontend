import { useState, useEffect } from "react";
import axios from "axios";
import Notify from "../Components/Lvl1/Notify";
import UserTable from "../Components/Lvl1/UserTable";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
import { RiLockLine } from "react-icons/ri";
import "./Pages.css";

const Levelx1 = () => {
  const [apiData, setApiData] = useState(null);
  const [activeLevel, setActiveLevel] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = 2; 
        const response = await axios.get(`
          http://ec2-51-20-86-109.eu-north-1.compute.amazonaws.com/getalldata/${id}
        `);
        console.log("API Response:", response.data);
        setApiData(response.data);
        setActiveLevel(response.data?.data?.currentX1Level || 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const referredUsers = apiData?.data?.TotalReferred?.length || 0;

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
    const recycleCount = Math.floor(referredUsers / 4);
    return {
      ...level,
      maxUsers: referredUsers, 
      recycleCount,
    };
  });

  const handleActivateNextLevel = () => {
    setActiveLevel((prevLevel) => Math.min(prevLevel + 1, 12));
  };

  return (
    <>
      <div className="text-white p-2 m-4 hello">
        <p>ID 345 / Theeagles.io x1 (1/12)</p>
        <div className="flex justify-between p-2 m-4 items-center">
          <p>Theeagles.io x1</p>
          <p>{updatedLevels[0].cost} USDT</p>
        </div>
      </div>
      <div className="x1program">
        {updatedLevels.map((level) => {
          const isActive = level.level <= activeLevel;
          const isNextLevel = level.level === activeLevel + 1;
          const currentUsers = level.maxUsers % 4;

          return (
            <div className="levels" key={level.level}>
              <div className="level-value">
                <p>Level {level.level}</p>
                <div className="logo-usdt">
                  <img
                    src="/assets/LoginImages/tether.png"
                    alt="Tether Logo"
                    className="h-[12px] w-auto"
                  />
                  <p>{level.cost} USDT</p>
                </div>
              </div>

              {isActive ? (
                <div className="circles-x1">
                  <div className="all-circle">
                    <div className="flex-row">
                      {[1, 2].map((circleIndex) => (
                        <div
                          key={circleIndex}
                          className={`circle ${currentUsers >= circleIndex ? "filled" : ""}`}
                        ></div>
                      ))}
                    </div>
                    <div className="flex-row">
                      {[3, 4].map((circleIndex) => (
                        <div
                          key={circleIndex}
                          className={`circle ${currentUsers >= circleIndex ? "filled" : ""}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="locked-level">
                  {isNextLevel ? (
                    <button className="active-btn" onClick={handleActivateNextLevel}>
                      Activate
                    </button>
                  ) : (
                    <RiLockLine size={24} />
                  )}
                </div>
              )}

              <div className="level-value">
                <div className="logo-usdt">
                  <GoPeople />
                  {level.maxUsers}
                </div>
                <div className="logo-usdt">
                  <HiOutlineArrowPath />
                  {level.recycleCount}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Notify />
      <UserTable />
    </>
  );
};

export default Levelx1;