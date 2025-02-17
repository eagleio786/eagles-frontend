import { HiOutlineArrowPath } from "react-icons/hi2";
import Notify from "../Components/Lvl1/Notify";
import UserTable from "../Components/Lvl1/UserTable";
import { useState } from "react";
import { GoPeople } from "react-icons/go";
import { RiLockLine } from "react-icons/ri";

const Levelx2 = () => {
  const initialReferredUsers = 173;
  const [activeLevel, setActiveLevel] = useState(1);
  const levels = [
    { level: 1, cost: 2.5, maxUsers: 4, users: 0, recycleCount: 0 },
    { level: 2, cost: 5, maxUsers: 4, users: 0, recycleCount: 0 },
    { level: 3, cost: 10, maxUsers: 4, users: 0, recycleCount: 0 },
    { level: 4, cost: 20, maxUsers: 4, users: 0, recycleCount: 0 },
    { level: 5, cost: 40, maxUsers: 4, users: 0, recycleCount: 0 },
    { level: 6, cost: 80, maxUsers: 4, users: 0, recycleCount: 0 },
    { level: 7, cost: 160, maxUsers: 4, users: 0, recycleCount: 0 },
    { level: 8, cost: 320, maxUsers: 4, users: 0, recycleCount: 0 },
    { level: 9, cost: 640, maxUsers: 4, users: 0, recycleCount: 0 },
    { level: 10, cost: 1250, maxUsers: 4, users: 0, recycleCount: 0 },
    { level: 11, cost: 2500, maxUsers: 4, users: 0, recycleCount: 0 },
    { level: 12, cost: 5000, maxUsers: 4, users: 0, recycleCount: 0 },
  ];

  const updateLevelDetails = (level, referredUsers) => {
    const recycleCount = Math.floor(referredUsers / level.maxUsers);
    level.users = referredUsers % level.maxUsers;
    level.recycleCount = recycleCount;
    return level;
  };

  const updatedLevels = levels.map((level) => {
    if (level.level <= activeLevel) {
      return updateLevelDetails(level, initialReferredUsers);
    }
    return level;
  });

  const handleActivateNextLevel = () => {
    setActiveLevel((prevLevel) => Math.min(prevLevel + 1, 12));
  };
  return (
    <>
      <div className="text-white p-2 m-4 hello">
        <p>ID {345} / Theeagles.io x1 (1/12)</p>
        <div className="flex justify-between p-2 m-4 justify-start items-center">
          <p>Theeagles.io x1</p>
          <p>{234} USDT</p>
        </div>
      </div>
      <div className="x1program">
        {updatedLevels.map((level, index) => (
          <div className="levels" key={level.level}>
            <div className="level-value">
              <p>Level {level.level}</p>
              <div className="logo-usdt">
                <img
                  src="/assets/LoginImages/tether.png"
                  alt="Tether Logo"
                  className="h-[12px] w-auto"
                />
                <p>{level.cost}</p>
              </div>
            </div>
            {level.level <= activeLevel ? (
              <div className="circles-x1">
                <div className="all-circle">
                  <div className="flex-row2">
                    {[1].map((circleIndex) => (
                      <div
                        key={circleIndex}
                        className={`circle ${
                          level.users >= circleIndex ? "filled" : ""
                        }`}
                      ></div>
                    ))}
                  </div>
                  <div className="flex-row2">
                    {[2, 3, 4].map((circleIndex) => (
                      <div
                        key={circleIndex}
                        className={`circle ${
                          level.users >= circleIndex ? "filled" : ""
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="locked-level">
                {level.level === activeLevel + 1 ? (
                  <button
                    className="active-btn"
                    onClick={handleActivateNextLevel}
                  >
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
                {level.recycleCount * 4}
              </div>
              <div className="logo-usdt">
                <HiOutlineArrowPath />
                {level.recycleCount}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Notify />
      <UserTable />
    </>
  );
};

export default Levelx2;
