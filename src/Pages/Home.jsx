import { GoArrowUpRight } from "react-icons/go";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoCopy, IoPersonCircleSharp, IoSettingsSharp } from "react-icons/io5";
import Cards from "../Components/Home/Cards";
import Program from "../Components/Home/Program";
import Members from "../Components/Home/Members";
import Contract from "../Components/Home/Contract";
import History from "../Components/Home/History";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { useConnect, useDisconnect, useAccount, useSwitchChain } from "wagmi";
import chainConfig from "../Config/chainConfig";
import {
  getCurrentX1Level,
  getCurrentX2Level,
  getTotalUSDTReceived,
  users,
} from "../Config/Contract-Methods";
import axios from "axios";
const Home = ({ showBar, setShowBar, user }) => {
  const [showDetails, setShowDetails] = useState(true);
  const navigate = useNavigate();
  const { connectors, connect } = useConnect();
  const { isConnected, address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  console.log("user", address);

  const [Profit, setProfit] = useState("");
  const [Profit24, setProfit24] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [userData, setUserData] = useState(null);
  const [referralData, setReferralData] = useState(null);

  const handleCopy = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await users(address);

        const referralId = result[1].toString();

        const referralResponse = await axios.get(
          `http://ec2-51-20-86-109.eu-north-1.compute.amazonaws.com/refferal/${referralId}`
        );
        console.log("Referral Data:", referralResponse.data);
        setReferralData(referralResponse.data);
        console.log("userdata", referralResponse.data);

        setUserData(result);
      } catch (error) {
        console.error("Error fetching user or referral data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const referralResponse = await axios.get(
          `http://ec2-51-20-86-109.eu-north-1.compute.amazonaws.com/get24hrsUSDT`
        );
        setProfit(referralResponse.data.totalUSDTReceivedAllTime);
        setProfit24(referralResponse.data.totalUSDTReceivedLast24Hours);
      } catch (error) {
        console.error("Error fetching user or referral data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (isConnected && chain?.id) {
      const targetChainId = chainConfig[11155111]?.id;
      if (chain.id !== targetChainId) {
        switchChain({ chainId: targetChainId });
      }
    }
  }, [chain, isConnected]);

  const handleConnect = (walletName) => {
    const connector = connectors.find(
      (c) => c.name.toLowerCase() === walletName.toLowerCase()
    );
    if (connector) {
      connect({ connector });
      setShowBar(false);
    }
  };
  const [getUsdt, setGetUsdt] = useState();
  const [getlevelX1, setGetlevelX1] = useState();
  const [getlevelX2, setGetlevelX2] = useState();
  useEffect(() => {
    const fetchUSDT = async () => {
      try {
        if (isConnected && address) {
          let getWalletAddress = await getTotalUSDTReceived(address);
          setGetUsdt(getWalletAddress.toString());
          let getCurrentlevelX1 = await getCurrentX1Level(address);
          setGetlevelX1(getCurrentlevelX1.toString());
          let getCurrentlevelX2 = await getCurrentX2Level(address);
          setGetlevelX2(getCurrentlevelX2.toString());
        }
      } catch (error) {
        console.error("Error fetching USDT:", error);
      }
    };
    fetchUSDT();
  }, [isConnected, address]);

  const wallets = [
    {
      id: 1,
      name: "Trust Wallet",
      description: "DApp in App",
      image: "/assets/AuthImages/trust.png",
    },
    {
      id: 2,
      name: "TokenPocket",
      description: "DApp in App",
      image: "/assets/AuthImages/pocket.png",
    },
    {
      id: 3,
      name: "MetaMask",
      description: "DApp in App",
      image: "/assets/AuthImages/Mask.png",
    },
    {
      id: 4,
      name: "WalletConnect",
      description: "Any Wallet and browser",
      image: "/assets/AuthImages/connect.png",
    },
  ];

  return (
    <>
      {showToast && (
        <div className="fixed top-5 right-5 bg-gray-800 text-gray-200 py-2 px-4 rounded-lg shadow-2xl transform animate-quickAlert">
          🔗 Link copied!
        </div>
      )}

      <div className="relative overflow-hidden">
        <div
          className={`absolute top-0 h-screen w-full bg-black py-4 px-3 transition-all duration-500 z-50 ${
            showBar ? "right-0" : "-right-full"
          }`}
        >
          <div className="flex justify-end">
            <div className="inline-block bg-Background p-2 rounded-full shadow-2xl">
              <HiMiniXMark
                className="text-white text-3xl"
                onClick={() => setShowBar(false)}
              />
            </div>
          </div>

          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              onClick={() => handleConnect(wallet.name)}
              className="cursor-pointer mt-3 bg-zinc-900 text-textColor2 rounded-lg flex items-center gap-6 py-5 px-3"
            >
              <div className="h-16 w-16 bg-textColor3 rounded-full flex justify-center items-center">
                <img
                  src={wallet.image}
                  alt={wallet.name}
                  className="h-[48px] w-[48px]"
                />
              </div>
              <div>
                <h1 className="text-2xl font-medium text-textColor3">
                  {wallet.name}
                </h1>
                <p className="text-xs">{wallet.description}</p>
              </div>
            </div>
          ))}

          <p className="text-textColor2 text-center mt-16 text-sm">
            Got a Question?{" "}
            <span className="text-textColor3 font-medium">Contact Support</span>
          </p>
        </div>
        <div className="w-full px-4 pt-6 pb-5 homebg bg-[#a67a1240]">
          <div className="relative">
            <div className="absolute inset-0 h-full opacity-10 left-20 -top-3">
              <img
                src="assets/HomeImages/eaglebg.jpg"
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-eagles relative inset-0 z-10">
              <div className="h-auto flex justify-between">
                <div className="flex gap-6">
                  <div className="gradient-border h-20 w-20 rounded-full ms-3">
                    <div className="relative flex items-center justify-center text-white h-full w-full rounded-full bg-Background">
                      <p className="text-[#bcbcbc] shadow-md absolute shadow-white rounded-full">
                        <IoPersonCircleSharp className="text-7xl text-textColor3" />
                      </p>
                      <img
                        src="/assets/HomeImages/logo.png"
                        alt="logo"
                        className="h-7 w-7 ms-2 object-cover absolute bottom-2 -right-6 rounded-full"
                      />
                      <Link to="/social" className="absolute -bottom-7">
                        <div className="w-28 rounded-full p-[2px] bg-gradient-to-r from-[#a67912] via-white to-white">
                          <div className="bg-[#433108] rounded-full text-xs px-2 flex items-center justify-between py-1">
                            <p className="text-slate-400">Social</p>
                            <span className="flex gap-1 items-center">
                              <FaHeart className="text-pink-400" />
                              526
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="text-textColor3 ml-8 ">
                    <h1 className="text-2xl font-semibold font-sans capitalize">
                      {user?.name}
                    </h1>
                    <p className="text-lg text-yellow-300 italic font-medium">
                      ID {userData?.[1]?.toString() ?? "Loading..."}
                    </p>
                    <button
                      className="mt-8 text-base flex gap-2 items-center justify-center bg-Background shadow-xl shadow-[#00000079] transition-all ease-in-out text-textColor2 w-44 py-1 rounded-full"
                      onClick={() => setShowDetails(!showDetails)}
                    >
                      {showDetails ? "Show less" : "Show more"}
                      <span>
                        {showDetails ? (
                          <IoIosArrowUp className="text-base" />
                        ) : (
                          <IoIosArrowDown className="text-base" />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
                <div>
                  <IoSettingsSharp
                    className="text-textColor3 text-3xl mt-1"
                    onClick={() => navigate("/profile")}
                  />
                </div>
              </div>
              {showDetails && (
                <div className="mt-3">
                  <div className="flex gap-x-2 items-center text-sm text-textColor3">
                    <p>
                      {referralData?.data?.[0]?.referrer
                        ? `${referralData.data[0].referrer.slice(
                            0,
                            6
                          )}...${referralData.data[0].referrer.slice(-6)}`
                        : ""}
                    </p>

                    <IoCopy
                      onClick={() =>
                        handleCopy(referralData?.data?.[0]?.referrer)
                      }
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex gap-2 items-center text-textColor3 text-sm">
                    <p>
                      Invited{" "}
                      {referralData?.data?.[0]?.createdAt
                        ? new Date(
                            referralData.data[0].createdAt
                          ).toLocaleDateString()
                        : "N/A"}{" "}
                      by
                    </p>
                    <p className="px-3 flex justify-center text-yellow-300 shadow-lg shadow-[#00000079] font-medium text-base bg-[#333333] bg-opacity-35  rounded-full italic">
                      ID{" "}
                      {referralData
                        ? referralData?.data?.[0]?.id
                        : "Loading..."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#a67912] shadow-xl shadow-[#00000079] bg-opacity-20 w-full px-2 py-5  rounded-lg mt-6">
            <div className="flex items-center justify-between text-base mb-5">
              <h5 className="text-textColor3">My Personal link</h5>
              <p className="text-textColor3 text-base font-sans font-medium flex gap-2 items-center">
                theeagles.io/{userData?.[1]?.toString() ?? "Loading..."}
                <span>
                  <GoArrowUpRight className="text-textColor3 text-lg" />
                </span>
              </p>
            </div>
            <div className="text-lg flex gap-3">
              <button
                className="bg-[#a67912] w-full text-textColor3 shadow-xl shadow-[#00000079] font-medium px-6 py-1 rounded-full"
                onClick={() => handleCopy(`theeagles.io/${userData?.[1]}`)}
              >
                Copy
              </button>
              <button className="w-full bg-textColor3 shadow-lg shadow-[#00000079] font-medium px-6 rounded-full">
                Share
              </button>
            </div>
          </div>

          <Cards
            referralData={referralData}
            getUsdt={getUsdt}
            profit={Profit}
            Profit24={Profit24}
          />
          <Program getlevelX1={getlevelX1} getlevelX2={getlevelX2} />
          <Members />
          <Contract />
          <History />
        </div>
      </div>
    </>
  );
};

export default Home;
