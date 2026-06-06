import { useState, ReactNode } from 'react';
import { User, Briefcase, Settings, GraduationCap, Rocket, Mail, Terminal, Calculator as CalcIcon } from 'lucide-react';
import { Window } from './components/Window';
import { DesktopIcon } from './components/DesktopIcon';
import { Taskbar } from './components/Taskbar';
import { CommandPrompt } from './components/CommandPrompt';
import { ContextMenu } from './components/ContextMenu';
import { StartMenu } from './components/StartMenu';
import { Calendar } from './components/Calendar';
import { Calculator } from './components/Calculator';

interface WindowState {
  id: string;
  title: string;
  icon: ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface IconPosition {
  id: string;
  icon: ReactNode;
  label: string;
  position: { x: number; y: number };
}

const ICONS: Record<string, ReactNode> = {
  about: <User size="100%" />,
  experience: <Briefcase size="100%" />,
  skills: <Settings size="100%" />,
  education: <GraduationCap size="100%" />,
  projects: <Rocket size="100%" />,
  contact: <Mail size="100%" />,
  cmd: <Terminal size="100%" />,
  calc: <CalcIcon size="100%" />,
};

export default function App() {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'about', title: 'About Me', icon: ICONS.about, isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'experience', title: 'Professional Experience', icon: ICONS.experience, isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'skills', title: 'Technical Skills', icon: ICONS.skills, isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'education', title: 'Education', icon: ICONS.education, isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'projects', title: 'Project Highlights', icon: ICONS.projects, isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'contact', title: 'Contact Information', icon: ICONS.contact, isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'cmd', title: 'Command Prompt', icon: ICONS.cmd, isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'calc', title: 'Calculator', icon: ICONS.calc, isOpen: false, isMinimized: false, zIndex: 1 },
  ]);

  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [iconSize, setIconSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [desktopIcons, setDesktopIcons] = useState<IconPosition[]>([
    { id: 'about', icon: ICONS.about, label: 'About Me', position: { x: 30, y: 30 } },
    { id: 'experience', icon: ICONS.experience, label: 'Experience', position: { x: 30, y: 140 } },
    { id: 'skills', icon: ICONS.skills, label: 'Skills', position: { x: 30, y: 250 } },
    { id: 'education', icon: ICONS.education, label: 'Education', position: { x: 30, y: 360 } },
    { id: 'projects', icon: ICONS.projects, label: 'Projects', position: { x: 30, y: 470 } },
    { id: 'contact', icon: ICONS.contact, label: 'Contact', position: { x: 30, y: 580 } },
    { id: 'cmd', icon: ICONS.cmd, label: 'Command Prompt', position: { x: 30, y: 690 } },
    { id: 'calc', icon: ICONS.calc, label: 'Calculator', position: { x: 30, y: 800 } },
  ]);

  const openWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const newZIndex = maxZIndex + 1;
          setMaxZIndex(newZIndex);
          setActiveWindow(id);
          return { ...w, isOpen: true, isMinimized: false, zIndex: newZIndex };
        }
        return w;
      })
    );
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false, isMinimized: false } : w)));
    if (activeWindow === id) setActiveWindow(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
    if (activeWindow === id) setActiveWindow(null);
  };

  const activateWindow = (id: string) => {
    const window = windows.find((w) => w.id === id);
    if (!window) return;

    if (window.isMinimized) {
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id === id) {
            const newZIndex = maxZIndex + 1;
            setMaxZIndex(newZIndex);
            setActiveWindow(id);
            return { ...w, isMinimized: false, zIndex: newZIndex };
          }
          return w;
        })
      );
    } else {
      const newZIndex = maxZIndex + 1;
      setMaxZIndex(newZIndex);
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: newZIndex } : w)));
      setActiveWindow(id);
    }
  };

  const getWindowContent = (id: string) => {
    const email = import.meta.env.VITE_EMAIL;
    const phone = import.meta.env.VITE_PHONE;
    const linkedin = import.meta.env.VITE_LINKEDIN;

    switch (id) {
      case 'about':
        return (
          <div className="space-y-4">
            <div className="border-b-2 border-[#0054E3] pb-2">
              <h1 className="text-3xl font-bold text-[#0054E3]">PRADIPTA DAS</h1>
              <p className="text-lg text-gray-700 mt-1">Full Stack Engineer</p>
            </div>
            <div className="bg-[#FFF8DC] border-2 border-[#D4D0C8] p-4 rounded">
              <p className="text-sm leading-relaxed">
                Full-stack engineer with 4.6+ years of experience designing scalable, event-driven, and cloud-native systems. Expert in frontend (React.js) and full-stack development (Node.js, Azure Functions), microservices migration, stateless service design, and performance optimization across distributed systems.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-[#ECE9D8] border-2 border-[#808080] p-3">
                <h3 className="font-bold text-sm mb-2 text-[#0054E3]">🎓 Education</h3>
                <p className="text-sm">Master of Computer Applications</p>
                <p className="text-xs text-gray-600">Trident Academy, Bhubaneswar</p>
              </div>
              <div className="bg-[#ECE9D8] border-2 border-[#808080] p-3">
                <h3 className="font-bold text-sm mb-2 text-[#0054E3]">📅 Experience</h3>
                <p className="text-sm">4.6+ Years</p>
                <p className="text-xs text-gray-600">Full Stack & Cloud Services</p>
              </div>
            </div>
            <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded mt-4">
              <h3 className="font-bold text-sm mb-2 text-[#0054E3]">✨ Key Expertise</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Microservices architecture & event-driven systems</li>
                <li>Stateless service design for high scalability</li>
                <li>Azure Functions, Service Bus, and cloud-native solutions</li>
              </ul>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="border-l-4 border-[#0054E3] pl-4 bg-[#F0F8FF] p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-bold text-lg text-[#0054E3]">Senior Software Engineer — Mindfire Digital LLP</h2>
                <span className="text-sm text-gray-600 whitespace-nowrap">Oct 2021 – Present</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm mt-3">
                <li>Modernized monolithic healthcare platform into event-driven microservices using Azure Functions</li>
                <li>Designed coding standards, shared libraries, and code review workflows for scalability</li>
                <li>Built stateless Doctor Consultation services enabling auto-scale behavior during peak operations</li>
                <li>Implemented service isolation, async event workflows, and multi-site lead capture platform</li>
                <li>Enhanced system reliability and throughput through distributed workload patterns</li>
              </ul>
            </div>

            <div className="border-l-4 border-[#4A9EFF] pl-4 bg-[#FAFAFA] p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-bold text-lg text-[#0054E3]">Key Project Achievements</h2>
                <span className="text-sm text-gray-600 whitespace-nowrap">Impact Highlights</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm mt-3">
                <li>Reduced coupling through modularized components and shared libraries</li>
                <li>Increased scalability by transitioning critical workflows to stateless architecture</li>
                <li>Boosted contractor response rates by 10% through email alert system refinement</li>
                <li>Award: Best Troubleshooter (Oct 2023), Best Performer (Feb 2026)</li>
              </ul>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded">
              <h3 className="font-bold text-sm mb-3 text-[#0054E3] border-b-2 border-[#0054E3] pb-1">� Languages</h3>
              <p className="text-sm">JavaScript, PHP</p>
            </div>

            <div className="bg-[#FFF8DC] border-2 border-[#D4D0C8] p-4 rounded">
              <h3 className="font-bold text-sm mb-3 text-[#0054E3] border-b-2 border-[#0054E3] pb-1">📚 Frameworks</h3>
              <p className="text-sm">React.js, Node.js, Express.js, Jest, Laravel, WordPress</p>
            </div>

            <div className="bg-[#E6FFE6] border-2 border-[#4A9EFF] p-4 rounded">
              <h3 className="font-bold text-sm mb-3 text-[#0054E3] border-b-2 border-[#0054E3] pb-1">🗄️ Databases & Cloud</h3>
              <p className="text-sm">MySQL, MSSQL, Redis, Azure Cosmos DB, Azure Functions, Azure Service Bus, Azure Web Pub/Sub</p>
            </div>

            <div className="bg-[#FFE6E6] border-2 border-[#D4D0C8] p-4 rounded">
              <h3 className="font-bold text-sm mb-3 text-[#0054E3] border-b-2 border-[#0054E3] pb-1">🛠️ Architecture & DevOps</h3>
              <p className="text-sm">Microservices, Event-Driven Systems, Stateless Design, GitHub, Bitbucket, JIRA, SDD with AI</p>
            </div>

            <div className="bg-[#F5F5F5] border-2 border-[#808080] p-4 rounded">
              <h3 className="font-bold text-sm mb-3 text-[#0054E3] border-b-2 border-[#0054E3] pb-1">🌐 Web Technologies</h3>
              <p className="text-sm">HTML5, CSS3, Bootstrap 4, AJAX, jQuery, WebSocket, Socket.IO, REST APIs</p>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4">
            <div className="border-2 border-[#0054E3] bg-[#F0F8FF] p-6 rounded">
              <div className="flex items-start gap-4">
                <div className="text-5xl">🎓</div>
                <div className="flex-1">
                  <h2 className="font-bold text-xl text-[#0054E3] mb-2">Master of Computer Application</h2>
                  <p className="text-sm text-gray-700 mb-1">Trident Academy of Creative Technology</p>
                  <p className="text-sm text-gray-600">Bhubaneswar, Odisha — Aug 2018 – Sep 2021</p>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF8DC] border-2 border-[#D4D0C8] p-4 rounded">
              <h3 className="font-bold text-sm mb-3 text-[#0054E3]">🎯 Academic Background</h3>
                <p className="text-sm">
                Comprehensive training in computer applications and software engineering, with focus on distributed systems, database design, and modern full-stack development practices.
              </p>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded">
              <h3 className="font-bold text-base mb-2 text-[#0054E3]">📍 Eye Care Consultation Platform</h3>
              <p className="text-sm mb-2">
                <strong>Technologies:</strong> Node.js, Azure Functions, Event-Driven Architecture, Microservices
              </p>
              <p className="text-sm">
                Modernized enterprise healthcare platform from monolithic to event-driven microservices. Built stateless Doctor Consultation and Refraction libraries with auto-scale capabilities. Implemented service isolation and async workflows supporting high-traffic clinic operations.
              </p>
            </div>

            <div className="bg-[#FFF8DC] border-2 border-[#D4D0C8] p-4 rounded">
              <h3 className="font-bold text-base mb-2 text-[#0054E3]">📍 Multi-Site Lead Capture Platform</h3>
              <p className="text-sm mb-2">
                <strong>Technologies:</strong> React, Node.js, Express.js, MySQL, Email Automation
              </p>
              <p className="text-sm">
                Lead management platform for spray-foam contractors. Implemented credit-point system with automation rules for property-based calculations. Refined email alerts boosting contractor response rates by 10%. Monitored server operations and gathered client requirements.
              </p>
            </div>

            <div className="bg-[#E6FFE6] border-2 border-[#4A9EFF] p-4 rounded">
              <h3 className="font-bold text-base mb-2 text-[#0054E3]">🎓 AI Certification & Expertise</h3>
              <p className="text-sm mb-2">
                <strong>Focus:</strong> Anthropic Claude, Prompt Engineering, AI Workflows
              </p>
              <p className="text-sm">
                Certified in AI practices and regularly applies AI-driven development methodologies (SDD). Leverages AI for code generation, debugging, and system architecture design. Committed to modern development practices blending AI and traditional software engineering.
              </p>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">📧</div>
              <h2 className="text-2xl font-bold text-[#0054E3]">Let's Connect!</h2>
            </div>

            <div className="space-y-3">
              <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <a href={`mailto:${email}`} className="text-sm font-bold text-[#0054E3] hover:underline">
                    {email}
                  </a>
                </div>
              </div>

              <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <p className="text-xs text-gray-600">LinkedIn</p>
                  <a 
                    href={linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[#0054E3] hover:underline"
                  >
                    {linkedin}
                  </a>
                </div>
              </div>

              <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <a href={`tel:${phone}`} className="text-sm font-bold text-[#0054E3] hover:underline">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="text-sm font-bold text-gray-800">Bhubaneswar, Odisha, India</p>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF8DC] border-2 border-[#D4D0C8] p-4 rounded mt-6 text-center">
              <p className="text-sm text-gray-700">
                💡 Open to opportunities in full-stack development, microservices architecture, cloud-native solutions, and full-stack system optimization.
              </p>
            </div>
          </div>
        );

      case 'cmd':
        return <CommandPrompt />;

      case 'calc':
        return <Calculator />;

      default:
        return <div>Content not found</div>;
    }
  };

  const openWindowsList = windows.filter((w) => w.isOpen && !w.isMinimized);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleIconPositionChange = (id: string, position: { x: number; y: number }) => {
    setDesktopIcons((prev) =>
      prev.map((icon) => (icon.id === id ? { ...icon, position } : icon))
    );
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1741904292149-55f3250dc7c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xsaW5nJTIwZ3JlZW4lMjBoaWxscyUyMGJsdWUlMjBza3klMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzczMjAzMzM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
      }}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons - Desktop Layout */}
      <div className="max-md:hidden">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            position={icon.position}
            onClick={() => openWindow(icon.id)}
            onPositionChange={(newPosition) => handleIconPositionChange(icon.id, newPosition)}
            size={iconSize}
          />
        ))}
      </div>

      {/* Desktop Icons - Mobile Grid */}
      <div className="md:hidden grid grid-cols-3 gap-4 p-6 pt-8">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="flex flex-col items-center gap-1 cursor-pointer group"
            onClick={() => openWindow(icon.id)}
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/10 group-hover:bg-white/25 transition-all text-white drop-shadow-lg">
              <div className="w-8 h-8">{icon.icon}</div>
            </div>
            <div 
              className="text-white text-sm text-center px-1 py-0.5 rounded group-hover:bg-[#0054E3]/50"
              style={{ 
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              {icon.label}
            </div>
          </div>
        ))}
      </div>

      {/* Windows */}
      {windows
        .filter((w) => w.isOpen && !w.isMinimized)
        .map((window, index) => (
          <Window
            key={window.id}
            title={window.title}
            icon={window.icon}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            isActive={activeWindow === window.id}
            onActivate={() => activateWindow(window.id)}
            initialPosition={{ x: 150 + index * 30, y: 100 + index * 30 }}
            zIndex={window.zIndex}
            noContentWrapper={window.id === 'cmd' || window.id === 'calc'}
            width={window.id === 'calc' ? '320px' : '600px'}
          >
            {getWindowContent(window.id)}
          </Window>
        ))}

      {/* Taskbar */}
      <Taskbar
        openWindows={windows.filter((w) => w.isOpen).map((w) => ({ id: w.id, title: w.title, icon: w.icon }))}
        activeWindow={activeWindow}
        onWindowActivate={activateWindow}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
        onClockClick={() => setShowCalendar(!showCalendar)}
      />

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onLargeIcons={() => {
            setIconSize('large');
            setContextMenu(null);
          }}
          onMediumIcons={() => {
            setIconSize('medium');
            setContextMenu(null);
          }}
          onSmallIcons={() => {
            setIconSize('small');
            setContextMenu(null);
          }}
          currentSize={iconSize}
        />
      )}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu
          onClose={() => setShowStartMenu(false)}
          onOpenWindow={openWindow}
          icons={desktopIcons}
        />
      )}

      {/* Calendar */}
      {showCalendar && (
        <Calendar onClose={() => setShowCalendar(false)} />
      )}
    </div>
  );
}