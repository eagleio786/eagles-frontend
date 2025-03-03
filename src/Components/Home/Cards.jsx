import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { BsShare } from "react-icons/bs";
import { GoArrowUp } from "react-icons/go";
import { ApiUrl } from "../../Config/config";
import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import client from "../../Pages/apolloClient";
import { GET_FUNDS_DISTRIBUTED } from "../../Pages/queries";

const Cards = ({ PT, userData }) => {
  const [partner24hCount, setPartner24hCount] = useState(0);
  const [team24hCount, setTeam24hCount] = useState(0);
  const [total24hProfit, setTotal24hProfit] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [Par, setPar] = useState();
  const [Par24, setPar24] = useState();
  const totalProfit = userData?.[4]?.toString() / 1e18;
  const userId = userData[1]?.toString();
  const { address } = useAccount();

  const apiFun = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/refferal/${userId}`);
      setPar(response?.data?.TotalPartners);
      setPar24(response?.data?.Last24hrsPartners);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios.get(`${ApiUrl}/getCompleteReferralChain/${userId}`).then((res) => {
      const referralChain = res.data.data.referralChain;
      const last24Hours = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

      // Direct referrals within the last 24 hours
      const partner24hCountss = referralChain.filter(
        (user) =>
          user.referrer === PT.Personal &&
          new Date(user.createdAt) >= last24Hours
      ).length;
      setPartner24hCount(partner24hCountss);

      const getTotalTeamCount = (chain) => {
        let count = chain.length;
        for (let user of chain) {
          if (user.referrals && user.referrals.length > 0) {
            count += getTotalTeamCount(user.referrals);
          }
        }
        return count;
      };

      setTeamCount(getTotalTeamCount(referralChain));

      // Recursive team calculation in last 24h
      const getTeam24hCount = (chain) => {
        let count = 0;
        for (let user of chain) {
          if (new Date(user.createdAt) >= last24Hours) {
            count++;
          }
          if (user.referrals && user.referrals.length > 0) {
            count += getTeam24hCount(user.referrals);
          }
        }
        return count;
      };

      setTeam24hCount(getTeam24hCount(referralChain));

      // Total 24h Profit
      const total24hProfitss = referralChain
        .filter((user) => new Date(user.updatedAt) >= last24Hours)
        .reduce(
          (sum, user) =>
            sum + parseFloat(user.totalUSDTReceived.toString()) / 1e18,
          0
        );
      setTotal24hProfit(total24hProfitss);
    });
    apiFun();
  }, [userId, PT.Personal]);

  // Query for total earnings using GraphQL
  const getUnixTimestamp24HrsAgo = () => {
    return Math.floor(Date.now() / 1000) - 24 * 60 * 60;
  };

  const timestamp = useMemo(() => getUnixTimestamp24HrsAgo(), []);
  const walletAddress = useMemo(() => address, [address]);

  const { loading, error, data } = useQuery(GET_FUNDS_DISTRIBUTED, {
    client,
    variables: { walletAddress, timestamp },
    fetchPolicy: "cache-first",
    skip: !walletAddress,
  });

  const calculateTotalEarnings = (transactions) => {
    const uniqueTransactions = new Set();
    let totalEarnings = BigInt(0);

    transactions.forEach(({ amount, trxId }) => {
      if (!uniqueTransactions.has(trxId)) {
        uniqueTransactions.add(trxId);
        totalEarnings += BigInt(amount);
      }
    });

    return totalEarnings;
  };

  const formatEarnings = (totalEarnings) => {
    const divisor = BigInt(1e18);
    return (Number(totalEarnings) / Number(divisor)).toFixed(2);
  };

  const totalEarnings = useMemo(
    () => calculateTotalEarnings(data?.fundsDistributeds || []),
    [data]
  );
  const formattedEarnings = useMemo(
    () => formatEarnings(totalEarnings),
    [totalEarnings]
  );

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
          <p>
            {totalProfit ? totalProfit.toFixed(2) : "0"}
            USDT
          </p>
          <p className="flex items-center gap-1 text-green-600">
            <GoArrowUp />
            {loading ? "Loading..." : formattedEarnings || "0"}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <StatCard title="Partners" count={Par} count24={Par24} bg="bg-person2" />
        <StatCard
          title="Team"
          count={teamCount}
          count24={team24hCount}
          bg="bg-person3"
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, count, count24, bg }) => {
  return (
    <div
      className={`bg-Background px-2 shadow-xl shadow-[#00000079] py-3 w-1/2 rounded-lg ${bg}`}
    >
      <p className="text-textColor3 text-base flex items-center gap-2">
        {title}
        <span className="bg-[#5c5c5c] rounded-full p-1">
          <BsShare className="text-textColor3" />
        </span>
      </p>
      <p className="text-3xl text-textColor3 font-semibold mt-1">
        {count || 0}
      </p>
      <div className="w-[85%] mx-auto mt-7 flex justify-between p-1 rounded-full bg-[#a67912] bg-opacity-20">
        <div className="flex items-center font-medium text-xl text-green-600">
          <GoArrowUp />
          {count24 || 0}
        </div>
        <div className="gradient-circle"></div>
      </div>
    </div>
  );
};

export default Cards;
