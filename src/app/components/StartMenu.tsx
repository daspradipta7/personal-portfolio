import { useEffect, ReactNode } from 'react';

interface StartMenuProps {
  onClose: () => void;
  onOpenWindow: (id: string) => void;
  icons: Array<{ id: string; icon: ReactNode; label: string }>;
}

export function StartMenu({ onClose, onOpenWindow, icons }: StartMenuProps) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Solo cerrar si el click es fuera del menú
      const target = e.target as HTMLElement;
      if (!target.closest('[data-start-menu]')) {
        onClose();
      }
    };
    
    // Delay para no cerrar inmediatamente cuando se abre
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  const handleItemClick = (id: string) => {
    onOpenWindow(id);
    onClose();
  };

  return (
    <div
      className="fixed bottom-14 max-md:bottom-16 left-0 bg-[#D4D0C8] shadow-2xl z-[10001] w-80 max-md:w-full"
      style={{
        border: '3px solid',
        borderColor: '#FFFFFF #404040 #404040 #FFFFFF',
        borderRadius: '8px 8px 0 0',
      }}
      onClick={(e) => e.stopPropagation()}
      data-start-menu
    >
      <div className="flex h-full">
        {/* Left Banner */}
        <div 
          className="w-12 flex items-end pb-2 text-white font-bold text-xl writing-mode-vertical"
          style={{
            background: 'linear-gradient(to top, #2559C7, #3A7CEC)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          <span className="pl-2 text-sm">Windows XP</span>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-2">
          {/* Pinned Programs */}
          <div className="space-y-1">
            {icons.map((icon) => (
              <div
                key={icon.id}
                className="px-4 py-2 hover:bg-[#0054E3] hover:text-white cursor-pointer flex items-center gap-3 transition-colors"
                onClick={() => handleItemClick(icon.id)}
              >
                <span className="text-gray-700">{icon.icon}</span>
                <span className="text-sm font-semibold">{icon.label}</span>
              </div>
            ))}
          </div>

          <div className="h-px bg-[#808080] my-2 mx-2" />

          {/* All Programs */}
          <div className="px-4 py-2 hover:bg-[#0054E3] hover:text-white cursor-pointer flex items-center gap-3 transition-colors">
            <span className="text-xl">📁</span>
            <span className="text-sm font-semibold">All Programs</span>
            <span className="ml-auto text-xl">▶</span>
          </div>

          <div className="h-px bg-[#808080] my-2 mx-2" />

          {/* Footer */}
          <div className="flex px-2 gap-2 pb-2">
            <button className="flex-1 py-2 px-3 bg-gradient-to-b from-[#F5A623] to-[#D4851C] hover:brightness-110 rounded border-2 border-[#FFFFFF] border-b-[#808080] border-r-[#808080] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2">
              <span>🔒</span>
              Log Off
            </button>
            <button className="flex-1 py-2 px-3 bg-gradient-to-b from-[#F55A4E] to-[#D43F34] hover:brightness-110 rounded border-2 border-[#FFFFFF] border-b-[#808080] border-r-[#808080] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2">
              <span>⏻</span>
              Turn Off
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}