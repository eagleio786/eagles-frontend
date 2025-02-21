import React, { useEffect, useState } from 'react';
import { GrLinkNext } from 'react-icons/gr';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import { IoBookOutline, IoCopy } from 'react-icons/io5';
import History from '../Components/Home/History';
import DocumentationSlider from '../Components/LandingPage/DocumentationSlider';
import FAQ from '../Components/LandingPage/FAQ';
import Social from '../Components/LandingPage/Social';
import { IoIosChatbubbles } from 'react-icons/io';

function Landingpage() {
  const [activeTab, setActiveTab] = useState('USDT');
  const navigate = useNavigate();

  const slides = [
    {
      title: 'Documentation',
      subtitle: 'Practical Learning Platform',
      buttonText: 'Start Learning',
      icon: <IoBookOutline className='text-textColor2 opacity-45 text-7xl' />,
    },
    {
      title: 'Live chat',
      subtitle:
        'Platform where you can ask a question to experienced participants',
      buttonText: 'Find a mentor',
      icon: (
        <IoIosChatbubbles className='text-textColor2 opacity-45 text-6xl' />
      ),
    },
  ];

  const [showToast, setShowToast] = useState(false);

  const handleCopy = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      {showToast && (
        <div className='fixed top-5 right-5 bg-gray-800 text-gray-200 py-2 px-4 rounded-lg shadow-2xl transform animate-quickAlert'>
          🔗 Link copied!
        </div>
      )}

      <div className='overflow-hidden'>
        <marquee behavior='scroll' direction='Left' scrollamount='7'>
          <div className='flex justify-between items-center py-2 gap-4 max-w-full'>
            <div className='text-textColor3 w-max whitespace-nowrap'>
              <p>
                All Participants &nbsp;
                <span className='text-[#2cd9ff]'>3 765 561</span>
              </p>
            </div>
            <span className='text-[#2cd9ff] text-2xl'>•</span>
            <div className='text-textColor3 w-max whitespace-nowrap'>
              <p>
                Joined in 24 hours &nbsp;
                <span className='text-[#2cd9ff]'>34</span>
              </p>
            </div>
            <span className='text-[#2cd9ff] text-2xl'>•</span>
            <div className='text-textColor3  w-max whitespace-nowrap'>
              <p>
                Profit users result &nbsp;
                <span className='text-[#2cd9ff]'>3 674 764 788</span>
              </p>
            </div>
          </div>
        </marquee>
        <div className='h-[42vh] w-full bg-[#3939396c] relative text-white flex flex-col justify-center items-center overflow-hidden'>
          {/* Background Video */}
          <video
            src='/intro.mp4'
            autoPlay
            loop
            muted
            playsInline
            className='absolute top-0 left-0 opacity-80 w-full h-full object-cover'
          ></video>

          {/* Overlay to Darken the Video */}
          <div className='absolute top-0 left-0 w-full h-full bg-black opacity-30'></div>

          {/* Logo */}
          <div className='ms-3 pt-2 flex justify-center items-center z-10'>
            <img
              src='/assets/HomeImages/logo.png'
              alt='logo'
              className='h-16 w-16'
            />
          </div>

          {/* Title */}
          <p className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r uppercase font-sans italic from-[#ffa14c] via-[#ffa14e] to-[#6a2cfa] z-10'>
            the eagles.io
          </p>

          {/* Buttons */}
          <div className='flex justify-between px-2 mt-8 w-[90%] z-10'>
            <div className='w-[45%]'>
              <Link to='/login' state={{ type: 'login' }}>
                <button
                  className={`w-[80%] py-2 rounded-full text-white bg-gradient-to-r from-[#1a1303] to-[#a67912] h-[40px] cursor-pointer`}
                >
                  Sign in
                </button>
              </Link>
            </div>
            <div className='w-[50%]'>
              <Link to='/login' state={{ type: 'register' }}>
                <button
                  className={`w-[80%] py-2 rounded-full text-white bg-gradient-to-r from-[#1a1303] to-[#a67912] h-[40px] cursor-pointer`}
                >
                  <div className='flex items-center justify-center gap-2'>
                    Register
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className='w-[80%] mx-auto mt-2'>
          <p className='text-white font-medium text-center my-3'>
            A decentralized networking platform based on smart contracts, which{' '}
            <span className='text-[#a67912]'>brings people together</span> from
            all over the world and{' '}
            <span className='text-[#a67912]'>
              opens up endless possibilities
            </span>{' '}
            new economic financial systems
          </p>
        </div>
        <div className='mt-[20px] flex justify-center items-end'>
          <div className='h-auto w-[85%] bg-Background rounded-lg px-5 pt-4'>
            <Swiper
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className='mySwiper h-full'
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <p className='text-lg font-medium text-textColor3'>
                    {slide.title}
                  </p>
                  <p className='text-xs text-textColor2'>{slide.subtitle}</p>
                  <div className='flex items-center justify-between my-7'>
                    <p className='flex items-end gap-2 text-textColor3 text-lg'>
                      {slide.buttonText} <GrLinkNext />
                    </p>
                    {slide.icon}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className='relative mt-20 h-44 '>
          <p className='text-textColor3 text-xs w-4/5 text-center mx-auto font-medium'>
            <span className='text-[#a67912] font-bold'>The Eagles School</span>{' '}
            is an exclusive training course designed specifically for the who
            want to unlock thier full potential with The Eagles.io!
          </p>
          <div className='w-4/5 mx-auto'>
            <button className='bg-Background bg-opacity-75 text-[#a67912] font-medium mt-3 py-2 rounded-full w-full'>
              Go to School
            </button>
          </div>
        </div>
        <div className='h-20 flex flex-col justify-end ps-6'>
          <h1 className='text-textColor3 text-2xl mb-4 font-medium'>
            Platform recent activity
          </h1>
          <p className='text-slate-300 text-sm mb-6'>
            Real-time globle event of the The Eagles.io Platform
          </p>
        </div>
        <History />
        <div className='bg-[#292929] border border-slate-500 rounded shadow-md h-auto px-2 py-5'>
          <h1 className='text-textColor3 font-semibold text-3xl'>
            Partner result
          </h1>
          <p className='text-textColor2 text-sm w-11/12 mt-3'>
            All data is stored in the blockchain in the public domain and can be
            verified?
          </p>
          <div className='mt-8 text-sm space-y-5'>
            <p className='text-textColor2'>
              Contract address <span className='text-textColor3'>USDT:</span>
            </p>
            <h5 className='text-textColor3 text-sm flex gap-2'>
              ox5acc77e655....doo5f00FB87:
              <span className='text-xl'>
                <IoCopy onClick={() => handleCopy('theeagles.io/******')} />
              </span>
            </h5>
          </div>

          <div className='mt-8 flex flex-col items-center'>
            <div className='inline-block bg-textColor2 bg-opacity-30 rounded-full px-2 py-2'>
              <div
                className={`cursor-pointer px-4 py-2  font-bold ${
                  activeTab === 'USDT'
                    ? 'bg-textColor3 rounded-full text-black'
                    : 'text-gray-300'
                }`}
              >
                USDT
              </div>
            </div>
            <div className='mt-5 text-center'>
              <div className='text-4xl font-bold text-white'>
                3 395 780 <sup className='text-[#a67912] text-base'>+422</sup>
              </div>
              <div className='text-2xl font-bold text-white mt-2'>
                1 469 653 628{' '}
                <sup className='text-[#a67912] text-base'>+8 284</sup>
              </div>
              <div className='mt-2 text-sm text-textColor2'>
                Total result, USDT
              </div>
            </div>
          </div>
        </div>
        <DocumentationSlider />
        <FAQ />
        <Social />
        <Footer />
      </div>
    </>
  );
}

export default Landingpage;
