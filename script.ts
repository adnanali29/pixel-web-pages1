
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixel WebPages - Gen Z Tech Firm</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        body { 
            font-family: 'Space Grotesk', sans-serif; 
            background-color: black;
            color: #f4f4f5;
        }

        /* Custom Scrollbar Hiding */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
    </style>

    <!-- React & ReactDOM (Pinned Versions) -->
    <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    
    <!-- Babel for JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useRef } = React;

        /* --- ICONS (Inline to prevent CDN errors) --- */
        const IconBase = ({ size = 24, className, children, ...props }) => (
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width={size} 
                height={size} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={className} 
                {...props}
            >
                {children}
            </svg>
        );

        const ArrowRight = (props) => <IconBase {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></IconBase>;
        const Menu = (props) => <IconBase {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></IconBase>;
        const X = (props) => <IconBase {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></IconBase>;
        const Code = (props) => <IconBase {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></IconBase>;
        const Smartphone = (props) => <IconBase {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></IconBase>;
        const Cloud = (props) => <IconBase {...props}><path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19" /><path d="M12 13.5V4.5" /></IconBase>; // Simplified Cloud
        const Linkedin = (props) => <IconBase {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></IconBase>;
        const Palette = (props) => <IconBase {...props}><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></IconBase>;
        const Monitor = (props) => <IconBase {...props}><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></IconBase>;
        const Box = (props) => <IconBase {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" x2="12" y1="22.08" y2="12" /></IconBase>;
        const Users = (props) => <IconBase {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></IconBase>;
        const CheckCircle = (props) => <IconBase {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></IconBase>;
        const Globe = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></IconBase>;
        const Layout = (props) => <IconBase {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="9" x2="9" y1="21" y2="9" /></IconBase>;
        const ShoppingCart = (props) => <IconBase {...props}><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></IconBase>;
        const Server = (props) => <IconBase {...props}><rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" /></IconBase>;
        const PenTool = (props) => <IconBase {...props}><path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" /></IconBase>;
        const Send = (props) => <IconBase {...props}><line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></IconBase>;
        const ExternalLink = (props) => <IconBase {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></IconBase>;
        const Cpu = (props) => <IconBase {...props}><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" /><path d="M9 1v3" /><path d="M15 1v3" /><path d="M9 20v3" /><path d="M15 20v3" /><path d="M20 9h3" /><path d="M20 14h3" /><path d="M1 9h3" /><path d="M1 14h3" /></IconBase>;
        const Database = (props) => <IconBase {...props}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></IconBase>;
        const Terminal = (props) => <IconBase {...props}><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></IconBase>;
        const Zap = (props) => <IconBase {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></IconBase>;
        const MousePointer = (props) => <IconBase {...props}><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="m13 13 6 6" /></IconBase>;

        /* --- DATA & CONTENT --- */

        const PROJECTS = [
          { name: "Querent", url: "https://www.querent.xyz/", desc: "Astrology & Guidance Platform", color: "bg-[#d4b2ff]" },
          { name: "Roxford Health", url: "https://roxford.app/", desc: "Medical Services Portal", color: "bg-[#a3e635]" },
          { name: "Addy Fitness", url: "https://addyfitness.com/", desc: "Fitness & Training Hub", color: "bg-[#60a5fa]" },
          { name: "Sikhaid NGO", url: "https://sikhaid.ngo/", desc: "Non-Profit Organization", color: "bg-[#fb923c]" },
          { name: "Badasha", url: "https://badasha.app/", desc: "Brand Landing Page", color: "bg-[#f472b6]" }
        ];

        const SERVICE_CATEGORIES = [
          {
            id: 'web-dev',
            title: 'Website Development',
            icon: <Globe size={32} />,
            color: 'bg-[#bef264]',
            textColor: 'text-black',
            desc: 'Custom coded digital experiences.',
            subServices: [
              { title: 'E-Commerce Store', desc: 'Robust online stores with payment gateways.', icon: <ShoppingCart /> },
              { title: 'Corporate Portfolio', desc: 'Professional branding sites for firms.', icon: <Layout /> },
              { title: 'Landing Pages', desc: 'High-conversion single-page sites.', icon: <ArrowRight /> },
              { title: 'SaaS Dashboard', desc: 'Complex web applications.', icon: <Database /> },
              { title: 'CMS Blogs', desc: 'Content-heavy platforms.', icon: <PenTool /> },
              { title: 'Non-Profit/NGO', desc: 'Donation-focused websites.', icon: <Users /> }
            ]
          },
          {
            id: 'ui-ux',
            title: 'UI/UX Designing',
            icon: <Palette size={32} />,
            color: 'bg-[#c084fc]',
            textColor: 'text-black',
            desc: 'User-centric interfaces.',
            subServices: [
              { title: 'Mobile App Design', desc: 'iOS and Android interface design.', icon: <Smartphone /> },
              { title: 'Wireframing', desc: 'Low-fidelity structural blueprints.', icon: <Layout /> },
              { title: 'Prototyping', desc: 'Interactive mockups.', icon: <Code /> },
              { title: 'Design Systems', desc: 'Comprehensive style guides.', icon: <Box /> }
            ]
          },
          {
            id: 'app-dev',
            title: 'Application & Software',
            icon: <Smartphone size={32} />,
            color: 'bg-[#60a5fa]',
            textColor: 'text-black',
            desc: 'Mobile and desktop solutions.',
            subServices: [
              { title: 'Native iOS/Android', desc: 'High-performance mobile apps.', icon: <Smartphone /> },
              { title: 'Cross-Platform', desc: 'React Native or Flutter apps.', icon: <Code /> },
              { title: 'Desktop Software', desc: 'Electron or native desktop apps.', icon: <Monitor /> },
              { title: 'Internal Tools', desc: 'Custom operations software.', icon: <Terminal /> }
            ]
          },
          {
            id: 'cloud',
            title: 'Cloud Migration',
            icon: <Cloud size={32} />,
            color: 'bg-[#fb923c]',
            textColor: 'text-black',
            desc: 'Scalable infrastructure.',
            subServices: [
              { title: 'AWS/Azure Setup', desc: 'Secure, scalable server environments.', icon: <Server /> },
              { title: 'Database Migration', desc: 'Moving legacy data systems.', icon: <Database /> },
              { title: 'Serverless Arch', desc: 'Cost-effective functions.', icon: <Cloud /> }
            ]
          },
          {
            id: 'linkedin',
            title: 'LinkedIn Management',
            icon: <Linkedin size={32} />,
            color: 'bg-[#2563eb]',
            textColor: 'text-white',
            desc: 'Professional branding growth.',
            subServices: [
              { title: 'Profile Optimization', desc: 'Revamping bios and headlines.', icon: <Users /> },
              { title: 'Content Strategy', desc: 'Ghostwriting thought leadership.', icon: <PenTool /> },
              { title: 'Lead Generation', desc: 'Targeted outreach campaigns.', icon: <Send /> }
            ]
          },
          {
            id: 'graphics',
            title: 'Poster/Flyer Design',
            icon: <Layout size={32} />,
            color: 'bg-[#f472b6]',
            textColor: 'text-black',
            desc: 'Print and digital visual assets.',
            subServices: [
              { title: 'Event Posters', desc: 'Eye-catching visuals.', icon: <Palette /> },
              { title: 'Business Flyers', desc: 'Informational handouts.', icon: <Layout /> },
              { title: 'Print Management', desc: 'Technical details for printing.', icon: <Box /> }
            ]
          },
          {
            id: 'signage',
            title: 'Signage Designing',
            icon: <Monitor size={32} />,
            color: 'bg-[#facc15]',
            textColor: 'text-black',
            desc: 'Large format outdoor advertising.',
            subServices: [
              { title: 'Billboards', desc: 'Large-scale visuals.', icon: <Monitor /> },
              { title: 'Storefronts', desc: 'Window decals and 3D lettering.', icon: <Layout /> },
              { title: 'Wayfinding', desc: 'Directional signage.', icon: <ArrowRight /> }
            ]
          },
          {
            id: 'ppt',
            title: 'PPT Making',
            icon: <Box size={32} />,
            color: 'bg-[#f87171]',
            textColor: 'text-black',
            desc: 'Professional decks.',
            subServices: [
              { title: 'Investor Pitch', desc: 'Compelling narratives.', icon: <Users /> },
              { title: 'Corporate Sales', desc: 'Standardized templates.', icon: <BriefcaseIcon /> },
              { title: 'Educational', desc: 'Clear, engaging slides.', icon: <Monitor /> }
            ]
          }
        ];

        function BriefcaseIcon() { return <Box />; } 

        const BLOGS = [
          { title: "The Future of AI in Web Design", date: "Oct 12, 2024", tag: "Tech", color: "bg-blue-400" },
          { title: "Why Minimalist UI Converts Better", date: "Nov 03, 2024", tag: "Design", color: "bg-green-400" },
          { title: "Cloud Migration Strategy 101", date: "Dec 01, 2024", tag: "Cloud", color: "bg-purple-400" }
        ];

        /* --- COMPONENTS --- */

        const InteractiveRobot = () => {
          const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

          useEffect(() => {
            const handleMouseMove = (event) => {
              const { innerWidth, innerHeight } = window;
              const x = (event.clientX - innerWidth / 2) / 30;
              const y = (event.clientY - innerHeight / 2) / 30;
              setMousePos({ x, y });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
          }, []);

          return (
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto animate-float">
               <div className="relative w-full h-full">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-16 bg-zinc-600 rounded-full flex flex-col items-center justify-start">
                     <div className="w-8 h-8 bg-red-500 rounded-full -mt-4 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.6)]"></div>
                  </div>

                  <div className="w-full h-full bg-white rounded-[3rem] border-8 border-black shadow-[15px_15px_0px_0px_rgba(255,255,255,0.2)] flex flex-col items-center justify-center relative overflow-hidden">
                     <div className="w-5/6 h-4/6 bg-black rounded-[2rem] flex items-center justify-center gap-6 relative overflow-hidden border-4 border-zinc-800">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

                        <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
                           <div className="w-8 h-8 bg-blue-500 rounded-full" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}></div>
                        </div>

                        <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
                           <div className="w-8 h-8 bg-blue-500 rounded-full" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}></div>
                        </div>

                        <div className="absolute bottom-8 w-12 h-2 bg-zinc-700 rounded-full"></div>
                     </div>
                     <div className="absolute bottom-12 left-8 w-6 h-6 bg-pink-300 rounded-full opacity-50 blur-sm"></div>
                     <div className="absolute bottom-12 right-8 w-6 h-6 bg-pink-300 rounded-full opacity-50 blur-sm"></div>
                  </div>

                  <div className="absolute top-1/2 -left-16 w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center animate-bounce-slow">
                    <Code size={24} className="text-black" />
                  </div>
                  <div className="absolute top-1/2 -right-16 w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center animate-bounce-slow delay-75">
                    <Zap size={24} className="text-black" />
                  </div>
               </div>
            </div>
          );
        };

        const Navbar = ({ setPage, activePage }) => {
          const [isOpen, setIsOpen] = useState(false);
          const navItems = ['Home', 'About Us', 'Product', 'Services', 'Contact'];

          return (
            <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                  <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setPage('Home')}>
                    <div className="w-10 h-10 bg-white rounded-xl border-2 border-black flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]">
                      <span className="text-black font-black text-2xl">P</span>
                    </div>
                    <span className="text-white font-bold text-xl tracking-tighter">Pixel WebPages</span>
                  </div>
                  
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-8">
                      {navItems.map((item) => (
                        <button
                          key={item}
                          onClick={() => setPage(item)}
                          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 border-2 ${
                            activePage === item 
                              ? 'text-black bg-[#bef264] border-[#bef264] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] -translate-y-1' 
                              : 'text-zinc-400 border-transparent hover:text-white hover:border-zinc-700'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="-mr-2 flex md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                      {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                  </div>
                </div>
              </div>
              
              {isOpen && (
                <div className="md:hidden bg-zinc-950 border-b border-zinc-800 absolute w-full">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item) => (
                      <button
                        key={item}
                        onClick={() => { setPage(item); setIsOpen(false); }}
                        className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-zinc-300 hover:text-black hover:bg-[#bef264]"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </nav>
          );
        };

        const Footer = () => (
          <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-[#bef264] rounded-3xl p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] transform hover:scale-[1.01] transition-transform">
                 <div>
                    <h2 className="text-3xl md:text-5xl font-black text-black mb-2">Ready to Start?</h2>
                    <p className="text-zinc-800 font-medium">Let's build something amazing together.</p>
                 </div>
                 <button className="mt-6 md:mt-0 px-8 py-4 bg-black text-white font-bold rounded-xl shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)] hover:translate-y-1 hover:shadow-none transition-all">
                    Contact Us Now
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-zinc-900 pt-12">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                      <span className="text-black font-black text-xl">P</span>
                    </div>
                    <span className="text-white font-bold text-xl tracking-tighter">Pixel WebPages</span>
                  </div>
                  <p className="text-zinc-400 max-w-sm mb-6">
                    Empowering your business to reach new heights and reinvent your brand with innovative tech solutions.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h3>
                  <ul className="space-y-3 text-zinc-400">
                    <li className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-[#bef264] rounded-full"></div>
                       +91 9778803677
                    </li>
                    <li className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-[#bef264] rounded-full"></div>
                       pixelwebpages@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 text-center text-zinc-600 text-sm">
                © 2025 Pixel WebPages. Cuttack, Odisha, India.
              </div>
            </div>
          </footer>
        );

        const Modal = ({ isOpen, onClose, serviceName }) => {
          if (!isOpen) return null;
          return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-[#f0fdf4] border-4 border-black rounded-3xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-300 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)]">
                <button onClick={onClose} className="absolute top-4 right-4 bg-black text-white p-1 rounded-full hover:scale-110 transition-transform">
                  <X size={20} />
                </button>
                <h2 className="text-3xl font-black text-black mb-2 uppercase">Let's Build It.</h2>
                <p className="text-zinc-600 mb-6 text-sm font-medium">Requesting: <span className="bg-[#bef264] px-1 text-black border border-black">{serviceName}</span></p>
                
                <form onSubmit={(e) => {e.preventDefault(); alert('Sent!'); onClose();}} className="space-y-4">
                  <input required type="text" className="w-full bg-white border-2 border-black rounded-xl p-3 text-black font-bold placeholder:text-zinc-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all" placeholder="Your Name" />
                  <input required type="email" className="w-full bg-white border-2 border-black rounded-xl p-3 text-black font-bold placeholder:text-zinc-400 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all" placeholder="Your Email" />
                  <button type="submit" className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-[#bef264] hover:text-black border-2 border-black hover:shadow-[4px_4px_0px_0px_#000] transition-all">Send Request</button>
                </form>
              </div>
            </div>
          );
        };

        const HomePage = ({ setPage }) => {
          return (
            <div className="space-y-24 pb-20 overflow-x-hidden">
              <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-4 max-w-7xl mx-auto pt-20">
                 <div className="flex-1 text-center md:text-left z-10">
                    <div className="inline-block mb-6 px-6 py-2 rounded-full border-2 border-black bg-[#bef264] text-black font-bold uppercase tracking-wider text-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 transition-transform cursor-default">
                       Pixel WebPages • Est 2025
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-6 tracking-tighter">
                       BUILDING <br/>
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bef264] to-[#a3e635]">THE FUTURE</span> <br/>
                       FOR GEN Z.
                    </h1>
                    <p className="text-zinc-400 text-xl max-w-xl mb-10 font-medium">
                       We don't just build websites. We craft digital experiences that pop, snap, and engage. Your brand, reinvented.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                       <button onClick={() => setPage('Contact')} className="px-8 py-4 bg-white text-black border-2 border-black font-black rounded-xl shadow-[6px_6px_0px_0px_#bef264] hover:shadow-none hover:translate-y-1 transition-all flex items-center justify-center gap-2">
                          START PROJECT <ArrowRight size={24} strokeWidth={3} />
                       </button>
                       <button onClick={() => setPage('Product')} className="px-8 py-4 bg-black text-white border-2 border-zinc-800 font-bold rounded-xl hover:bg-zinc-900 transition-colors">
                          EXPLORE PRODUCTS
                       </button>
                    </div>
                 </div>

                 <div className="flex-1 w-full max-w-lg z-10">
                    <InteractiveRobot />
                 </div>

                 <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(190,242,100,0.1),transparent_50%)] pointer-events-none"></div>
              </section>

              <section className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group p-8 rounded-[2rem] bg-[#c084fc] border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.4)] hover:-translate-y-2 transition-all cursor-default">
                    <div className="bg-black w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
                       <Zap size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-black mb-2">Blazing Fast</h3>
                    <p className="text-black font-bold opacity-80">Next.js powered sites that load before you can blink.</p>
                  </div>
                  
                  <div className="group p-8 rounded-[2rem] bg-[#60a5fa] border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.4)] hover:-translate-y-2 transition-all cursor-default">
                    <div className="bg-black w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
                       <MousePointer size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-black mb-2">Interactive</h3>
                    <p className="text-black font-bold opacity-80">Animations that follow your every move and click.</p>
                  </div>
                  
                  <div className="group p-8 rounded-[2rem] bg-[#fb923c] border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.4)] hover:-translate-y-2 transition-all cursor-default">
                    <div className="bg-black w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
                       <Database size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-black mb-2">Scalable</h3>
                    <p className="text-black font-bold opacity-80">Built to grow with your business from day one.</p>
                  </div>
                </div>
              </section>

              <section className="w-full overflow-hidden py-10">
                <h2 className="text-center text-2xl font-black text-white mb-10 uppercase tracking-widest">
                   Featured <span className="text-[#bef264]">Projects</span>
                </h2>
                <div className="flex gap-8 overflow-x-auto pb-12 px-4 no-scrollbar snap-x cursor-grab active:cursor-grabbing">
                  {PROJECTS.map((project, index) => (
                    <div key={index} className={`snap-center shrink-0 w-[320px] h-[400px] ${project.color} rounded-[2.5rem] border-4 border-black p-8 flex flex-col justify-between shadow-[8px_8px_0px_0px_#fff] hover:-translate-y-2 transition-all group relative overflow-hidden`}>
                       <div className="relative z-10">
                          <div className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">LIVE</div>
                          <h3 className="text-4xl font-black text-black leading-tight mb-2">{project.name}</h3>
                          <p className="text-black font-bold opacity-70 text-sm">{project.desc}</p>
                       </div>
                       
                       <a href={project.url} target="_blank" rel="noopener noreferrer" className="bg-black text-white w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                          Visit Site <ExternalLink size={18} />
                       </a>

                       <div className="absolute top-1/2 -right-12 w-32 h-32 bg-white opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="max-w-5xl mx-auto px-4">
                 <div className="bg-zinc-900 border-2 border-zinc-800 p-10 md:p-16 rounded-[3rem] relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#bef264] via-[#c084fc] to-[#60a5fa]"></div>
                    <p className="text-2xl md:text-4xl font-black text-white leading-tight mb-8">
                       "Pixel Webpages has become a trusted partner. We've experienced a significant improvement in uptime, security, and overall IT performance."
                    </p>
                    <div className="inline-flex items-center gap-4 bg-black border border-zinc-800 p-2 pr-6 rounded-full">
                       <div className="w-10 h-10 bg-[#bef264] rounded-full flex items-center justify-center font-bold text-black">TC</div>
                       <div className="text-left">
                          <div className="text-white font-bold text-sm">Trusted Client</div>
                          <div className="text-zinc-500 text-xs font-bold uppercase">Business Owner</div>
                       </div>
                    </div>
                 </div>
              </section>

              <section className="max-w-7xl mx-auto px-4 pb-12">
                <h2 className="text-3xl font-black text-white mb-8">Latest Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {BLOGS.map((blog, idx) => (
                     <div key={idx} className="group cursor-pointer">
                       <div className={`h-56 ${blog.color} rounded-[2rem] mb-4 border-4 border-black relative overflow-hidden shadow-[6px_6px_0px_0px_#333] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all`}>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <PenTool size={48} className="text-black opacity-20 group-hover:scale-110 transition-transform" />
                         </div>
                       </div>
                       <h3 className="text-xl font-bold text-white group-hover:text-[#bef264] transition-colors">{blog.title}</h3>
                       <p className="text-zinc-500 text-sm font-bold mt-2">{blog.date} • {blog.tag}</p>
                     </div>
                  ))}
                </div>
              </section>
            </div>
          );
        };

        const ServicesPage = () => {
          const [activeCategory, setActiveCategory] = useState(null);
          const [modalOpen, setModalOpen] = useState(false);
          const [selectedSubService, setSelectedSubService] = useState('');

          const handleSubServiceClick = (subTitle) => {
            setSelectedSubService(subTitle);
            setModalOpen(true);
          };

          if (!activeCategory) {
            return (
              <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
                <h1 className="text-6xl md:text-8xl font-black text-white mb-8">OUR <span className="text-[#bef264]">SERVICES.</span></h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {SERVICE_CATEGORIES.map((cat, i) => (
                    <div 
                      key={cat.id}
                      onClick={() => setActiveCategory(cat)}
                      className={`
                        group relative p-8 rounded-[2.5rem] cursor-pointer transition-all duration-300 
                        ${cat.color} border-4 border-black shadow-[8px_8px_0px_0px_#fff]
                        hover:shadow-[12px_12px_0px_0px_#fff] hover:-translate-y-2
                        ${i === 0 || i === 3 ? 'md:col-span-2' : ''}
                        min-h-[250px] flex flex-col justify-between overflow-hidden
                      `}
                    >
                      <div className="flex justify-between items-start relative z-10">
                         <div className="bg-black/20 p-3 rounded-2xl text-black">
                           {cat.icon}
                         </div>
                         <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all -rotate-45 group-hover:rotate-0">
                            <ArrowRight size={20}/>
                         </div>
                      </div>
                      
                      <div className="relative z-10">
                        <h3 className={`text-3xl font-black leading-tight mb-2 ${cat.textColor}`}>{cat.title}</h3>
                        <p className={`font-bold text-sm ${cat.textColor === 'text-white' ? 'text-white/80' : 'text-black/70'}`}>{cat.desc}</p>
                      </div>

                      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
              <button 
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 text-white font-bold mb-8 hover:text-[#bef264] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <ArrowRight className="rotate-180" size={20} />
                </div>
                <span>Back to Categories</span>
              </button>

              <div className={`p-8 rounded-[3rem] ${activeCategory.color} border-4 border-black mb-12 flex flex-col md:flex-row items-center gap-8`}>
                <div className="bg-black/10 p-6 rounded-[2rem]">{activeCategory.icon}</div>
                <div>
                   <h1 className={`text-4xl md:text-6xl font-black ${activeCategory.textColor} mb-2`}>{activeCategory.title}</h1>
                   <p className={`text-xl font-bold ${activeCategory.textColor} opacity-80`}>{activeCategory.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCategory.subServices.map((sub, index) => (
                  <div key={index} className="bg-zinc-900 border-2 border-zinc-800 rounded-[2rem] p-8 hover:border-[#bef264] transition-all group flex flex-col justify-between min-h-[250px]">
                    <div>
                       <div className="text-zinc-500 mb-6 group-hover:text-[#bef264] group-hover:scale-110 transition-all origin-left">
                          {React.cloneElement(sub.icon, { size: 40 })}
                       </div>
                       <h3 className="text-2xl font-black text-white mb-2">{sub.title}</h3>
                       <p className="text-zinc-400 text-sm font-medium leading-relaxed">{sub.desc}</p>
                    </div>
                    <button 
                      onClick={() => handleSubServiceClick(sub.title)}
                      className="mt-6 w-full py-4 bg-black border border-zinc-700 rounded-xl text-white font-bold hover:bg-[#bef264] hover:text-black hover:border-black transition-all"
                    >
                      Start Project
                    </button>
                  </div>
                ))}
              </div>

              <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} serviceName={`${activeCategory.title} - ${selectedSubService}`} />
            </div>
          );
        };

        const AboutPage = ({ setPage }) => {
          return (
            <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
              <h1 className="text-6xl md:text-8xl font-black text-white mb-12">ABOUT <span className="text-[#bef264]">US.</span></h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                 <div className="bg-[#f0fdf4] p-10 rounded-[2.5rem] border-4 border-black shadow-[8px_8px_0px_0px_#fff]">
                    <h2 className="text-3xl font-black text-black mb-4">OUR MISSION</h2>
                    <p className="text-black font-medium leading-relaxed">
                       Empowering your business to reach new heights and reinvent your brand with innovative tech solutions. We don't settle for average.
                    </p>
                 </div>
                 <div className="bg-[#e0f2fe] p-10 rounded-[2.5rem] border-4 border-black shadow-[8px_8px_0px_0px_#fff]">
                    <h2 className="text-3xl font-black text-black mb-4">OUR VISION</h2>
                    <p className="text-black font-medium leading-relaxed">
                       To be the leading provider of innovative tech solutions, driving business growth and brand transformation through cutting-edge technology.
                    </p>
                 </div>
              </div>

              <h2 className="text-4xl font-black text-white mb-8 text-center">CORE VALUES</h2>
              <div className="flex flex-wrap justify-center gap-4">
                 {['Innovation', 'Integrity', 'Customer-Centricity', 'Excellence', 'Collaboration'].map((val, i) => (
                    <div key={i} className="px-8 py-4 bg-zinc-900 rounded-full border border-zinc-800 hover:bg-[#bef264] hover:text-black hover:border-[#bef264] hover:scale-105 transition-all cursor-default">
                       <span className="font-bold text-lg">{val}</span>
                    </div>
                 ))}
              </div>
            </div>
          );
        };

        const ProductPage = ({ setPage }) => {
          return (
            <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
              <h1 className="text-6xl md:text-8xl font-black text-white mb-16">OUR <span className="text-blue-400">PRODUCTS.</span></h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-[#1e1e1e] rounded-[3rem] border-4 border-zinc-800 p-10 relative overflow-hidden group hover:border-blue-500 transition-colors">
                   <div className="absolute top-0 right-0 p-32 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                   <Users className="text-blue-400 mb-8" size={64} />
                   <h2 className="text-4xl font-black text-white mb-4">Pixel CRM</h2>
                   <p className="text-zinc-400 text-lg mb-8 font-medium">Manage leads like a pro. The ultimate tool for modern sales teams.</p>
                   <button onClick={() => setPage('Contact')} className="w-full py-4 bg-blue-500 text-black font-black rounded-xl hover:bg-white transition-colors">REQUEST DEMO</button>
                </div>

                <div className="bg-[#1e1e1e] rounded-[3rem] border-4 border-zinc-800 p-10 relative overflow-hidden group hover:border-green-500 transition-colors">
                   <div className="absolute top-0 right-0 p-32 bg-green-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                   <Box className="text-green-400 mb-8" size={64} />
                   <h2 className="text-4xl font-black text-white mb-4">Inventory OS</h2>
                   <p className="text-zinc-400 text-lg mb-8 font-medium">Real-time tracking. Never run out of stock again.</p>
                   <button onClick={() => setPage('Contact')} className="w-full py-4 bg-green-500 text-black font-black rounded-xl hover:bg-white transition-colors">REQUEST DEMO</button>
                </div>
              </div>
            </div>
          );
        };

        const ContactPage = () => {
          return (
            <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto min-h-screen">
               <div className="bg-[#facc15] rounded-[3rem] p-8 md:p-16 border-4 border-black shadow-[12px_12px_0px_0px_#fff]">
                  <h1 className="text-6xl font-black text-black mb-8 uppercase">Let's Talk Business.</h1>
                  <form className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Name" className="w-full bg-white border-4 border-black p-4 rounded-xl font-bold placeholder:text-zinc-500 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"/>
                        <input type="email" placeholder="Email" className="w-full bg-white border-4 border-black p-4 rounded-xl font-bold placeholder:text-zinc-500 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"/>
                     </div>
                     <textarea rows="4" placeholder="How can we help?" className="w-full bg-white border-4 border-black p-4 rounded-xl font-bold placeholder:text-zinc-500 focus:outline-none focus:shadow-[4px_4px_0px_0px_#000] transition-all"></textarea>
                     <button className="bg-black text-white font-black text-xl py-5 px-10 rounded-xl w-full hover:bg-white hover:text-black border-4 border-black transition-all">
                        SEND MESSAGE
                     </button>
                  </form>
               </div>
            </div>
          );
        };

        const App = () => {
          const [currentPage, setCurrentPage] = useState('Home');

          useEffect(() => {
            window.scrollTo(0, 0);
          }, [currentPage]);

          const renderPage = () => {
            switch(currentPage) {
              case 'Home': return <HomePage setPage={setCurrentPage} />;
              case 'About Us': return <AboutPage setPage={setCurrentPage} />;
              case 'Product': return <ProductPage setPage={setCurrentPage} />;
              case 'Services': return <ServicesPage />;
              case 'Contact': return <ContactPage />;
              default: return <HomePage setPage={setCurrentPage} />;
            }
          };

          return (
            <div className="min-h-screen">
              <Navbar setPage={setCurrentPage} activePage={currentPage} />
              <main className="min-h-screen">{renderPage()}</main>
              <Footer />
            </div>
          );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>