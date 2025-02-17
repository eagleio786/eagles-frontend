import { BsShare } from 'react-icons/bs';
import { GoArrowUp } from 'react-icons/go';

const Cards = ({ referralData, getUsdt, profit, Profit24 }) => {
  const partnerCount = referralData?.Partner ?? 0;
  const teamCount = referralData?.Team ?? 0;
  const USDTProfit = getUsdt / 1e18;
  const dailyProfit = Profit24 / 1e18;

  return (
    <div className="space-y-4">
      <div className="bg-Background w-full rounded-lg shadow-xl bg-image shadow-[#00000079] px-2 py-3">
        <div className="flex justify-between items-center">
          <p className="text-textColor3 font-semibold text-base flex items-center gap-2">
            Profits
            <span className="bg-[#5c5c5c] rounded-full p-1">
              <BsShare className="text-textColor3" />
            </span>
          </p>
        </div>
        <div className="flex justify-between font-semibold text-textColor3 mt-2">
          <p>{USDTProfit} USDT</p>
          <p className="flex items-center gap-1">
            <GoArrowUp /> {dailyProfit}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <StatCard title="Partners" count={partnerCount} bg="bg-person2" />
        <StatCard title="Team" count={teamCount} bg="bg-person3"/>
      </div>
    </div>
  );
};

const StatCard = ({ title, count, bg }) => {
  return (
    <div className={`bg-Background px-2 shadow-xl shadow-[#00000079] py-3 w-1/2 rounded-lg ${bg}`}>
      <p className="text-textColor3 text-base flex items-center gap-2">
        {title}
        <span className="bg-[#5c5c5c] rounded-full p-1">
          <BsShare className="text-textColor3" />
        </span>
      </p>
      <p className="text-3xl text-textColor3 font-semibold mt-1">{count}</p>
      <div className="w-[85%] mx-auto mt-7 flex justify-between p-1 rounded-full bg-[#a67912] bg-opacity-20">
        <div className="flex items-center text-white font-medium text-xl">
          <GoArrowUp /> 0
        </div>
        <div className="gradient-circle"></div>
      </div>
    </div>
  );
};

export default Cards;
