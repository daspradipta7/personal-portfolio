import { useState, useRef, useEffect, ReactNode } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  isActive: boolean;
  onActivate: () => void;
  initialPosition: { x: number; y: number };
  zIndex: number;
  noContentWrapper?: boolean;
  width?: string;
}

export function Window({
  title,
  icon,
  children,
  onClose,
  onMinimize,
  isActive,
  onActivate,
  initialPosition,
  zIndex,
  noContentWrapper = false,
  width = '600px',
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousPosition, setPreviousPosition] = useState(initialPosition);
  const dragRef = useRef<{ startX: number; startY: number; elementX: number; elementY: number } | null>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;

      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      setPosition({
        x: dragRef.current.elementX + deltaX,
        y: Math.max(0, dragRef.current.elementY + deltaY),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-button')) return;
    
    // Don't enable dragging on mobile
    if (window.innerWidth < 768) return;
    
    onActivate();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      elementX: position.x,
      elementY: position.y,
    };
  };

  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(previousPosition);
      setIsMaximized(false);
    } else {
      setPreviousPosition(position);
      setPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
  };

  return (
    <div
      className={`fixed bg-[#ECE9D8] shadow-2xl ${
        isMaximized ? 'inset-0 bottom-10' : ''
      } max-md:!left-0 max-md:!top-0 max-md:!w-full max-md:!bottom-10 max-md:!h-[calc(100vh-40px)]`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : width,
        height: isMaximized ? 'calc(100vh - 40px)' : 'auto',
        maxHeight: isMaximized ? 'calc(100vh - 40px)' : 'calc(100vh - 100px)',
        zIndex,
        border: '3px solid',
        borderColor: isActive ? '#0054E3 #003C9F #003C9F #0054E3' : '#7A96DF #4A77CE #4A77CE #7A96DF',
        borderRadius: '8px 8px 0 0',
      }}
      onClick={onActivate}
    >
      {/* Title Bar */}
      <div
        className="h-8 max-md:h-12 px-2 flex items-center justify-between cursor-move select-none"
        style={{
          background: isActive 
            ? 'linear-gradient(to right, #0054E3, #4A9EFF)' 
            : 'linear-gradient(to right, #7A96DF, #A5B8E7)',
          borderRadius: '5px 5px 0 0',
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 max-md:w-8 max-md:h-8 flex items-center justify-center">{icon}</div>
          <span className="font-bold text-white text-sm max-md:text-base truncate">{title}</span>
        </div>
        <div className="flex gap-1 max-md:gap-2">
          <button
            className="window-button w-6 h-6 max-md:w-10 max-md:h-10 flex items-center justify-center bg-[#D4D0C8] hover:bg-[#E8E5DA] border border-white border-b-[#808080] border-r-[#808080] active:border-b-white active:border-r-white active:border-t-[#808080] active:border-l-[#808080]"
            onClick={onMinimize}
            title="Minimize"
          >
            <Minus className="w-3 h-3 max-md:w-5 max-md:h-5" />
          </button>
          <button
            className="window-button w-6 h-6 max-md:w-10 max-md:h-10 md:flex items-center justify-center bg-[#D4D0C8] hover:bg-[#E8E5DA] border border-white border-b-[#808080] border-r-[#808080] active:border-b-white active:border-r-white active:border-t-[#808080] active:border-l-[#808080] max-md:hidden"
            onClick={handleMaximize}
            title="Maximize"
          >
            <Square className="w-3 h-3 max-md:w-5 max-md:h-5" />
          </button>
          <button
            className="window-button w-6 h-6 max-md:w-10 max-md:h-10 flex items-center justify-center bg-[#D4D0C8] hover:bg-[#E8E5DA] border border-white border-b-[#808080] border-r-[#808080] active:border-b-white active:border-r-white active:border-t-[#808080] active:border-l-[#808080]"
            onClick={onClose}
            title="Close"
          >
            <X className="w-3 h-3 max-md:w-5 max-md:h-5" />
          </button>
        </div>
      </div>

      {/* Menu Bar - Only show for non-CMD windows and desktop */}
      {!noContentWrapper && (
        <div className="h-6 bg-[#ECE9D8] border-b border-[#FFFFFF] flex items-center px-2 gap-3 max-md:hidden">
          <span className="text-xs hover:bg-[#D1E3FF] px-2 py-1 cursor-pointer">File</span>
          <span className="text-xs hover:bg-[#D1E3FF] px-2 py-1 cursor-pointer">Edit</span>
          <span className="text-xs hover:bg-[#D1E3FF] px-2 py-1 cursor-pointer">View</span>
          <span className="text-xs hover:bg-[#D1E3FF] px-2 py-1 cursor-pointer">Help</span>
        </div>
      )}

      {/* Content */}
      {noContentWrapper ? (
        <div 
          className="max-md:h-[calc(100%-48px)] md:h-auto"
          style={{ 
            height: isMaximized ? 'calc(100% - 32px)' : '500px'
          }}
        >
          {children}
        </div>
      ) : (
        <div 
          className="overflow-y-auto bg-white m-2 p-4 max-md:p-3 border-2 border-[#808080] border-t-[#404040] border-l-[#404040] max-md:m-1"
          style={{ 
            height: isMaximized ? 'calc(100% - 80px)' : 'auto',
            maxHeight: isMaximized ? 'calc(100% - 80px)' : '500px'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}