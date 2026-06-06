import { useState, useEffect, ReactNode } from 'react';

interface TaskbarProps {
  openWindows: Array<{ id: string; title: string; icon: ReactNode }>;
  activeWindow: string | null;
  onWindowActivate: (id: string) => void;
  onStartClick: () => void;
  onClockClick: () => void;
}

export function Taskbar({ openWindows, activeWindow, onWindowActivate, onStartClick, onClockClick }: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-10 max-md:h-14 flex items-center px-1 gap-1 shadow-lg"
      style={{
        background: 'linear-gradient(to bottom, #3A7CEC, #2559C7)',
        borderTop: '2px solid #5491F5',
        zIndex: 10000,
      }}
    >
      {/* Start Button */}
      <button 
        className="h-8 max-md:h-12 px-4 max-md:px-3 flex items-center gap-2 max-md:gap-1 rounded hover:brightness-110 transition-all"
        style={{
          background: 'linear-gradient(to bottom, #5FAD56, #3C8D34)',
          border: '2px outset #6CBD63',
          boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.5)',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onStartClick();
        }}
        data-start-menu
      >
        <div className="w-5 h-5 max-md:w-6 max-md:h-6 bg-gradient-to-br from-red-500 to-yellow-500 rounded flex items-center justify-center">
          <span className="text-white text-xs max-md:text-sm font-bold">⊞</span>
        </div>
        <span className="font-bold text-white text-sm max-md:text-base italic max-md:hidden" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>
          start
        </span>
      </button>

      {/* Quick Launch Separator */}
      <div className="h-8 max-md:h-12 w-px bg-blue-800/30 mx-1" />

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto">
        {openWindows.map((window) => (
          <button
            key={window.id}
            className="h-8 max-md:h-12 px-3 max-md:px-2 flex items-center gap-2 max-md:gap-1 rounded transition-all min-w-0 max-w-40 max-md:max-w-24"
            style={{
              background: activeWindow === window.id 
                ? 'linear-gradient(to bottom, #EBEBEB, #DEDAD3)' 
                : 'linear-gradient(to bottom, #4A9EFF, #2673DF)',
              border: '2px outset',
              borderColor: activeWindow === window.id ? '#D4D0C8' : '#5FA9FF',
              boxShadow: activeWindow === window.id 
                ? 'inset 1px 1px 2px rgba(0,0,0,0.2)' 
                : 'inset 1px 1px 0 rgba(255,255,255,0.3)',
            }}
            onClick={() => onWindowActivate(window.id)}
          >
            <span className={activeWindow === window.id ? 'text-black' : 'text-white'}>{window.icon}</span>
            <span 
              className={`text-xs max-md:text-[10px] truncate ${activeWindow === window.id ? 'text-black' : 'text-white'} max-md:hidden`}
              style={{ textShadow: activeWindow === window.id ? 'none' : '1px 1px 1px rgba(0,0,0,0.3)' }}
            >
              {window.title}
            </span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="h-8 max-md:h-12 flex items-center gap-2 max-md:gap-1 px-2 max-md:px-1 rounded" style={{
        background: 'linear-gradient(to bottom, #0EA5E9, #0284C7)',
        border: '1px inset #1E88C7',
      }}>
        <span className="text-white text-xs max-md:text-sm max-md:hidden">🔊</span>
        <span className="text-white text-xs max-md:text-sm max-md:hidden">🖧</span>
        <div className="h-6 w-px bg-blue-800/30 mx-1 max-md:hidden" />
        <div 
          className="text-white text-xs max-md:text-[10px] font-semibold px-2 max-md:px-1 cursor-pointer hover:brightness-110" 
          onClick={(e) => {
            e.stopPropagation();
            onClockClick();
          }}
        >
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
}