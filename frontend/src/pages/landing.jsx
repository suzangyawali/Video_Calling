import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImgPng from '../assets/mobile.png'; // Ensure this path is correct
// Main Landing Page Component  
export default function LandingPage() {
  const router = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="w-full h-full overflow-y-auto overflow-x-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-orange-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"
            style={{
              left: mousePosition.x * 0.02 + '%',
              top: mousePosition.y * 0.02 + '%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-2xl animate-bounce" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-green-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Glassmorphism Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-xl bg-white/10 border-b border-white/20' : 'bg-transparent'
        }`}>
          <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
            <div className="group">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
               HelioMeet
              </h2>
            </div>
            <div className="flex space-x-8">
              {/* Join as Guest - routes to /aljk23 */}
              <p
                className="cursor-pointer text-white/90 hover:text-white transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 backdrop-blur-sm relative group"
                onClick={() => {
                  router("/aljk23")
                }}
              >
                Join as Guest
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-pink-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </p>
              
              {/* Register - routes to /auth */}
              <p
                className="cursor-pointer text-white/90 hover:text-white transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 backdrop-blur-sm relative group"
                onClick={() => {
                  router("/auth")
                }}
              >
                Register
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-pink-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </p>
              
              {/* Login - routes to /auth */}
              <div
                onClick={() => {
                  router("/auth")
                }}
                role='button'
                className="cursor-pointer text-white/90 hover:text-white transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 backdrop-blur-sm relative group"
              >
                <p>Login</p>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-pink-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 py-32 max-w-7xl mx-auto relative z-10 min-h-screen w-full">
          <div className="max-w-2xl mb-12 lg:mb-0 animate-fade-in">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-full text-orange-300 text-sm font-medium backdrop-blur-sm mb-6">
                ✨ Experience the Future of Video Calling
              </span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent animate-gradient-x">
                Connect
              </span>
              <br />
              <span className="text-white/90">Beyond</span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                Distance
              </span>
            </h1>
            
            <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-lg">
              Bridge hearts and minds with crystal-clear video calls that make every conversation feel like you're in the same room.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div role='button'>
                <Link 
                  to={"/auth"}
                  className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 inline-block text-center w-full"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
              
              <button 
                className="group flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowVideo(true)}
              >
                <span>Watch Demo</span>
                <div className="w-0 h-0 border-l-8 border-l-white border-y-4 border-y-transparent group-hover:border-l-orange-400 transition-colors" />
              </button>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 mt-16">
              {[
                { number: "10M+", label: "Active Users" },
                { number: "99.9%", label: "Uptime" },
                { number: "4K", label: "HD Quality" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-md lg:max-w-lg group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-pink-600/30 rounded-3xl blur-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <img 
                src={ImgPng} 
                alt="Mobile App Interface" 
                className="w-full h-auto transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-2xl" 
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-white text-2xl">📹</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white">💬</span>
              </div>
            </div>
          </div>
        </main>

        {/* YouTube Video Modal */}
        {showVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl mx-4">
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-12 right-0 text-white text-2xl hover:text-orange-400 transition-colors z-10"
              >
                ✕
              </button>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full rounded-xl shadow-2xl"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Video Call Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* Floating action button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full shadow-2xl hover:shadow-orange-500/25 flex items-center justify-center text-white text-2xl hover:scale-110 transition-all duration-300 animate-bounce">
            💡
          </button>
        </div>

        <style jsx>{`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}