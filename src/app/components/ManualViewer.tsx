import { useState } from 'react';
import { BookOpen, ChevronRight, Code, Database, Search, Filter, Book, Layers, Terminal } from 'lucide-react';
import { Case } from '../types/game';

interface ManualViewerProps {
  type: 'python' | 'sql';
  currentCase?: Case | null;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export function ManualViewer({ type, currentCase, difficulty = 'medium' }: ManualViewerProps) {
  const isPython = type === 'python';
  
  const getPythonChapters = () => {
    const chapters = [
      {
        id: 'cover',
        title: '📖 Book Cover',
        icon: <Book className="w-5 h-5" />,
        content: `
          <div class="flex flex-col items-center justify-center h-full text-center p-8 bg-yellow-100 border-8 border-yellow-400 rounded-lg shadow-inner">
            <h1 class="text-5xl font-bold text-black mb-4 font-serif">Python</h1>
            <h2 class="text-3xl font-bold text-black mb-12 font-serif italic">for Dummies</h2>
            <div class="w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center mb-8 border-4 border-black">
              <span class="text-6xl">🐍</span>
            </div>
            <p class="text-xl text-gray-800 font-bold max-w-md">A Reference for the Rest of Us!®</p>
            <div class="mt-8 text-sm text-gray-600">UAE Detective Bureau Edition</div>
          </div>
        `,
      },
      {
        id: 'basics',
        title: '📚 Python Basics',
        icon: <BookOpen className="w-5 h-5" />,
        content: `
          <h2>Python Basics for Detectives</h2>
          <p>Python is a versatile programming language used by modern investigators to process data.</p>
          
          <h3>Variables and Data Types</h3>
          <pre><code>suspect_name = "Ahmed" # String
age = 35 # Integer
has_alibi = False # Boolean</code></pre>

          <h3>Lists and Dictionaries</h3>
          <pre><code># A list of evidence
evidence_list = ["fingerprint", "security camera", "receipt"]

# A dictionary representing a suspect
suspect = {
    "name": "Sarah",
    "occupation": "Banker",
    "motive": True
}</code></pre>
        `,
      },
      {
        id: 'interface',
        title: '🔌 Python-SQL Interface',
        icon: <Terminal className="w-5 h-5" />,
        content: `
          <h2>The Python-SQL Interface</h2>
          <p>In our advanced detective terminal, we use a custom Python library to interface with the SQL database directly.</p>
          
          <h3>Executing Queries</h3>
          <p>You can write SQL directly into the terminal, and our system interprets it seamlessly.</p>
          <pre><code># The terminal automatically processes this as a query:
SELECT * FROM suspects WHERE age > 30

# Under the hood, Python is doing this:
# db.execute("SELECT * FROM suspects WHERE age > 30")
# results = db.fetchall()</code></pre>
          
          <div class="tip">
            💡 <strong>TIP:</strong> Think in Python, write in SQL! Our terminal handles the translation so you can focus on solving the case.
          </div>
        `,
      }
    ];

    if (difficulty === 'medium' || difficulty === 'hard') {
      chapters.push({
        id: 'data-processing',
        title: '🔄 Data Processing',
        icon: <Layers className="w-5 h-5" />,
        content: `
          <h2>Advanced Data Processing</h2>
          <p>When dealing with complex cases, filtering data efficiently is key.</p>
          
          <h3>String Manipulation</h3>
          <pre><code># Finding partial matches in evidence
def check_evidence(text):
    return "weapon" in text.lower()</code></pre>
        `,
      });
    }

    if (difficulty === 'hard') {
      chapters.push({
        id: 'algorithms',
        title: '⚙️ Detective Algorithms',
        icon: <Code className="w-5 h-5" />,
        content: `
          <h2>Detective Algorithms</h2>
          <p>Use algorithmic thinking to narrow down suspects.</p>
          <pre><code>def find_culprit(suspects, evidence):
    for s in suspects:
        if s.motive and not s.alibi:
            return s
    return None</code></pre>
        `,
      });
    }

    if (currentCase) {
      chapters.push({
        id: 'case-notes',
        title: '📝 Case Specific Notes',
        icon: <ChevronRight className="w-5 h-5" />,
        content: `
          <h2>Notes for Case: ${currentCase.title}</h2>
          <p><strong>Location:</strong> ${currentCase.location}</p>
          <p><strong>Type:</strong> ${currentCase.type}</p>
          <h3>Investigation Strategy</h3>
          <p>Focus on examining the evidence files related to this specific location and crime type. Cross-reference suspect occupations with the nature of the crime.</p>
        `,
      });
    }

    return chapters;
  };

  const getSqlChapters = () => {
    const chapters = [
      {
        id: 'cover',
        title: '📖 Book Cover',
        icon: <Book className="w-5 h-5" />,
        content: `
          <div class="flex flex-col items-center justify-center h-full text-center p-8 bg-blue-100 border-8 border-blue-400 rounded-lg shadow-inner">
            <h1 class="text-5xl font-bold text-black mb-4 font-serif">SQL</h1>
            <h2 class="text-3xl font-bold text-black mb-12 font-serif italic">for Dummies</h2>
            <div class="w-32 h-32 bg-blue-300 rounded-full flex items-center justify-center mb-8 border-4 border-black">
              <span class="text-6xl">🗄️</span>
            </div>
            <p class="text-xl text-gray-800 font-bold max-w-md">A Reference for the Rest of Us!®</p>
            <div class="mt-8 text-sm text-gray-600">UAE Detective Bureau Edition</div>
          </div>
        `,
      },
      {
        id: 'basics',
        title: '📚 SQL Basics',
        icon: <Search className="w-5 h-5" />,
        content: `
          <h2>SQL Basics for Detectives</h2>
          <p>Structured Query Language (SQL) is how we interrogate our databases.</p>
          
          <h3>The SELECT Statement</h3>
          <pre><code># Get all suspects
SELECT * FROM suspects

# Get specific columns
SELECT name, age FROM suspects</code></pre>
          
          <h3>The WHERE Clause</h3>
          <pre><code># Filter data
SELECT * FROM evidence WHERE type = "Security Footage"</code></pre>
        `,
      },
      {
        id: 'filtering',
        title: '🎯 Filtering Data',
        icon: <Filter className="w-5 h-5" />,
        content: `
          <h2>Advanced Filtering</h2>
          
          <h3>Combining Conditions</h3>
          <pre><code># Multiple conditions
SELECT * FROM suspects WHERE age > 30 AND alibi IS NULL

# Using OR
SELECT * FROM evidence WHERE type = "DNA" OR type = "Fingerprint"</code></pre>
          
          <h3>Pattern Matching</h3>
          <pre><code># Find evidence containing "Burj"
SELECT * FROM locations WHERE name LIKE "Burj%"</code></pre>
        `,
      }
    ];

    if (difficulty === 'medium' || difficulty === 'hard') {
      chapters.push({
        id: 'advanced',
        title: '⚡ Advanced Queries',
        icon: <Database className="w-5 h-5" />,
        content: `
          <h2>Advanced Querying Techniques</h2>
          
          <h3>Sorting Results</h3>
          <pre><code># Order by age
SELECT * FROM suspects ORDER BY age DESC</code></pre>
          
          <h3>Handling NULL values</h3>
          <pre><code># Finding missing data
SELECT * FROM suspects WHERE motive IS NOT NULL</code></pre>
        `,
      });
    }

    if (difficulty === 'hard') {
      chapters.push({
        id: 'joins',
        title: '🔗 Relational Logic',
        icon: <Code className="w-5 h-5" />,
        content: `
          <h2>Relational Logic</h2>
          <p>Connect evidence to suspects logically through your queries.</p>
          <pre><code># Step 1: Find weapon evidence
SELECT * FROM evidence WHERE type = "Weapon"

# Step 2: Use the relatedTo field to find the suspect
SELECT * FROM suspects WHERE name = "Result from Step 1"</code></pre>
        `,
      });
    }

    if (currentCase) {
      chapters.push({
        id: 'case-notes',
        title: '📝 Case Specific Queries',
        icon: <ChevronRight className="w-5 h-5" />,
        content: `
          <h2>Queries for Case: ${currentCase.title}</h2>
          <p>Relevant Tables: <strong>suspects</strong>, <strong>evidence</strong>, <strong>locations</strong></p>
          <h3>Suggested Approach</h3>
          <pre><code># Start by examining the crime scene
SELECT * FROM locations WHERE name LIKE "%${currentCase.location.split(',')[0]}%"</code></pre>
        `,
      });
    }

    return chapters;
  };

  const chapters = isPython ? getPythonChapters() : getSqlChapters();
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]);

  // Handle case when chapters change (e.g., difficulty or case changes)
  const activeChapter = chapters.find(c => c.id === selectedChapter.id) || chapters[0];

  return (
    <div className="flex h-full bg-[#c0c0c0]">
      {/* Sidebar */}
      <div className="w-64 border-r-2 border-[#808080] bg-[#dfdfdf] overflow-y-auto window-95-scrollbar">
        <div className="p-2">
          <div className="bg-[#000080] text-white font-bold px-2 py-1 mb-2">
            {isPython ? '🐍 Python Manual' : '🗄️ SQL Manual'}
          </div>
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setSelectedChapter(chapter)}
              className={`w-full text-left px-2 py-2 mb-1 border-2 flex items-center gap-2 ${
                activeChapter.id === chapter.id
                  ? 'bg-[#000080] text-white border-[#000080]'
                  : 'bg-[#c0c0c0] border-[#dfdfdf] border-t-white border-l-white hover:bg-[#d4d4d4]'
              }`}
            >
              {chapter.icon}
              <span className="text-sm truncate">{chapter.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto window-95-scrollbar bg-white">
        <style>{`
          .manual-content h2 {
            color: #000080;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 3px solid #000080;
          }
          
          .manual-content h3 {
            color: #008080;
            font-size: 1.125rem;
            font-weight: bold;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }
          
          .manual-content p {
            margin-bottom: 1rem;
            line-height: 1.6;
          }
          
          .manual-content ul, .manual-content ol {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
          }
          
          .manual-content li {
            margin-bottom: 0.5rem;
            line-height: 1.6;
          }
          
          .manual-content pre {
            background: #000000;
            color: #00ff00;
            padding: 1rem;
            border: 2px solid #808080;
            margin: 1rem 0;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
          }
          
          .manual-content code {
            font-family: 'Courier New', monospace;
            background: #ffffcc;
            padding: 2px 4px;
            border: 1px solid #808080;
            color: #333;
          }
          
          .manual-content pre code {
            background: transparent;
            border: none;
            padding: 0;
            color: #00ff00;
          }
          
          .manual-content .tip {
            background: #ffffe0;
            border: 3px solid #ffd700;
            padding: 1rem;
            margin: 1.5rem 0;
            border-radius: 4px;
          }
          
          .manual-content .tip strong {
            color: #ff8800;
          }
        `}</style>
        {activeChapter.id === 'cover' ? (
          <div className="h-full p-4" dangerouslySetInnerHTML={{ __html: activeChapter.content }} />
        ) : (
          <div className="manual-content p-6" dangerouslySetInnerHTML={{ __html: activeChapter.content }} />
        )}
      </div>
    </div>
  );
}
