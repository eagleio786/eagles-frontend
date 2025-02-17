import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Landingpage from './Pages/Landingpage';
import Levelx1 from './Pages/Levelx1';
import Levelx2 from './Pages/Levelx2';
import UpgradeLvl1 from './Pages/UpgradeLvl1';
import UpgradeLvl2 from './Pages/UpgradeLvl2';
import Login from './Pages/Login';
import Authenticate from './Pages/Authenticate';
import Passid from './Pages/Passid';
import { useState, useEffect } from 'react';
import Stats from './Pages/Stats';
import Partner from './Pages/Partner';
import Links from './Pages/Links';
import Calculator from './Pages/Calculator';
import AccountSearch from './Pages/AccountSearch';
import Support from './Pages/Support';
import Register from './Components/Register/Register';
import Social from './Pages/Social';
import NumberRedirect from './NumberRedirect';
import SocialRewards from './Pages/SocialRewards';
import axios from 'axios';
import { useAccount } from 'wagmi';

const ProtectedRoute = ({ element, isConnected }) => {
  if (!isConnected) {
    return <Navigate to={'/'} />;
  }
  return element;
};

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

function App() {
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState('');

  useEffect(() => {
    if (isConnected && address) {
      fetchUser(address);
    }
  }, [address, isConnected]);

  const fetchUser = async (walletAddress) => {
    try {
      const response = await axios.get(
        `http://ec2-51-20-86-109.eu-north-1.compute.amazonaws.com/user/${walletAddress}`
      );
      setUser(response.data.data);
    } catch (err) {
      console.log(err.response?.data?.message || 'Error fetching user data');
    }
  };

  const hideNavbarFooterRoutes = [
    '/Upgradexone',
    '/Upgradextwo',
    '/login',
    '/auth',
    '/passId',
    '/',
    '/social',
    '/accountSearch',
    '/support',
    '/register',
    '/redirect',
  ];

  const [showHome, setShowHome] = useState(true);
  const [showBar, setShowBar] = useState(false);

  return (
    <>
      <ScrollToTop />
      <NumberRedirect />
      {!hideNavbarFooterRoutes.includes(location.pathname) && (
        <Navbar home={setShowHome} setShowBar={setShowBar} />
      )}
      <Routes>
        <Route path='/' element={<Landingpage />} />
        {showHome && (
          <Route
            path='/home'
            element={
              <ProtectedRoute
                element={<Home showBar={showBar} setShowBar={setShowBar} user={user} />}
                isConnected={isConnected}
              />
            }
          />
        )}
        <Route path='/social' element={
              <ProtectedRoute
                element={<Social />}
                isConnected={isConnected}
              />
            } />
        <Route path='/socialReward' element={
              <ProtectedRoute
                element={<SocialRewards />}
                isConnected={isConnected}
              />
            } />
        <Route path='/login' element={<Login />} />
        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile user={user} />} isConnected={isConnected} />}
        />
        {showHome && <Route path='/lvlxone' element={
              <ProtectedRoute
                element={<Levelx1 />}
                isConnected={isConnected}
              />
            } />}
        {showHome && <Route path='/lvlxtwo' element={
              <ProtectedRoute
                element={<Levelx2 />}
                isConnected={isConnected}
              />
            } />}
        <Route path='/Upgradexone' element={
              <ProtectedRoute
                element={<UpgradeLvl1 />}
                isConnected={isConnected}
              />
            } />
        <Route path='/Upgradextwo' element={
              <ProtectedRoute
                element={<UpgradeLvl2 />}
                isConnected={isConnected}
              />
            } />
        <Route path='/auth' element={<Authenticate />} />
        <Route path='/passId' element={
              <ProtectedRoute
                element={<Passid />}
                isConnected={isConnected}
              />
            } />
        <Route path='/register' element={<Register />} />
        {showHome && <Route path='/partner' element={
              <ProtectedRoute
                element={<Partner />}
                isConnected={isConnected}
              />
            } />}
        {showHome && (
          <Route path='/accountSearch' element={
              <ProtectedRoute
                element={<AccountSearch />}
                isConnected={isConnected}
              />
            } />
        )}
        {showHome && <Route path='/links' element={
              <ProtectedRoute
                element={<Links />}
                isConnected={isConnected}
              />
            } />}
        {showHome && <Route path='/stats' element={
              <ProtectedRoute
                element={<Stats />}
                isConnected={isConnected}
              />
            } />}
        {showHome && <Route path='/calculator' element={
              <ProtectedRoute
                element={<Calculator />}
                isConnected={isConnected}
              />
            } />}
        <Route path='/support' element={<Support />} />
        <Route path='/redirect' element={<Register />} />
      </Routes>
      {!hideNavbarFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
