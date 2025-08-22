"use client";
import React from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <style>{`
        @keyframes modalFadeIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes overlayFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes icon-spin-glow {
          0% { 
            transform: rotate(0deg);
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
          }
          50% { 
            transform: rotate(180deg);
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.8);
          }
          100% { 
            transform: rotate(360deg);
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(234, 179, 8, 0.3);
          }
          50% { 
            box-shadow: 0 0 25px rgba(234, 179, 8, 0.6);
          }
        }
        
        @keyframes text-shimmer {
          0%, 100% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .animate-modal-fade-in {
          animation: modalFadeIn 0.3s ease-out;
        }
        
        .animate-overlay-fade-in {
          animation: overlayFadeIn 0.3s ease-out;
        }
        
        .icon-container {
          animation: icon-spin-glow 4s ease-in-out infinite;
        }
        
        .floating-element {
          animation: float 3s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .feature-item {
          transition: all 0.3s ease;
        }
        
        .feature-item:hover {
          transform: translateX(5px);
        }
        
        .shimmer-text {
          background: linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24);
          background-size: 200% 100%;
          animation: text-shimmer 3s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        body {
          overflow: hidden;
        }
      `}</style>

      {/* Full Screen Backdrop with Blur */}
      <div
        className="absolute inset-0 w-full h-full bg-black/80 backdrop-blur-md animate-overlay-fade-in"
        onClick={onClose}
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
      <div className="flex items-center justify-center min-h-full p-4 relative z-100">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-full blur-3xl floating-element"></div>
        </div>

        {/* Modal */}
        <div className="relative w-full max-w-md mx-auto bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border border-yellow-500/30 rounded-2xl shadow-2xl animate-modal-fade-in pulse-glow">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="icon-container w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white shimmer-text">Welcome to TheEagles.io</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Welcome Message */}
            <div className="mb-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-xl floating-element">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                Your success journey starts here
              </p>
            </div>

            {/* Features - Simplified */}
            <div className="mb-6">
              <div className="space-y-3">
                <div className="feature-item flex items-center space-x-3 text-gray-300 text-sm">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full floating-element"></div>
                  <span>Smart contract platform</span>
                </div>
                <div className="feature-item flex items-center space-x-3 text-gray-300 text-sm">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full floating-element" style={{animationDelay: '0.5s'}}></div>
                  <span>Global networking community</span>
                </div>
                <div className="feature-item flex items-center space-x-3 text-gray-300 text-sm">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full floating-element" style={{animationDelay: '1s'}}></div>
                  <span>Real-time earnings tracking</span>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => router.push("../register")}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/30 mb-4"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>Continue to Platform</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>

            {/* Help Text */}
            <div className="text-center">
              <p className="text-gray-400 text-xs">
                Join thousands of successful entrepreneurs worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;