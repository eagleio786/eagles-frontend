import axios from "axios";
import { useEffect, useState } from "react";
import { IoWallet } from "react-icons/io5";
import { RiShare2Line } from "react-icons/ri";
import { ApiUrl } from "../../Config/config";
import { useNavigate } from "react-router-dom";

const History = ({ id }) => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [history, setHistory] = useState([]);

  const handleSeeMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  const userID = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`${ApiUrl}/getCompleteReferralChain/${id ? id : userID}`)
      .then((res) => {
        console.log("Complete Referral Chain Response:", res.data);
        const formattedData = res.data.data.referralChain.map((data) => {
          const totalUsdt = (parseFloat(data.totalUSDTReceived.$numberDecimal) / 1e18).toFixed(2);
          const level = "x1";
          const formattedTime = new Date(data.updatedAt).toLocaleTimeString();
          const timeInMinutesHours = formattedTime.split(":");
          const time = `${timeInMinutesHours[0]} hours`;
          return {
            id: data.id,
            icon: <IoWallet />,
            Paymentid: data.id,
            payment: `+${totalUsdt} USDT`,
            level: level,
            time: time,
          };
        });
        setHistory(formattedData);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="mt-7 mb-3 pb-6 bg-Background shadow-xl shadow-[#00000079] rounded-xl ">
        <div className="overflow-scroll h-[470px]">
          {history.length > 0 ? (
            history
              .reverse()
              .slice(0, visibleItems)
              .map((history, index) => {
                return (
                  <div
                    onClick={() => navigate(`/home/${history.id}`)}
                    key={index}
                    className="w-full h-auto border-b border-textColor2 flex justify-between items-center px-3 py-4 cursor-pointer"
                  >
                    <div className="flex gap-3">
                      <div className=" text-3xl h-10 justify-center items-center flex w-10 rounded-full">
                        <img
                          src="/assets/HomeImages/logo.png"
                          alt="logo"
                          className="h-10 w-10 ms-2 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h1 className="text-[#a67912] text-base">
                          {history.Paymentid}
                        </h1>
                        <p className="text-textColor2 flex gap-1 text-sm">
                          <span className="text-textColor3">
                            {history.payment}
                          </span>
                          in
                          <span className="text-[#a67912]">
                            {history.level}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="flex gap-2 text-textColor2">
                        ~{history.time}
                        <span className="text-textColor3 text-xl rotate-45">
                          <RiShare2Line />
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="flex justify-center items-center h-48">
              <p className="text-textColor3">No Referrals Found</p>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSeeMore}
              className="text-textColor3 w-3/4 bg-gradient-to-r from-[#a67912] to-[#1a1303] shadow-xl shadow-[#00000079] rounded-lg py-3 font-medium"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default History;
