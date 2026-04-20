import { useState, useRef, useEffect } from 'react';
import { Play, Terminal, Trash2, Code } from 'lucide-react';
import { Case } from '../types/game';

interface PythonEditorProps {
  currentCase?: Case;
  onQueryExecuted?: (result: any) => void;
}

export function PythonEditor({ currentCase, onQueryExecuted }: PythonEditorProps) {
  const [code, setCode] = useState('# UAEPD Decryption Software v2.1\n# Available decryption functions:\n# - base64_decode(text)\n# - caesar_cipher(text, shift)\n# - reverse_string(text)\n# - format_phone(number)\n# - extract_numbers(text)\n# - hex_to_text(hex_str)\n\n');
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [brythonReady, setBrythonReady] = useState(() => !!(window as any).brython_run_code);
  const outputRef = useRef<HTMLDivElement>(null);

  // Poll until Brython's bootstrap has finished setting window.brython_run_code
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
        `>>> [${timestamp}] ⚠️ Python runtime is still loading, please try again in a moment.`,
        '',
      ]);
      return;
    }

    setHistory(prev => [...prev, code]);

    const rawOutput: string = runCode(code);
    const lines = rawOutput ? rawOutput.split('\n') : [];
    // trim the trailing blank line that print() adds
    if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();

    setOutput(prev => [
      ...prev,
      `>>> [${timestamp}] Executing Python code...`,
      '',
      ...lines,
      '',
      '✓ Execution completed',
      '',
    ]);
  };

  const clearOutput = () => setOutput([]);
  const clearCode = () => setCode('');

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-100">
      {/* Header */}
      <div className="bg-[#007acc] text-white px-3 py-2 flex items-center justify-between border-b-2 border-[#005a9e]">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          <span className="font-bold">Decryption Software - UAEPD Cyber Division</span>
        </div>
        <div className="text-xs opacity-90">{brythonReady ? 'Python 3.12 (Brython) ✓' : '⏳ Loading Python...'}</div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex">
          {/* Code Input */}
          <div className="flex-1 flex flex-col border-r-2 border-gray-700">
            <div className="bg-gray-800 px-3 py-1 text-xs font-bold border-b border-gray-700">
              Code Editor
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-[#1e1e1e] text-gray-100 p-3 font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                  executePython();
                }
              }}
            />
            <div className="bg-gray-800 px-3 py-2 flex items-center gap-2 border-t border-gray-700">
              <button
                onClick={executePython}
                disabled={!brythonReady}
                className={`window-95-button px-3 py-1 text-xs flex items-center gap-1 ${brythonReady ? 'bg-green-600 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
              >
                <Play className="w-3 h-3" />
                {brythonReady ? 'Run (Ctrl+Enter)' : 'Loading...'}
              </button>
              <button
                onClick={clearCode}
                className="window-95-button px-3 py-1 text-xs bg-gray-600 text-white flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Clear Code
              </button>
            </div>
          </div>

          {/* Output Console */}
          <div className="flex-1 flex flex-col">
            <div className="bg-gray-800 px-3 py-1 text-xs font-bold border-b border-gray-700 flex justify-between items-center">
              <span>Console Output</span>
              <button
                onClick={clearOutput}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Clear
              </button>
            </div>
            <div
              ref={outputRef}
              className="flex-1 bg-black text-green-400 p-3 font-mono text-xs overflow-auto whitespace-pre-wrap"
            >
              {output.length === 0 ? (
                <div className="text-gray-600">
                  <Terminal className="w-8 h-8 mb-2 opacity-50" />
                  Console ready. Run your code to see output here.
                  <div className="mt-4 text-xs">
                    <div className="text-yellow-400 mb-1">Available Functions:</div>
                    <div>• base64_decode("encoded_text")</div>
                    <div>• caesar_cipher("text", shift)</div>
                    <div>• reverse_string("text")</div>
                    <div>• format_phone("501234567")</div>
                    <div>• extract_numbers("ABC123XYZ456")</div>
                    <div>• hex_to_text("48656c6c6f")</div>
                    <div>• decrypt_rot13("text")</div>
                    <div>• Any valid Python 3 code</div>
                  </div>
                </div>
              ) : (
                output.map((line, i) => (
                  <div key={i} className={line.startsWith('>>>') ? 'text-yellow-400' : line.startsWith('ERROR') ? 'text-red-400' : ''}>
                    {line}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Help Bar */}
      <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-t-2 border-gray-700">
        <strong className="text-blue-400">TIP:</strong> Use Python functions to decrypt messages, format data, and analyze clues from evidence files.
      </div>
    </div>
  );
}