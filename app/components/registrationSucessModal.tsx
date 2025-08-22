"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

interface RegistrationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userId?: string;
}

export const RegistrationSuccessModal: React.FC<RegistrationSuccessModalProps> = ({
  isOpen,
  onClose,
  userName = "Eagle",
  userId,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Auto redirect to dashboard after 4 seconds
      const timer = setTimeout(() => {
        handleContinue();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleContinue = () => {
    onClose();
    router.push("/dashboard");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <style>{`
        @keyframes modalFadeIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes overlayFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes welcome-bounce {
          0% { 
            opacity: 0;
            transform: translateY(30px) scale(0.8); 
          }
          50% { 
            opacity: 1;
            transform: translateY(-10px) scale(1.1); 
          }
          100% { 
            opacity: 1;
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes golden-sparkle {
          0%, 100% { 
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% { 
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }
        
        @keyframes success-glow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.4);
          }
          50% { 
            box-shadow: 0 0 50px rgba(251, 191, 36, 0.8);
          }
        }
        
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.33); opacity: 1; }
          80%, 100% { transform: scale(2.33); opacity: 0; }
        }
        
        .animate-modal-fade-in {
          animation: modalFadeIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-overlay-fade-in {
          animation: overlayFadeIn 0.3s ease-out;
        }
        
        .welcome-bounce {
          animation: welcome-bounce 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .golden-sparkle {
          animation: golden-sparkle 2s ease-in-out infinite;
        }
        
        .success-glow {
          animation: success-glow 3s ease-in-out infinite;
        }
        
        .text-shimmer {
          background: linear-gradient(90deg, #fbbf24, #f59e0b, #d97706, #fbbf24);
          background-size: 200% 100%;
          animation: text-shimmer 2s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        .float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }
        
        .pulse-ring {
          animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        body {
          overflow: hidden;
        }
      `}</style>

      {/* Full Screen Backdrop with Blur */}
      <div
        className="absolute inset-0 w-full h-full bg-black/90 backdrop-blur-md animate-overlay-fade-in"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />

      {/* Modal Container */}
      <div className="flex items-center justify-center min-h-full p-4 relative z-10">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-full blur-3xl float-gentle"></div>
        </div>

        {/* Golden Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="golden-sparkle absolute top-20 left-20 w-3 h-3 text-yellow-400">✨</div>
          <div className="golden-sparkle absolute top-32 right-16 w-2 h-2 text-amber-400" style={{animationDelay: '0.5s'}}>⭐</div>
          <div className="golden-sparkle absolute bottom-40 left-32 w-3 h-3 text-yellow-300" style={{animationDelay: '1s'}}>💫</div>
          <div className="golden-sparkle absolute bottom-20 right-20 w-2 h-2 text-amber-300" style={{animationDelay: '1.5s'}}>✨</div>
        </div>

        {/* Modal */}
        <div className="relative w-full max-w-sm mx-auto bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border-2 border-yellow-500/40 rounded-2xl shadow-2xl animate-modal-fade-in success-glow">
          
          {/* Content */}
          <div className="p-6 text-center">
            {/* Success Icon with pulse rings */}
            <div className="mb-6 flex justify-center relative welcome-bounce">
              <div className="absolute inset-0 rounded-full bg-yellow-400 pulse-ring"></div>
              <div className="relative w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-xl">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Welcome Message - Reduced Text */}
            <div className="mb-6 welcome-bounce" style={{animationDelay: '0.2s'}}>
              <h2 className="text-xl sm:text-2xl font-bold text-shimmer mb-2">
                ✨ Welcome On Board!
              </h2>
              <p className="text-gray-300 text-sm">
                Welcome to TheEagles.io
              </p>
            </div>

            {/* Success Stats - Compact */}
            <div className="mb-6 grid grid-cols-2 gap-3 welcome-bounce" style={{animationDelay: '0.4s'}}>
              <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg p-3 border border-yellow-500/30">
                <div className="text-yellow-400 font-bold text-lg">✓</div>
                <div className="text-gray-300 text-xs">Registration</div>
              </div>
              <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-lg p-3 border border-amber-500/30">
                <div className="text-amber-400 font-bold text-lg">🚀</div>
                <div className="text-gray-300 text-xs">Ready to Earn</div>
              </div>
            </div>

            {/* Continue Button */}
            {/* <button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 mb-4 welcome-bounce"
              style={{animationDelay: '0.6s'}}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>Continue</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button> */}

            {/* Auto Redirect Info */}
            <div className="text-center welcome-bounce" style={{animationDelay: '0.8s'}}>
              <p className="text-gray-400 text-xs">
                Welcome in the world of earnings
              </p>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="h-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-b-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessModal;