import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video, Users, MessageCircle, Monitor, Shield, Zap, Globe, Star, Play, Check, ArrowRight, Phone, Camera, Mic, Settings, Heart } from 'lucide-react';

// Main Landing Page Component  
export default function LandingPage() {
  const router = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

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

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Video className="w-8 h-8" />,
      title: "HD Video Calling",
      description: "Crystal-clear 4K video quality with adaptive bitrate"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Screen Sharing",
      description: "Share your entire screen or specific applications"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Real-time Chat",
      description: "Instant messaging with file sharing capabilities"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Calls",
      description: "Perfect for study groups up to 6 participants"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      content: "HelioMeet transformed our study group sessions. The screen sharing feature makes code reviews so much easier!",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Medical Student",
      content: "Finally, a free video calling solution that actually works reliably. Perfect for our anatomy study sessions.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Engineering Student",
      content: "The video quality is amazing and it never lags. We switched from expensive alternatives to HelioMeet permanently.",
      rating: 5
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
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
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-white/90 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-white/90 hover:text-white transition-colors">How it Works</a>
            <a href="#testimonials" className="text-white/90 hover:text-white transition-colors">Reviews</a>
            <a href="#pricing" className="text-white/90 hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex space-x-4">
            <p
              className="cursor-pointer text-white/90 hover:text-white transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 backdrop-blur-sm relative group"
              onClick={() => router("/aljk23")}
            >
              Join as Guest
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-pink-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </p>
            
            <div
              onClick={() => router("/auth")}
              className="cursor-pointer bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Get Started
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full py-32">
          <div className="animate-fade-in">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-full text-orange-300 text-sm font-medium backdrop-blur-sm mb-6">
                ✨ Free Zoom Alternative for Students
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
              Built with React, Socket.io, and WebRTC. Perfect for study groups with HD video, screen sharing, and real-time chat. No limits, no fees.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                to="/auth"
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 inline-block text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Free Call <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <button 
                className="group flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowVideo(true)}
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex space-x-8">
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

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-pink-600/30 rounded-3xl blur-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4 text-white/60 text-sm">HelioMeet - Study Group</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4 aspect-video flex items-center justify-center">
                      <Users className="w-8 h-8 text-white/40" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4">
                  <div className="bg-red-500/20 p-3 rounded-full">
                    <Phone className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Mic className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Camera className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Monitor className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Everything You Need
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Built with modern web technologies for the best video calling experience. No downloads required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className={`group relative p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${
                activeFeature === idx 
                  ? 'bg-gradient-to-br from-white/20 to-white/10 border-orange-500/50 backdrop-blur-lg' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm'
              }`}
              onMouseEnter={() => setActiveFeature(idx)}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                activeFeature === idx 
                  ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white' 
                  : 'bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white'
              }`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl font-bold mb-6 text-white">
              Perfect for Study Groups
            </h3>
            <p className="text-lg text-white/70 mb-8">
              HelioMeet uses WebRTC mesh architecture optimized for small groups of up to 6 participants. 
              Experience low latency and high-quality connections perfect for collaborative learning.
            </p>
            
            <div className="space-y-4">
              {[
                "4K HD video quality with adaptive bitrate",
                "Screen sharing for presentations and code reviews", 
                "Real-time chat with file sharing",
                "No time limits or participant restrictions",
                "Works directly in your browser",
                "End-to-end encryption for privacy"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="bg-slate-800/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white font-semibold">Advanced Chemistry - Study Group</span>
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">Live</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg aspect-video flex items-center justify-center relative">
                      <Users className="w-6 h-6 text-white/40" />
                      {i === 1 && (
                        <div className="absolute bottom-1 left-1 bg-red-500 w-2 h-2 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-3 mb-4">
                  <div className="text-white/60 text-sm mb-2">Sarah is sharing screen</div>
                  <div className="bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded p-4 text-center">
                    <Monitor className="w-8 h-8 text-white/40 mx-auto" />
                    <span className="text-white/60 text-sm">Molecular Structure Presentation</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-900/50 rounded-lg p-2 text-white/60 text-sm">
                    Type a message...
                  </div>
                  <div className="bg-orange-500 rounded-lg p-2">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Get started in seconds. No downloads, no installations, no credit cards.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {[
            {
              step: "01",
              title: "Create or Join",
              description: "Start a new meeting or join an existing one with a simple room code",
              icon: <Users className="w-8 h-8" />
            },
            {
              step: "02", 
              title: "Connect & Share",
              description: "Enable your camera, microphone, and share your screen when needed",
              icon: <Video className="w-8 h-8" />
            },
            {
              step: "03",
              title: "Collaborate",
              description: "Use chat, screen sharing, and HD video to study together effectively",
              icon: <Heart className="w-8 h-8" />
            }
          ].map((item, idx) => (
            <div key={idx} className="relative text-center group">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-orange-500/30 transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="relative mb-6">
                  <div className="text-6xl font-bold text-white/10 mb-4">{item.step}</div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl p-4 text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </div>
              {idx < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-white/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative z-10 py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Built with Modern Tech
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Powered by cutting-edge web technologies for optimal performance and reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "React.js",
              description: "Modern, component-based UI framework for responsive interfaces",
              icon: "⚛️"
            },
            {
              title: "Socket.io",
              description: "Real-time bidirectional communication for instant messaging",
              icon: "🔌"
            },
            {
              title: "WebRTC",
              description: "Peer-to-peer video streaming with mesh architecture",
              icon: "🌐"
            }
          ].map((tech, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center group hover:border-orange-500/30 transition-all duration-300">
              <div className="text-4xl mb-4">{tech.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{tech.title}</h3>
              <p className="text-white/60">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Loved by Students
            </span>
          </h2>
          <p className="text-xl text-white/70">See what students are saying about HelioMeet</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 group hover:border-orange-500/30 transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/80 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-white/60 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Simple Pricing
            </span>
          </h2>
          <p className="text-xl text-white/70">Forever free for students. No hidden costs, no time limits.</p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-12 border-2 border-orange-500/30 relative overflow-hidden">
            <div className="absolute top-6 right-6 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Free Forever</h3>
              <div className="text-6xl font-bold text-white mb-2">$0</div>
              <p className="text-white/60">No credit card required</p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                "Up to 6 participants per call",
                "Unlimited meeting duration", 
                "4K HD video quality",
                "Screen sharing",
                "Real-time chat",
                "File sharing",
                "No watermarks",
                "Browser-based (no downloads)"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              to="/auth"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white text-center py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform block"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-16 border border-white/20">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Ready to Connect?
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Join thousands of students already using HelioMeet for their study groups. Start your first call in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/auth"
              className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
            >
              Start Free Call <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => setShowVideo(true)}
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
              HelioMeet
            </h3>
            <p className="text-white/60 mb-4">
              The free video calling platform built for students, by students.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                <span className="text-white">📱</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                <span className="text-white">💬</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                <span className="text-white">🐦</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
          <p>&copy; 2025 HelioMeet. Built with ❤️ for students everywhere.</p>
        </div>
      </footer>

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
        <button 
          onClick={() => router("/auth")}
          className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full shadow-2xl hover:shadow-orange-500/25 flex items-center justify-center text-white text-2xl hover:scale-110 transition-all duration-300 animate-bounce"
        >
          <Video className="w-8 h-8" />
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
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}