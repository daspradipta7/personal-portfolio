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
    switch (id) {
      case 'about':
        return (
          <div className="space-y-4">
            <div className="border-b-2 border-[#0054E3] pb-2">
              <h1 className="text-3xl font-bold text-[#0054E3]">JOEL CAMPOS</h1>
              <p className="text-lg text-gray-700 mt-1">Full-Stack Software Engineer</p>
            </div>
            <div className="bg-[#FFF8DC] border-2 border-[#D4D0C8] p-4 rounded">
              <p className="text-sm leading-relaxed">
                Full-stack software engineer with a strong specialization in JavaScript (React.js, Node.js) and solid experience in SQL-driven systems and Laravel-based platforms. Proven track record integrating banking APIs, maintaining C# legacy systems, and building digital service solutions for government operations. Focused on clean, scalable, and secure architectures.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-[#ECE9D8] border-2 border-[#808080] p-3">
                <h3 className="font-bold text-sm mb-2 text-[#0054E3]">📍 Location</h3>
                <p className="text-sm">Guadalajara, Jalisco</p>
              </div>
              <div className="bg-[#ECE9D8] border-2 border-[#808080] p-3">
                <h3 className="font-bold text-sm mb-2 text-[#0054E3]">🌐 Languages</h3>
                <p className="text-sm">Spanish — Native</p>
                <p className="text-sm">English — Professional</p>
              </div>
            </div>
            <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded mt-4">
              <h3 className="font-bold text-sm mb-2 text-[#0054E3]">✨ Professional Highlights</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Key developer in digital transformation initiatives for local government</li>
                <li>Hands-on experience connecting legacy systems with modern web architectures</li>
                <li>Skilled at cross-stack problem-solving from database to UI</li>
              </ul>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="border-l-4 border-[#0054E3] pl-4 bg-[#F0F8FF] p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-bold text-lg text-[#0054E3]">Software Engineer — City Government Platform (Zapopan)</h2>
                <span className="text-sm text-gray-600 whitespace-nowrap">Feb 2023 – Present</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm mt-3">
                <li>Developed SQL stored procedures to optimize heavy data operations for citizen services</li>
                <li>Led React.js development for fee calculation and license management platforms</li>
                <li>Integrated Banorte banking API, enabling online tax and license payments directly from citizen portals</li>
                <li>Maintained and debugged C# + DevExpress legacy systems for financial reconciliation</li>
              </ul>
            </div>

            <div className="border-l-4 border-[#4A9EFF] pl-4 bg-[#FAFAFA] p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-bold text-lg text-[#0054E3]">Software Engineer — Freelance / Agency Projects</h2>
                <span className="text-sm text-gray-600 whitespace-nowrap">May 2021 – Feb 2023</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm mt-3">
                <li>Built e-commerce and landing page systems using Shopify, WordPress, and Laravel</li>
                <li>Implemented UI customizations using Liquid (Shopify) and PHP templates</li>
                <li>Integrated analytics and marketing tools like Klaviyo and Google Tag Manager</li>
                <li>Delivered responsive, SEO-optimized, and high-performance front-end layouts</li>
              </ul>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded">
              <h3 className="font-bold text-sm mb-3 text-[#0054E3] border-b-2 border-[#0054E3] pb-1">💻 Frontend</h3>
              <p className="text-sm">React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap</p>
            </div>

            <div className="bg-[#FFF8DC] border-2 border-[#D4D0C8] p-4 rounded">
              <h3 className="font-bold text-sm mb-3 text-[#0054E3] border-b-2 border-[#0054E3] pb-1">⚙️ Backend</h3>
              <p className="text-sm">Node.js, Express.js, Laravel (PHP), C# (.NET Core)</p>
            </div>

            <div className="bg-[#E6FFE6] border-2 border-[#4A9EFF] p-4 rounded">
              <h3 className="font-bold text-sm mb-3 text-[#0054E3] border-b-2 border-[#0054E3] pb-1">🗄️ Databases</h3>
              <p className="text-sm">SQL Server, PostgreSQL, MySQL</p>
            </div>

            <div className="bg-[#FFE6E6] border-2 border-[#D4D0C8] p-4 rounded">
              <h3 className="font-bold text-sm mb-3 text-[#0054E3] border-b-2 border-[#0054E3] pb-1">🛠️ Tools</h3>
              <p className="text-sm">Git, AWS, Figma, DevExpress, Shopify, WordPress</p>
            </div>

            <div className="bg-[#F5F5F5] border-2 border-[#808080] p-4 rounded">
              <h3 className="font-bold text-sm mb-3 text-[#0054E3] border-b-2 border-[#0054E3] pb-1">🔧 Other</h3>
              <p className="text-sm">REST APIs, Stored Procedures, System Integration, Debugging Legacy Code</p>
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
                  <h2 className="font-bold text-xl text-[#0054E3] mb-2">B.S. in Information Technology Engineering</h2>
                  <p className="text-sm text-gray-700 mb-1">Universidad Tecnológica de Jalisco</p>
                  <p className="text-sm text-gray-600">2019 – 2023</p>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF8DC] border-2 border-[#D4D0C8] p-4 rounded">
              <h3 className="font-bold text-sm mb-3 text-[#0054E3]">🎯 Academic Focus</h3>
              <p className="text-sm">
                Specialized in modern software engineering practices with emphasis on full-stack development, 
                database systems, and enterprise application architecture.
              </p>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded">
              <h3 className="font-bold text-base mb-2 text-[#0054E3]">🏛️ Government Digital Transformation</h3>
              <p className="text-sm mb-2">
                <strong>Technologies:</strong> React.js, SQL Server, C#, DevExpress, Banking APIs
              </p>
              <p className="text-sm">
                Led development of citizen-facing platforms for fee calculation and license management. 
                Integrated secure payment processing through Banorte banking API, enabling thousands of 
                citizens to pay taxes and licenses online.
              </p>
            </div>

            <div className="bg-[#FFF8DC] border-2 border-[#D4D0C8] p-4 rounded">
              <h3 className="font-bold text-base mb-2 text-[#0054E3]">🛒 E-Commerce Solutions</h3>
              <p className="text-sm mb-2">
                <strong>Technologies:</strong> Shopify, WordPress, Laravel, Klaviyo, Google Tag Manager
              </p>
              <p className="text-sm">
                Built and customized multiple e-commerce platforms and landing pages. Implemented 
                marketing automation, analytics tracking, and responsive designs optimized for conversion 
                and SEO performance.
              </p>
            </div>

            <div className="bg-[#E6FFE6] border-2 border-[#4A9EFF] p-4 rounded">
              <h3 className="font-bold text-base mb-2 text-[#0054E3]">🔧 Legacy System Modernization</h3>
              <p className="text-sm mb-2">
                <strong>Technologies:</strong> C#, .NET Core, SQL Server, React.js
              </p>
              <p className="text-sm">
                Maintained and improved legacy financial reconciliation systems while gradually introducing 
                modern web interfaces. Bridged legacy C# backends with contemporary React.js frontends.
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
                  <a href="mailto:joelcamposlalo@gmail.com" className="text-sm font-bold text-[#0054E3] hover:underline">
                    joelcamposlalo@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <p className="text-xs text-gray-600">LinkedIn</p>
                  <a 
                    href="https://linkedin.com/in/joel-campos" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[#0054E3] hover:underline"
                  >
                    linkedin.com/in/joel-campos
                  </a>
                </div>
              </div>

              <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <a href="tel:+523325799804" className="text-sm font-bold text-[#0054E3] hover:underline">
                    +52 33 25 79 98 04
                  </a>
                </div>
              </div>

              <div className="bg-[#E6F3FF] border-2 border-[#0054E3] p-4 rounded flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="text-sm font-bold text-gray-800">Guadalajara, Jalisco, Mexico</p>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF8DC] border-2 border-[#D4D0C8] p-4 rounded mt-6 text-center">
              <p className="text-sm text-gray-700">
                💡 Open to opportunities in full-stack development, system integration, and digital transformation projects.
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