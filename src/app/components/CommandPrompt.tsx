import { useState, useRef, useEffect } from 'react';

interface CMDLine {
  text: string;
  type: 'command' | 'output' | 'error';
}

export function CommandPrompt() {
  const [history, setHistory] = useState<CMDLine[]>([
    { text: 'Microsoft Windows XP [Version 5.1.2600]', type: 'output' },
    { text: '(C) Copyright 1985-2001 Microsoft Corp.', type: 'output' },
    { text: '', type: 'output' },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(' ');
    const mainCmd = args[0];

    setHistory((prev) => [...prev, { text: `C:\\Portfolio> ${cmd}`, type: 'command' }]);

    if (!trimmedCmd) {
      return;
    }

    setCommandHistory((prev) => [...prev, cmd]);

    let output: CMDLine[] = [];

    switch (mainCmd) {
      case 'help':
        output = [
          { text: 'Available commands:', type: 'output' },
          { text: '', type: 'output' },
          { text: 'ABOUT       - Personal information', type: 'output' },
          { text: 'EXPERIENCE  - Professional experience', type: 'output' },
          { text: 'SKILLS      - Technical skills', type: 'output' },
          { text: 'EDUCATION   - Academic background', type: 'output' },
          { text: 'PROJECTS    - Featured projects', type: 'output' },
          { text: 'CONTACT     - Contact information', type: 'output' },
          { text: 'DIR         - List all sections', type: 'output' },
          { text: 'CLS         - Clear the screen', type: 'output' },
          { text: 'ECHO        - Show a message', type: 'output' },
          { text: 'DATE        - Show current date', type: 'output' },
          { text: 'TIME        - Show current time', type: 'output' },
          { text: 'VER         - Show system version', type: 'output' },
          { text: 'CLEAR       - Alias for CLS', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'about':
        output = [
          { text: '=== ABOUT ME ===', type: 'output' },
          { text: '', type: 'output' },
          { text: 'Name: Pradipta Das', type: 'output' },
          { text: 'Title: Full Stack Engineer', type: 'output' },
          { text: 'Location: Bhubaneswar, Odisha, India', type: 'output' },
          { text: '', type: 'output' },
          { text: 'Full-stack engineer specializing in JavaScript (React.js, Node.js)', type: 'output' },
          { text: 'with experience in SQL systems and Laravel platforms.', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'experience':
        output = [
          { text: '=== PROFESSIONAL EXPERIENCE ===', type: 'output' },
          { text: '', type: 'output' },
          { text: '1. Software Engineer - Gobierno de Zapopan (Feb 2023 - Present)', type: 'output' },
          { text: '   • Built SQL procedures for citizen service platforms', type: 'output' },
          { text: '   • Developed React.js solutions for management systems', type: 'output' },
          { text: '   • Integrated Banorte banking APIs', type: 'output' },
          { text: '   • Maintained legacy C# + DevExpress applications', type: 'output' },
          { text: '', type: 'output' },
          { text: '2. Software Engineer - Freelance (May 2021 - Feb 2023)', type: 'output' },
          { text: '   • Delivered e-commerce experiences with Shopify, WordPress, Laravel', type: 'output' },
          { text: '   • Integrated analytics using Klaviyo and Google Tag Manager', type: 'output' },
          { text: '   • Created responsive layouts optimized for SEO', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'skills':
        output = [
          { text: '=== TECHNICAL SKILLS ===', type: 'output' },
          { text: '', type: 'output' },
          { text: 'Frontend:  React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap', type: 'output' },
          { text: 'Full Stack:   Node.js, Express.js, Laravel (PHP), C# (.NET Core)', type: 'output' },
          { text: 'Databases: SQL Server, PostgreSQL, MySQL', type: 'output' },
          { text: 'Tools:     Git, AWS, Figma, DevExpress, Shopify, WordPress', type: 'output' },
          { text: 'Other:     REST APIs, Stored Procedures, System Integration', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'education':
        output = [
          { text: '=== ACADEMIC BACKGROUND ===', type: 'output' },
          { text: '', type: 'output' },
          { text: 'B.S. in Information Technology Engineering', type: 'output' },
          { text: 'Universidad Tecnológica de Jalisco', type: 'output' },
          { text: '2019 - 2023', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'projects':
        output = [
          { text: '=== FEATURED PROJECTS ===', type: 'output' },
          { text: '', type: 'output' },
          { text: '1. Government Digital Transformation', type: 'output' },
          { text: '   Tech: React.js, SQL Server, C#, DevExpress, Banking APIs', type: 'output' },
          { text: '', type: 'output' },
          { text: '2. E-Commerce Solutions', type: 'output' },
          { text: '   Tech: Shopify, WordPress, Laravel, Klaviyo, GTM', type: 'output' },
          { text: '', type: 'output' },
          { text: '3. Legacy System Modernization', type: 'output' },
          { text: '   Tech: C#, .NET Core, SQL Server, React.js', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'contact':
        output = [
          { text: '=== CONTACT INFORMATION ===', type: 'output' },
          { text: '', type: 'output' },
          { text: 'Email:    pradiptad@gmail.com', type: 'output' },
          { text: 'LinkedIn: linkedin.com/in/daspradipta7', type: 'output' },
          { text: 'Phone:    +91 9999999700', type: 'output' },
          { text: 'Location: Bhubaneswar, Odisha, India', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'dir':
        output = [
          { text: ' El volumen de la unidad C es PORTFOLIO', type: 'output' },
          { text: ' Número de serie del volumen: 2024-A8F3', type: 'output' },
          { text: '', type: 'output' },
          { text: ' Directorio de C:\\Portfolio', type: 'output' },
          { text: '', type: 'output' },
          { text: '11/03/2026  10:30 AM    <DIR>          About', type: 'output' },
          { text: '11/03/2026  10:30 AM    <DIR>          Experience', type: 'output' },
          { text: '11/03/2026  10:30 AM    <DIR>          Skills', type: 'output' },
          { text: '11/03/2026  10:30 AM    <DIR>          Education', type: 'output' },
          { text: '11/03/2026  10:30 AM    <DIR>          Projects', type: 'output' },
          { text: '11/03/2026  10:30 AM    <DIR>          Contact', type: 'output' },
          { text: '               0 archivos              0 bytes', type: 'output' },
          { text: '               6 dirs     1,048,576 bytes libres', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'cls':
      case 'clear':
        setHistory([]);
        return;

      case 'echo':
        const message = args.slice(1).join(' ');
        output = [
          { text: message || 'ECHO is on.', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'date':
        output = [
          { text: `Current date is: ${new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}`, type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'time':
        output = [
          { text: `Current time is: ${new Date().toLocaleTimeString('en-US')}`, type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'ver':
        output = [
          { text: '', type: 'output' },
          { text: 'Microsoft Windows XP [Versión 5.1.2600]', type: 'output' },
          { text: 'Pradipta Das Portfolio Edition', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      default:
        output = [
          { text: `'${cmd}' is not recognized as an internal or external command,`, type: 'error' },
          { text: `operable program or batch file.`, type: 'error' },
          { text: `Type 'help' to see available commands.`, type: 'output' },
          { text: '', type: 'output' },
        ];
    }

    setHistory((prev) => [...prev, ...output]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1 && historyIndex === newIndex) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div 
      className="h-full bg-black text-white font-mono text-sm p-3 cursor-text overflow-hidden flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {history.map((line, index) => (
          <div 
            key={index} 
            className={`${line.type === 'command' ? 'text-white' : line.type === 'error' ? 'text-red-400' : 'text-gray-300'}`}
          >
            {line.text}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-white mr-1">C:\Portfolio&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white caret-white"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
