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
          { text: 'Comandos disponibles:', type: 'output' },
          { text: '', type: 'output' },
          { text: 'ABOUT       - Información personal', type: 'output' },
          { text: 'EXPERIENCE  - Experiencia profesional', type: 'output' },
          { text: 'SKILLS      - Habilidades técnicas', type: 'output' },
          { text: 'EDUCATION   - Formación académica', type: 'output' },
          { text: 'PROJECTS    - Proyectos destacados', type: 'output' },
          { text: 'CONTACT     - Información de contacto', type: 'output' },
          { text: 'DIR         - Lista todas las secciones', type: 'output' },
          { text: 'CLS         - Limpia la pantalla', type: 'output' },
          { text: 'ECHO        - Muestra un mensaje', type: 'output' },
          { text: 'DATE        - Muestra la fecha actual', type: 'output' },
          { text: 'TIME        - Muestra la hora actual', type: 'output' },
          { text: 'VER         - Muestra la versión del sistema', type: 'output' },
          { text: 'CLEAR       - Alias para CLS', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'about':
        output = [
          { text: '=== SOBRE MÍ ===', type: 'output' },
          { text: '', type: 'output' },
          { text: 'Nombre: Joel Campos', type: 'output' },
          { text: 'Título: Full-Stack Software Engineer', type: 'output' },
          { text: 'Ubicación: Guadalajara, Jalisco', type: 'output' },
          { text: '', type: 'output' },
          { text: 'Ingeniero full-stack especializado en JavaScript (React.js, Node.js)', type: 'output' },
          { text: 'con experiencia en sistemas SQL y plataformas Laravel.', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'experience':
        output = [
          { text: '=== EXPERIENCIA PROFESIONAL ===', type: 'output' },
          { text: '', type: 'output' },
          { text: '1. Software Engineer - Gobierno de Zapopan (Feb 2023 - Presente)', type: 'output' },
          { text: '   • Desarrollo de procedimientos SQL para servicios ciudadanos', type: 'output' },
          { text: '   • Desarrollo React.js para plataformas de gestión', type: 'output' },
          { text: '   • Integración de API bancaria Banorte', type: 'output' },
          { text: '   • Mantenimiento de sistemas legacy C# + DevExpress', type: 'output' },
          { text: '', type: 'output' },
          { text: '2. Software Engineer - Freelance (May 2021 - Feb 2023)', type: 'output' },
          { text: '   • Desarrollo e-commerce: Shopify, WordPress, Laravel', type: 'output' },
          { text: '   • Integración analytics: Klaviyo, Google Tag Manager', type: 'output' },
          { text: '   • Layouts responsivos optimizados para SEO', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'skills':
        output = [
          { text: '=== HABILIDADES TÉCNICAS ===', type: 'output' },
          { text: '', type: 'output' },
          { text: 'Frontend:  React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap', type: 'output' },
          { text: 'Backend:   Node.js, Express.js, Laravel (PHP), C# (.NET Core)', type: 'output' },
          { text: 'Databases: SQL Server, PostgreSQL, MySQL', type: 'output' },
          { text: 'Tools:     Git, AWS, Figma, DevExpress, Shopify, WordPress', type: 'output' },
          { text: 'Other:     REST APIs, Stored Procedures, System Integration', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'education':
        output = [
          { text: '=== FORMACIÓN ACADÉMICA ===', type: 'output' },
          { text: '', type: 'output' },
          { text: 'B.S. in Information Technology Engineering', type: 'output' },
          { text: 'Universidad Tecnológica de Jalisco', type: 'output' },
          { text: '2019 - 2023', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'projects':
        output = [
          { text: '=== PROYECTOS DESTACADOS ===', type: 'output' },
          { text: '', type: 'output' },
          { text: '1. Transformación Digital Gubernamental', type: 'output' },
          { text: '   Tech: React.js, SQL Server, C#, DevExpress, Banking APIs', type: 'output' },
          { text: '', type: 'output' },
          { text: '2. Soluciones E-Commerce', type: 'output' },
          { text: '   Tech: Shopify, WordPress, Laravel, Klaviyo, GTM', type: 'output' },
          { text: '', type: 'output' },
          { text: '3. Modernización de Sistemas Legacy', type: 'output' },
          { text: '   Tech: C#, .NET Core, SQL Server, React.js', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'contact':
        output = [
          { text: '=== INFORMACIÓN DE CONTACTO ===', type: 'output' },
          { text: '', type: 'output' },
          { text: 'Email:    joelcamposlalo@gmail.com', type: 'output' },
          { text: 'LinkedIn: linkedin.com/in/joel-campos', type: 'output' },
          { text: 'Phone:    +52 33 25 79 98 04', type: 'output' },
          { text: 'Location: Guadalajara, Jalisco, Mexico', type: 'output' },
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
          { text: message || 'ECHO está activado.', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'date':
        output = [
          { text: `La fecha actual es: ${new Date().toLocaleDateString('es-MX', { 
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
          { text: `La hora actual es: ${new Date().toLocaleTimeString('es-MX')}`, type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      case 'ver':
        output = [
          { text: '', type: 'output' },
          { text: 'Microsoft Windows XP [Versión 5.1.2600]', type: 'output' },
          { text: 'Joel Campos Portfolio Edition', type: 'output' },
          { text: '', type: 'output' },
        ];
        break;

      default:
        output = [
          { text: `'${cmd}' no se reconoce como un comando interno o externo,`, type: 'error' },
          { text: `programa o archivo por lotes ejecutable.`, type: 'error' },
          { text: `Escribe 'help' para ver los comandos disponibles.`, type: 'output' },
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
