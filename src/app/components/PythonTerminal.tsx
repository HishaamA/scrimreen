import { useState, useRef, useEffect } from 'react';
import { Play, Terminal, Trash2, RotateCcw } from 'lucide-react';

export function PythonTerminal() {
  const [code, setCode] = useState('# Python Terminal - Enviro-Crimes Data Analysis\n# Use Python to decrypt, decode, and analyze data\n\n# Example functions available:\n# decrypt_rot13(text) - ROT13 decryption\n# decode_base64(text) - Base64 decoding\n# caesar_cipher(text, shift) - Caesar cipher\n# reverse_string(text) - Reverse a string\n\n');
  const [output, setOutput] = useState<string[]>([
    '🐍 Python 3.12 (Brython) - UAEPD Crime Analysis Terminal',
    'Type your code and press "Run Code" to execute',
    '-'.repeat(60),
    ''
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [brythonReady, setBrythonReady] = useState(() => !!(window as any).brython_run_code);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (brythonReady) return;
    const id = setInterval(() => {
      if ((window as any).brython_run_code) {
        setBrythonReady(true);
        clearInterval(id);
      }
    }, 150);
    return () => clearInterval(id);
  }, [brythonReady]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const executePython = () => {
    const timestamp = new Date().toLocaleTimeString();
    const runCode = (window as any).brython_run_code;

    if (!runCode) {
      setOutput(prev => [
        ...prev,
        `>>> [${timestamp}] ⚠️ Python runtime is still loading, please try again.`,
        '',
        '-'.repeat(60),
        '',
      ]);
      return;
    }

    setHistory(prev => [...prev, code]);

    const rawOutput: string = runCode(code);
    const lines = rawOutput ? rawOutput.split('\n') : [];
    if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();

    const newOutput = [
      `>>> [${timestamp}] Executing Python code...`,
      '',
      ...(lines.length > 0 ? lines : ['(no output — use print() to display results)']),
      '',
      '-'.repeat(60),
      '',
    ];

    setOutput(prev => [...prev, ...newOutput]);
  };

  const clearOutput = () => {
    setOutput([
      '🐍 Python 3.12 (Brython) - UAEPD Crime Analysis Terminal',
      'Type your code and press "Run Code" to execute',
      '-'.repeat(60),
      ''
    ]);
  };

  const clearCode = () => {
    setCode('# Python Terminal - Enviro-Crimes Data Analysis\n\n');
  };

  const loadExample = () => {
    setCode(`# Example: Decrypt a coded message
message = "URYYB JBEYQ"
decrypted = decrypt_rot13(message)
print("Original:", message)
print("Decrypted:", decrypted)

# Example: Decode base64
encoded = "SGVsbG8gRGV0ZWN0aXZl"
decoded = decode_base64(encoded)
print("Base64 decoded:", decoded)

# Example: Reverse a string
text = "olleh"
reversed_text = reverse_string(text)
print("Reversed:", reversed_text)
`);
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Toolbar */}
      <div className="window-95-panel p-2 flex items-center justify-between border-b-2 border-[#808080]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-600" />
          <span className="text-xs font-bold">Python Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadExample}
            className="window-95-button px-2 py-1 text-xs flex items-center gap-1"
          >
            📚 Load Example
          </button>
          <button
            onClick={clearCode}
            className="window-95-button px-2 py-1 text-xs flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            Clear Code
          </button>
          <button
            onClick={executePython}
            disabled={!brythonReady}
            className={`window-95-button px-3 py-1 text-xs flex items-center gap-1 font-bold ${brythonReady ? 'bg-green-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            <Play className="w-3 h-3" />
            {brythonReady ? 'Run Code' : 'Loading...'}
          </button>
        </div>
      </div>

      {/* Split View */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col border-b-2 border-[#808080]">
          <div className="bg-[#000080] text-white px-2 py-1 text-xs font-bold">
            Code Editor
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-3 font-mono text-sm bg-[#1e1e1e] text-green-400 focus:outline-none resize-none"
            spellCheck={false}
            style={{ 
              lineHeight: '1.5',
              tabSize: 4,
            }}
          />
        </div>

        {/* Output Console */}
        <div className="flex-1 flex flex-col">
          <div className="bg-[#000080] text-white px-2 py-1 text-xs font-bold flex justify-between items-center">
            <span>Output Console</span>
            <button
              onClick={clearOutput}
              className="text-white hover:text-yellow-400 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </button>
          </div>
          <div
            ref={outputRef}
            className="flex-1 p-3 font-mono text-xs bg-black text-green-400 overflow-auto"
            style={{ lineHeight: '1.6' }}
          >
            {output.map((line, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="window-95-panel px-3 py-1 border-t-2 border-[#808080] text-xs text-gray-600 flex justify-between">
        <span>Python 3.12 (Brython) | UAEPD Crime Analysis System</span>
        <span>Ready</span>
      </div>
    </div>
  );
}
