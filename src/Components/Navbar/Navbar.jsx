import { useState, useEffect } from "react";
import { FaGripLines, FaRegBell } from "react-icons/fa6";
import Menu from "../DashboardMenu/Menu";
import DrawerIcon from '../../assets/icons/drawerIcon.png'
import AlertIcon from '../../assets/icons/alertIcon.png'
import { Link } from "react-router-dom";
import { HiMiniXMark } from "react-icons/hi2";
import { useAccount, useConnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Navbar = ({ home, setShowBar }) => {
  const [menu, setMenu] = useState(false);
  const { isConnected } = useAccount();
  const [notification, setNotification] = useState(false);

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
    setNotification(!notification);
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
  const [showSidebar, setShowSidebar] = useState(false)

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

          <img
            src={DrawerIcon}
            alt="drawer"
            className="h-3 w-3 object-cover"
          />
        </div>
        <Link className="flex justify-center items-center" to="/home">
          <img
            src="/assets/HomeImages/logo.png"
            alt="logo"
            className="h-9 w-12 ms-2   object-cover"
          />
          <p className="ml-4 font-medium" >theeagles.io</p>
        </Link>
        <div className="flex gap-2 p-4">
          <p className="text-textColor3 text-xs px-3 py-2 rounded-md bg-textColor3 bg-opacity-30 cursor-pointer">
            <div
              showBalance={false}
              accountStatus="address"
              chainStatus="none"
              label="Connect"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <p>Connect</p>
            </div>

          </p>

          <div onClick={hanldeNotification} className="bg-black bg-opacity-45 text-base p-3 rounded-full cursor-pointer">

            <img
              src={AlertIcon}
              alt="alerts"
              className="h-3 w-3 object-cover"
            />
          </div>

        </div>
      </div>

      {notification && (
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
      )}

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
      {showSidebar && <div
        style={{ zIndex: 10000 }}
        className={`absolute top-0 h-screen w-full bg-black py-4 px-3 transition-all duration-500 ${showSidebar ? 'right-0' : '-right-full'
          }`}
      >
        <div className='flex justify-end'>
          <div className='inline-block bg-Background p-2 rounded-full shadow-2xl'>
            <HiMiniXMark
              className='text-white text-3xl'
              onClick={() => setShowSidebar(false)}
            />
          </div>
        </div>

        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            onClick={() => handleConnect(wallet.name)}
            className='cursor-pointer mt-3 bg-zinc-900 text-textColor2 rounded-lg flex items-center gap-6 py-5 px-3'
          >
            <div className='h-16 w-16 bg-textColor3 rounded-full flex justify-center items-center'>
              <img
                src={wallet.image}
                alt={wallet.name}
                className='h-[48px] w-[48px]'
              />
            </div>
            <div>
              <h1 className='text-2xl font-medium text-textColor3'>
                {wallet.name}
              </h1>
              <p className='text-xs'>{wallet.description}</p>
            </div>
          </div>
        ))}

        <p className='text-textColor2 text-center mt-16 text-sm'>
          Got a Question?{' '}
          <span className='text-textColor3 font-medium'>Contact Support</span>
        </p>
      </div>}
    </div>
  );
};

export default Navbar;
