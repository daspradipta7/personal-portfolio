import { useEffect, useState } from 'react';

interface CalendarProps {
  onClose: () => void;
}

export function Calendar({ onClose }: CalendarProps) {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const handleClick = () => onClose();
    
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-6 w-6" />
      );
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === currentDate.getDate() &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          className={`h-6 w-6 flex items-center justify-center text-xs cursor-pointer hover:bg-[#0054E3] hover:text-white transition-colors ${
            isToday ? 'bg-[#0054E3] text-white font-bold' : ''
          }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div
      className="fixed bottom-14 max-md:bottom-16 right-2 bg-[#ECE9D8] shadow-2xl z-[10001] w-64 max-md:w-72"
      style={{
        border: '3px solid',
        borderColor: '#FFFFFF #404040 #404040 #FFFFFF',
        borderRadius: '4px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0054E3] to-[#4A9EFF] text-white p-2 flex items-center justify-between">
        <button
          className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded"
          onClick={prevMonth}
        >
          ◀
        </button>
        <div className="font-bold text-sm">
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </div>
        <button
          className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded"
          onClick={nextMonth}
        >
          ▶
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="p-3">
        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="h-6 w-6 flex items-center justify-center text-xs font-bold text-[#0054E3]"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-[#808080] p-2 text-center">
        <div className="text-xs text-gray-700">
          Hoy: {currentDate.toLocaleDateString('es-MX', { 
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
}
