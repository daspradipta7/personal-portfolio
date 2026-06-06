import { useEffect } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onLargeIcons: () => void;
  onMediumIcons: () => void;
  onSmallIcons: () => void;
  currentSize: 'small' | 'medium' | 'large';
}

export function ContextMenu({ x, y, onClose, onLargeIcons, onMediumIcons, onSmallIcons, currentSize }: ContextMenuProps) {
  useEffect(() => {
    const handleClick = () => onClose();
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      onClose();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [onClose]);

  return (
    <div
      className="fixed bg-[#ECE9D8] border-2 shadow-lg z-[10001] min-w-[200px]"
      style={{
        left: x,
        top: y,
        borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        <div className="px-8 py-2 text-sm text-gray-400 cursor-default">
          Ver
        </div>
        <div className="h-px bg-[#808080] mx-2" />
        
        <div
          className={`px-8 py-2 text-sm cursor-pointer hover:bg-[#0054E3] hover:text-white flex items-center gap-2 ${
            currentSize === 'large' ? 'font-bold' : ''
          }`}
          onClick={onLargeIcons}
        >
          {currentSize === 'large' && <span className="absolute left-2">●</span>}
          Iconos grandes
        </div>
        
        <div
          className={`px-8 py-2 text-sm cursor-pointer hover:bg-[#0054E3] hover:text-white flex items-center gap-2 ${
            currentSize === 'medium' ? 'font-bold' : ''
          }`}
          onClick={onMediumIcons}
        >
          {currentSize === 'medium' && <span className="absolute left-2">●</span>}
          Iconos medianos
        </div>
        
        <div
          className={`px-8 py-2 text-sm cursor-pointer hover:bg-[#0054E3] hover:text-white flex items-center gap-2 ${
            currentSize === 'small' ? 'font-bold' : ''
          }`}
          onClick={onSmallIcons}
        >
          {currentSize === 'small' && <span className="absolute left-2">●</span>}
          Iconos pequeños
        </div>

        <div className="h-px bg-[#808080] mx-2 my-1" />
        
        <div className="px-8 py-2 text-sm cursor-pointer hover:bg-[#0054E3] hover:text-white">
          Actualizar
        </div>
      </div>
    </div>
  );
}
