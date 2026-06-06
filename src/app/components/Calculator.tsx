import { useState } from 'react';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue !== null && operation && !shouldResetDisplay) {
      handleEquals();
    } else {
      setPreviousValue(currentValue);
    }
    
    setOperation(op);
    setShouldResetDisplay(true);
  };

  const handleEquals = () => {
    if (previousValue === null || operation === null) return;

    const currentValue = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
        result = previousValue - currentValue;
        break;
      case '*':
        result = previousValue * currentValue;
        break;
      case '/':
        result = currentValue !== 0 ? previousValue / currentValue : 0;
        break;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handleClearEntry = () => {
    setDisplay('0');
    setShouldResetDisplay(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay((value / 100).toString());
  };

  const handleSign = () => {
    const value = parseFloat(display);
    setDisplay((-value).toString());
  };

  const CalcButton = ({ 
    value, 
    onClick, 
    className = '',
    span = false 
  }: { 
    value: string; 
    onClick: () => void; 
    className?: string;
    span?: boolean;
  }) => (
    <button
      className={`h-10 flex items-center justify-center text-sm font-semibold transition-all ${
        span ? 'col-span-2' : ''
      } ${className}`}
      style={{
        background: className.includes('bg-') ? '' : 'linear-gradient(to bottom, #ECE9D8, #D4D0C8)',
        border: '2px outset #FFFFFF',
        boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.8)',
      }}
      onClick={onClick}
      onMouseDown={(e) => {
        e.currentTarget.style.border = '2px inset #808080';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.border = '2px outset #FFFFFF';
      }}
    >
      {value}
    </button>
  );

  return (
    <div className="bg-[#ECE9D8] p-2 select-none">
      {/* Display */}
      <div 
        className="bg-white border-2 mb-3 p-2 text-right text-2xl font-mono h-14 flex items-center justify-end"
        style={{
          borderColor: '#808080 #FFFFFF #FFFFFF #808080',
        }}
      >
        {display}
      </div>

      {/* Memory & Clear Buttons */}
      <div className="grid grid-cols-5 gap-1 mb-1">
        <CalcButton value="MC" onClick={() => {}} className="text-gray-600" />
        <CalcButton value="MR" onClick={() => {}} className="text-gray-600" />
        <CalcButton value="MS" onClick={() => {}} className="text-gray-600" />
        <CalcButton value="M+" onClick={() => {}} className="text-gray-600" />
        <CalcButton value="M-" onClick={() => {}} className="text-gray-600" />
      </div>

      {/* Calculator Buttons */}
      <div className="grid grid-cols-5 gap-1">
        <CalcButton value="Back" onClick={handleBackspace} className="text-red-600" />
        <CalcButton value="CE" onClick={handleClearEntry} className="text-red-600" />
        <CalcButton value="C" onClick={handleClear} className="text-red-600" />
        <CalcButton value="±" onClick={handleSign} className="text-blue-600" />
        <CalcButton value="√" onClick={() => setDisplay(Math.sqrt(parseFloat(display)).toString())} className="text-blue-600" />

        <CalcButton value="7" onClick={() => handleNumber('7')} />
        <CalcButton value="8" onClick={() => handleNumber('8')} />
        <CalcButton value="9" onClick={() => handleNumber('9')} />
        <CalcButton value="/" onClick={() => handleOperation('/')} className="text-red-600" />
        <CalcButton value="%" onClick={handlePercentage} className="text-blue-600" />

        <CalcButton value="4" onClick={() => handleNumber('4')} />
        <CalcButton value="5" onClick={() => handleNumber('5')} />
        <CalcButton value="6" onClick={() => handleNumber('6')} />
        <CalcButton value="*" onClick={() => handleOperation('*')} className="text-red-600" />
        <CalcButton value="1/x" onClick={() => setDisplay((1 / parseFloat(display)).toString())} className="text-blue-600" />

        <CalcButton value="1" onClick={() => handleNumber('1')} />
        <CalcButton value="2" onClick={() => handleNumber('2')} />
        <CalcButton value="3" onClick={() => handleNumber('3')} />
        <CalcButton value="-" onClick={() => handleOperation('-')} className="text-red-600" />
        <CalcButton 
          value="=" 
          onClick={handleEquals} 
          className="row-span-2 bg-gradient-to-b from-[#4A9EFF] to-[#2673DF] text-white border-blue-600" 
        />

        <CalcButton value="0" onClick={() => handleNumber('0')} span />
        <CalcButton value="." onClick={handleDecimal} />
        <CalcButton value="+" onClick={() => handleOperation('+')} className="text-red-600" />
      </div>
    </div>
  );
}
