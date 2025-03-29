import { useState, useEffect, useCallback } from "react";
import { FaGripLines, FaRegBell } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { resetNewNotifications } from "../../redux/notificationSlice";
import Menu from "../DashboardMenu/Menu";
import DrawerIcon from "../../assets/icons/drawerIcon.png";
import AlertIcon from "../../assets/icons/alertIcon.png";
import { Link } from "react-router-dom";
import { HiMiniXMark } from "react-icons/hi2";
import { useAccount, useConnect, useWatchContractEvent } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { collection, getDoc, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { snapshot } from "viem/actions";
import { ABI, ContractAdress } from "../../Config/config";

const MAX_NOTIFICATIONS = 100;
const TARGET_ADDRESS = "0xB853412126499360Cb12b3118AefEee135D27227"

const Navbar = ({ home, setShowBar }) => {
  const [menu, setMenu] = useState(false);
  const { isConnected } = useAccount();
  const [notification, setNotification] = useState(false);
  // const unreadCount = useSelector((state) => state.notifications.unreadCount);
  // const newNotifications = useSelector(
  //   (state) => state.notifications.newNotifications
  // );
  const [newNotifications, setNewNotifications] = useState([])
  const { address } = useAccount()
  const TARGET_ADDRESS = address

  useWatchContractEvent({
    address: ContractAdress,
    abi: ABI,
    eventName: "FundsDistributed",
    args: {
      to: TARGET_ADDRESS,
    },
    onLogs(logs) {
      setNewNotifications(logs)
    },
  });

  const fetchUserIds = async (notifications) => {
    try {
      const userIdPromises = notifications.map(async (notification) => {
        try {
          const userDetails = await users(notification.from);
          const userId = userDetails[1]?.toString() || "Unknown User";

          return {
            ...notification,
            userId: userId,
          };
        } catch (error) {
          console.error(
            `Error fetching user ID for ${notification.from}:`,
            error
          );
          return {
            ...notification,
            userId: "Unknown User",
          };
        }
      });

      return await Promise.all(userIdPromises);
    } catch (error) {
      console.error("Error in fetchUserIds:", error);
      return notifications;
    }
  };


  useEffect(() => {

    const getNotifications = async () => {
      const fundsDistributedEvent = parseAbiItem(
        "event FundsDistributed(address indexed from, address indexed to, uint8 matrix, uint256 level, uint256 amount)"
      );

      const block = await publicClient.getBlockNumber();
      const logs = await publicClient.getLogs({
        address: CONTRACT_ADDRESS,
        event: fundsDistributedEvent,
        fromBlock: 0,
        toBlock: block - 500n,
        args: {
          to: TARGET_ADDRESS
        }
        // fromBlock: BigInt(block)- 999n,
        // toBlock: block,
      });
      const notificationWithSenderIds = await fetchUserIds(
        logs
          .map(log => log.args)
          .map(log => ({
            ...log,
            amount: log.amount / 100000000000000000n
          }))
      )
      return notificationWithSenderIds
    }

    const f = async () => {
      const currentNotifications = localStorage.getItem('currentNotifications')
      if(!currentNotifications) localStorage.setItem('currentNotifications', JSON.stringify(await getNotifications()))

      setInterval(async () => {
        const newNotifications = JSON.stringify(await getNotifications())
        const currentNotifications = localStorage.getItem('currentNotifications')
        if(newNotifications != currentNotifications) setNewNotifications(JSON.parse(newNotifications))
      }, 1000);
    }
    f()
  }, [])

  const dispatch = useDispatch();

  const wallets = [
    // {
    //   id: 1,
    //   name: "Trust Wallet",
    //   description: "DApp in App",
    //   image: "/assets/AuthImages/trust.png",
    //   type: "trustwallet",
    // },
    // {
    //   id: 2,
    //   name: "TokenPocket",
    //   description: "DApp in App",
    //   image: "/assets/AuthImages/pocket.png",
    //   type: "injected",
    // },
    // {
    //   id: 3,
    //   name: "MetaMask",
    //   description: "Desktop/DApp in App",
    //   image: "/assets/AuthImages/Mask.png",
    //   type: "metamask",
    // },
    {
      id: 4,
      name: "WalletConnect",
      description: "Any Wallet and browser",
      image: "/assets/AuthImages/connect.png",
      type: "walletconnect",
    },
  ];

  const handleMenu = () => {
    setMenu(!menu);
    home(false);
  };

  const hanldeNotification = () => {
    // setNotification(!notification);
    localStorage.setItem('currentNotifications', JSON.stringify(newNotifications))
    setNewNotifications([])
    dispatch(resetNewNotifications());
  };

  const handleRendering = () => {
    setMenu(false);
    home(true);
  };

  useEffect(() => {
    if (menu) {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "auto";
    }

    return () => {
      document.body.style.overflowX = "auto";
    };
  }, [menu]);
  const [showSidebar, setShowSidebar] = useState(false);

  const { connectors, connect } = useConnect();
  const handleConnect = (walletName) => {
    const connector = connectors.find(
      (c) => c.name.toLowerCase() === walletName.toLowerCase()
    );
    if (connector) {
      connect({ connector });
      setShowSidebar(false);
    }
  };

  return (
    <div className="relative bg-[#1C1F2E]">
      <div className="text-white flex items-center pl-2 justify-between">
        <div
          className="bg-black bg-opacity-45 flex items-center cursor-pointer text-sm p-3 rounded-full"
          onClick={handleMenu}
        >
          <img src={DrawerIcon} alt="drawer" className="h-3 w-3 object-cover" />
        </div>
        <Link className="flex justify-center items-center" to="/home">
          <img
            src="/assets/HomeImages/logo.png"
            alt="logo"
            className="h-9 w-12 ms-2   object-cover"
          />
          <p className="ml-4 font-medium">theeagles.io</p>
        </Link>
        <div className="flex gap-2 p-4">
          <p className="text-textColor3 text-xs px-3 py-2 rounded-md bg-textColor3 bg-opacity-30 cursor-pointer">
            {isConnected ? (
              <ConnectButton
                showBalance={false}
                accountStatus="address"
                chainStatus="none"
                label="Connect"
              />
            ) : (
              <div
                showBalance={false}
                accountStatus="address"
                chainStatus="none"
                label="Connect"
                style={{ cursor: "pointer" }}
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <p>Connect</p>
              </div>
            )}
          </p>

          <Link
            onClick={hanldeNotification}
            to="/notifications"
            className="bg-black bg-opacity-45 text-base p-3 rounded-full cursor-pointer"
          >
            <img
              src={AlertIcon}
              alt="alerts"
              className="h-3 w-3 object-cover"
            />
            {newNotifications.length > 0 && (
              <span style={{ borderRadius: 100, height: 10 }} className="absolute top-2 right-5 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">

              </span>
            )}
          </Link>
        </div>
      </div>

      {/* {notification && (
        <div className="bg-white shadow-lg rounded-lg p-3 absolute w-[90%] sm:w-[60%] md:w-[40%] lg:w-[25%] h-auto z-50 top-14 right-4 animate-fadeIn">
          <div className="flex justify-between items-center border-b pb-2">
            <h1 className="font-semibold text-sm text-black">
              New Notification
            </h1>
            <p
              className="cursor-pointer text-gray-600 hover:text-black text-lg"
              onClick={() => setNotification(false)}
            >
              &times;
            </p>
          </div>
          <p className="text-gray-700 text-sm mt-2">
            New notification! Stay updated with the latest updates and important
            alerts.
          </p>
          <p className="text-gray-700 text-sm mt-4">
            New notification! Stay updated with the latest updates and important
            alerts.
          </p>
        </div>
      )} */}

      {menu && (
        <div className="absolute top-0 h-[135vh] w-full text-textColor3 bg-black transition-all duration-500">
          <div className="px-3 flex items-center justify-between border-b border-textColor2">
            <div className="w-[70px]">
              <img
                src="/assets/HomeImages/logo.png"
                alt="logo"
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>

            <div className="flex justify-end py-4">
              <div className="inline-block bg-gray-800 p-2 rounded-full shadow-2xl">
                <HiMiniXMark
                  className="text-white text-3xl cursor-pointer"
                  onClick={handleRendering}
                />
              </div>
            </div>
          </div>
          <Menu menu={setMenu} home={home} />
        </div>
      )}
      {showSidebar && (
        <div
          style={{ zIndex: 10000 }}
          className={`absolute top-0 h-screen w-full bg-black py-4 px-3 transition-all duration-500 ${showSidebar ? "right-0" : "-right-full"
            }`}
        >
          <div className="flex justify-end">
            <div className="inline-block bg-Background p-2 rounded-full shadow-2xl">
              <HiMiniXMark
                className="text-white text-3xl"
                onClick={() => setShowSidebar(false)}
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
      )}
    </div>
  );
};

export default Navbar;
