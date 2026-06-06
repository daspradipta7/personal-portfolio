import { useState, useRef, useEffect, ReactNode } from 'react';

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  size: 'small' | 'medium' | 'large';
}

export function DesktopIcon({ icon, label, onClick, position, onPositionChange, size }: DesktopIconProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number } | null>(null);
  const clickTimeRef = useRef<number>(0);
  const clickCountRef = useRef<number>(0);

  const sizeMap = {
    small: { iconSize: 24, width: 'w-16 max-md:w-20', text: 'text-[10px] max-md:text-xs' },
    medium: { iconSize: 36, width: 'w-20 max-md:w-24', text: 'text-xs max-md:text-sm' },
    large: { iconSize: 52, width: 'w-28 max-md:w-32', text: 'text-sm max-md:text-base' },
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      onPositionChange({
        x: Math.max(0, Math.min(window.innerWidth - 100, newX)),
        y: Math.max(0, Math.min(window.innerHeight - 150, newY)),
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
  }, [isDragging, dragOffset, onPositionChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const now = Date.now();
    const timeSinceLastClick = now - clickTimeRef.current;

    if (timeSinceLastClick < 300) {
      clickCountRef.current += 1;
    } else {
      clickCountRef.current = 1;
    }
    clickTimeRef.current = now;

    if (clickCountRef.current === 2) {
      onClick();
      clickCountRef.current = 0;
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY };
  };

  const s = sizeMap[size];

  return (
    <div
      className={`absolute flex flex-col items-center gap-1 ${s.width} cursor-pointer group select-none`}
      style={{ left: position.x, top: position.y, cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="flex items-center justify-center p-2 rounded-lg bg-white/10 group-hover:bg-white/25 transition-all pointer-events-none backdrop-blur-sm"
        style={{ width: s.iconSize + 20, height: s.iconSize + 20 }}
      >
        <div className="text-white drop-shadow-lg" style={{ width: s.iconSize, height: s.iconSize }}>
          {icon}
        </div>
      </div>
      <div
        className={`${s.text} text-white text-center px-1 py-0.5 rounded group-hover:bg-[#0054E3]/50 pointer-events-none`}
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
      >
        {label}
      </div>
    </div>
  );
}
