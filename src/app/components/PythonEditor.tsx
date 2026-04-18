import { useState, useRef, useEffect } from 'react';
import { Play, Terminal, Trash2, Code } from 'lucide-react';
import { Case } from '../types/game';

interface PythonEditorProps {
  currentCase?: Case;
  onQueryExecuted?: (result: any) => void;
}

export function PythonEditor({ currentCase, onQueryExecuted }: PythonEditorProps) {
  const [code, setCode] = useState('# UAEPD Decryption Software v2.1\n# Available decryption functions:\n# - base64_decode(text)\n# - caesar_cipher(text, shift)\n# - reverse_string(text)\n# - format_phone(number)\n# - extract_numbers(text)\n\n');
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Python-like helper functions
  const base64Decode = (text: string): string => {
    try {
      return atob(text);
    } catch {
      return 'ERROR: Invalid base64 string';
    }
  };

  const caesarCipher = (text: string, shift: number): string => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode((((code - base + shift) % 26) + 26) % 26 + base);
      }
      return char;
    }).join('');
  };

  const reverseString = (text: string): string => {
    return text.split('').reverse().join('');
  };

  const formatPhone = (number: string): string => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 9) {
      return `+971 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
    }
    return number;
  };

  const extractNumbers = (text: string): string[] => {
    return text.match(/\d+/g) || [];
  };

  const hexToText = (hex: string): string => {
    try {
      return hex.match(/.{1,2}/g)?.map(byte => String.fromCharCode(parseInt(byte, 16))).join('') || 'ERROR';
    } catch {
      return 'ERROR: Invalid hex string';
    }
  };

  const executePython = () => {
    const timestamp = new Date().toLocaleTimeString();
    const newOutput = [`>>> [${timestamp}] Executing Python code...`, ''];

    try {
      setHistory([...history, code]);

      // Parse and execute different Python-like commands
      const lines = code.split('\n').filter(line => !line.trim().startsWith('#') && line.trim() !== '');
      
      if (lines.length === 0) {
        newOutput.push('No code to execute.');
        setOutput([...output, ...newOutput]);
        return;
      }

      // Execute each line
      lines.forEach(line => {
        const trimmed = line.trim();
        
        // base64_decode()
        if (trimmed.match(/base64_decode\(['"](.+)['"]\)/)) {
          const match = trimmed.match(/base64_decode\(['"](.+)['"]\)/);
          if (match) {
            const result = base64Decode(match[1]);
            newOutput.push(`>>> ${trimmed}`);
            newOutput.push(`Output: ${result}`);
            newOutput.push('');
          }
        }
        // caesar_cipher()
        else if (trimmed.match(/caesar_cipher\(['"](.+)['"],\s*(-?\d+)\)/)) {
          const match = trimmed.match(/caesar_cipher\(['"](.+)['"],\s*(-?\d+)\)/);
          if (match) {
            const result = caesarCipher(match[1], parseInt(match[2]));
            newOutput.push(`>>> ${trimmed}`);
            newOutput.push(`Output: ${result}`);
            newOutput.push('');
          }
        }
        // reverse_string()
        else if (trimmed.match(/reverse_string\(['"](.+)['"]\)/)) {
          const match = trimmed.match(/reverse_string\(['"](.+)['"]\)/);
          if (match) {
            const result = reverseString(match[1]);
            newOutput.push(`>>> ${trimmed}`);
            newOutput.push(`Output: ${result}`);
            newOutput.push('');
          }
        }
        // format_phone()
        else if (trimmed.match(/format_phone\(['"](.+)['"]\)/)) {
          const match = trimmed.match(/format_phone\(['"](.+)['"]\)/);
          if (match) {
            const result = formatPhone(match[1]);
            newOutput.push(`>>> ${trimmed}`);
            newOutput.push(`Output: ${result}`);
            newOutput.push('');
          }
        }
        // extract_numbers()
        else if (trimmed.match(/extract_numbers\(['"](.+)['"]\)/)) {
          const match = trimmed.match(/extract_numbers\(['"](.+)['"]\)/);
          if (match) {
            const result = extractNumbers(match[1]);
            newOutput.push(`>>> ${trimmed}`);
            newOutput.push(`Output: [${result.join(', ')}]`);
            newOutput.push('');
          }
        }
        // hex_to_text()
        else if (trimmed.match(/hex_to_text\(['"](.+)['"]\)/)) {
          const match = trimmed.match(/hex_to_text\(['"](.+)['"]\)/);
          if (match) {
            const result = hexToText(match[1]);
            newOutput.push(`>>> ${trimmed}`);
            newOutput.push(`Output: ${result}`);
            newOutput.push('');
          }
        }
        // print() - validate proper quotes
        else if (trimmed.startsWith('print(')) {
          // Check if quotes are properly matched
          const hasOpeningQuote = trimmed.includes('("') || trimmed.includes("('");
          const hasClosingQuote = trimmed.includes('")') || trimmed.includes("')");
          
          // Check for mismatched quotes like print(hello world")
          const quoteCount = (trimmed.match(/["']/g) || []).length;
          
          if (!hasOpeningQuote || !hasClosingQuote || quoteCount !== 2) {
            newOutput.push(`>>> ${trimmed}`);
            newOutput.push(`❌ SyntaxError: Missing or mismatched quotes`);
            newOutput.push(`   Correct format: print("your message")`);
            newOutput.push('');
          } else {
            const match = trimmed.match(/print\(['"](.*?)['"]\)/);
            if (match) {
              newOutput.push(`>>> ${trimmed}`);
              newOutput.push(match[1]);
              newOutput.push('');
            } else {
              newOutput.push(`>>> ${trimmed}`);
              newOutput.push(`❌ SyntaxError: Invalid print() syntax`);
              newOutput.push(`   Correct format: print("your message")`);
              newOutput.push('');
            }
          }
        }
        // Math operations
        else if (trimmed.match(/^\d+\s*[\+\-\*\/]\s*\d+$/)) {
          try {
            // Safe math evaluation without eval
            const mathMatch = trimmed.match(/^(\d+)\s*([\+\-\*\/])\s*(\d+)$/);
            if (mathMatch) {
              const a = parseFloat(mathMatch[1]);
              const op = mathMatch[2];
              const b = parseFloat(mathMatch[3]);
              let result: number;
              switch (op) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case '*': result = a * b; break;
                case '/': result = b !== 0 ? a / b : NaN; break;
                default: result = NaN;
              }
              newOutput.push(`>>> ${trimmed}`);
              newOutput.push(`Result: ${isNaN(result) ? 'ERROR: Division by zero' : result}`);
              newOutput.push('');
            }
          } catch (e) {
            newOutput.push(`>>> ${trimmed}`);
            newOutput.push(`ERROR: ${e}`);
            newOutput.push('');
          }
        }
        // len()
        else if (trimmed.match(/len\(['"](.+)['"]\)/)) {
          const match = trimmed.match(/len\(['"](.+)['"]\)/);
          if (match) {
            newOutput.push(`>>> ${trimmed}`);
            newOutput.push(`Output: ${match[1].length}`);
            newOutput.push('');
          }
        }
        // Variable assignments
        else if (trimmed.match(/^(\w+)\s*=\s*['"](.+)['"]/)) {
          const match = trimmed.match(/^(\w+)\s*=\s*['"](.+)['"]/);
          if (match) {
            newOutput.push(`>>> ${trimmed}`);
            newOutput.push(`Variable '${match[1]}' assigned`);
            newOutput.push('');
          }
        }
        else if (trimmed !== '') {
          newOutput.push(`>>> ${trimmed}`);
          newOutput.push(`❌ SyntaxError: Invalid syntax or command not recognized`);
          newOutput.push(`   Check your spelling and quotes. Example: print("Hello")`);
          newOutput.push('');
        }
      });

      newOutput.push('✓ Execution completed');
      
    } catch (error) {
      newOutput.push(`ERROR: ${error}`);
    }

    setOutput([...output, ...newOutput]);
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const clearCode = () => {
    setCode('');
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-100">
      {/* Header */}
      <div className="bg-[#007acc] text-white px-3 py-2 flex items-center justify-between border-b-2 border-[#005a9e]">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          <span className="font-bold">Decryption Software - UAEPD Cyber Division</span>
        </div>
        <div className="text-xs opacity-90">Python 3.11.0</div>
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
                className="window-95-button px-3 py-1 text-xs bg-green-600 text-white flex items-center gap-1"
              >
                <Play className="w-3 h-3" />
                Run (Ctrl+Enter)
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
                    <div>• caesar_cipher("text", shift_amount)</div>
                    <div>• reverse_string("text")</div>
                    <div>• format_phone("501234567")</div>
                    <div>• extract_numbers("ABC123XYZ456")</div>
                    <div>• hex_to_text("48656c6c6f")</div>
                    <div>• len("text")</div>
                    <div>• print("message")</div>
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