import { useState, useRef, useEffect } from 'react';
import { Play, Terminal, Trash2, RotateCcw } from 'lucide-react';

export function PythonTerminal() {
  const [code, setCode] = useState('# Python Terminal - Enviro-Crimes Data Analysis\n# Use Python to decrypt, decode, and analyze data\n\n# Example functions available:\n# decrypt_rot13(text) - ROT13 decryption\n# decode_base64(text) - Base64 decoding\n# format_data(data) - Format and clean data\n# reverse_string(text) - Reverse a string\n\n');
  const [output, setOutput] = useState<string[]>([
    '🐍 Python 3.11 - UAEPD Crime Analysis Terminal',
    'Type your code and press "Run Code" to execute',
    '-' .repeat(60),
    ''
  ]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Helper functions that can be called in Python code
  const rot13 = (str: string): string => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  };

  const base64Decode = (str: string): string => {
    try {
      return atob(str);
    } catch {
      return 'Error: Invalid base64 string';
    }
  };

  const reverseString = (str: string): string => {
    return str.split('').reverse().join('');
  };

  const caesarCipher = (str: string, shift: number): string => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
    });
  };

  const executePython = () => {
    const timestamp = new Date().toLocaleTimeString();
    const newOutput = [`>>> [${timestamp}] Executing Python code...`, ''];

    try {
      // Check for print statements
      const printMatches = code.matchAll(/print\((.*?)\)/gs);
      let hasOutput = false;

      for (const match of printMatches) {
        hasOutput = true;
        const expression = match[1].trim();
        
        // Evaluate the expression
        try {
          // Check for function calls
          if (expression.includes('decrypt_rot13')) {
            const textMatch = expression.match(/decrypt_rot13\(['"](.+?)['"]\)/);
            if (textMatch) {
              newOutput.push(rot13(textMatch[1]));
            }
          } else if (expression.includes('decode_base64')) {
            const textMatch = expression.match(/decode_base64\(['"](.+?)['"]\)/);
            if (textMatch) {
              newOutput.push(base64Decode(textMatch[1]));
            }
          } else if (expression.includes('reverse_string')) {
            const textMatch = expression.match(/reverse_string\(['"](.+?)['"]\)/);
            if (textMatch) {
              newOutput.push(reverseString(textMatch[1]));
            }
          } else if (expression.includes('caesar_cipher')) {
            const match = expression.match(/caesar_cipher\(['"](.+?)['"],\s*(\d+)\)/);
            if (match) {
              newOutput.push(caesarCipher(match[1], parseInt(match[2])));
            }
          } else if (expression.startsWith('"') || expression.startsWith("'")) {
            // Plain string
            newOutput.push(expression.replace(/['"]/g, ''));
          } else {
            // Try to evaluate as math
            const result = eval(expression);
            newOutput.push(String(result));
          }
        } catch (e) {
          newOutput.push(`Error evaluating: ${expression}`);
        }
      }

      // Check for variable assignments
      const varMatches = code.matchAll(/(\w+)\s*=\s*(.+)/g);
      const variables: { [key: string]: any } = {};
      
      for (const match of varMatches) {
        const [, varName, value] = match;
        if (value.includes('decrypt_rot13')) {
          const textMatch = value.match(/decrypt_rot13\(['"](.+?)['"]\)/);
          if (textMatch) variables[varName] = rot13(textMatch[1]);
        } else if (value.includes('decode_base64')) {
          const textMatch = value.match(/decode_base64\(['"](.+?)['"]\)/);
          if (textMatch) variables[varName] = base64Decode(textMatch[1]);
        } else if (value.startsWith('"') || value.startsWith("'")) {
          variables[varName] = value.replace(/['"]/g, '');
        }
        
        if (variables[varName]) {
          newOutput.push(`${varName} = "${variables[varName]}"`);
          hasOutput = true;
        }
      }

      // Check for list/string operations
      if (code.includes('.upper()')) {
        const match = code.match(/(['"])(.+?)\1\.upper\(\)/);
        if (match) {
          newOutput.push(match[2].toUpperCase());
          hasOutput = true;
        }
      }
      
      if (code.includes('.lower()')) {
        const match = code.match(/(['"])(.+?)\1\.lower\(\)/);
        if (match) {
          newOutput.push(match[2].toLowerCase());
          hasOutput = true;
        }
      }

      if (code.includes('.split(')) {
        const match = code.match(/(['"])(.+?)\1\.split\(\)/);
        if (match) {
          newOutput.push(JSON.stringify(match[2].split(' ')));
          hasOutput = true;
        }
      }

      if (!hasOutput) {
        newOutput.push('Code executed successfully!');
        newOutput.push('');
        newOutput.push('💡 Tip: Use print() to see output');
        newOutput.push('');
        newOutput.push('Available functions:');
        newOutput.push('  • decrypt_rot13(text)');
        newOutput.push('  • decode_base64(text)');
        newOutput.push('  • reverse_string(text)');
        newOutput.push('  • caesar_cipher(text, shift)');
        newOutput.push('');
        newOutput.push('Example:');
        newOutput.push('  print(decrypt_rot13("URYYB"))');
        newOutput.push('  # Output: HELLO');
      }

    } catch (error) {
      newOutput.push(`❌ Error: ${error}`);
      newOutput.push('');
      newOutput.push('Check your syntax and try again.');
    }

    newOutput.push('');
    newOutput.push('-'.repeat(60));
    newOutput.push('');

    setOutput([...output, ...newOutput]);
    setHistory([...history, code]);
  };

  const clearOutput = () => {
    setOutput([
      '🐍 Python 3.11 - UAEPD Crime Analysis Terminal',
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
            className="window-95-button px-3 py-1 text-xs flex items-center gap-1 bg-green-100 font-bold"
          >
            <Play className="w-3 h-3" />
            Run Code
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
        <span>Python 3.11.0 | UAEPD Crime Analysis System</span>
        <span>Ready</span>
      </div>
    </div>
  );
}
