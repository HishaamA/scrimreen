import { useState } from 'react';
import { BookOpen, ChevronRight, Code, Database, Search, Filter, Book, Layers, Terminal, Lock, Key, Shield } from 'lucide-react';
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
            <h1 class="text-5xl font-bold text-black mb-4 font-serif">Decryption</h1>
            <h2 class="text-3xl font-bold text-black mb-12 font-serif italic">for Dummies</h2>
            <div class="w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center mb-8 border-4 border-black">
              <span class="text-6xl">🔐</span>
            </div>
            <p class="text-xl text-gray-800 font-bold max-w-md">A Reference for the Rest of Us!®</p>
            <div class="mt-8 text-sm text-gray-600">UAE Detective Bureau Edition</div>
          </div>
        `,
      },
      {
        id: 'basics',
        title: '📚 Decryption Basics',
        icon: <BookOpen className="w-5 h-5" />,
        content: `
          <h2>Decryption Basics for Detectives</h2>
          <p><strong>Encryption</strong> is the process of scrambling a message so only the intended recipient can read it. <strong>Decryption</strong> is the reverse — turning that scrambled mess back into something readable. Don't worry, it's easier than it sounds!</p>

          <h3>Why Should a Detective Care?</h3>
          <p>Criminals love to encode their messages, contacts, and plans to hide evidence from law enforcement. As a detective, your job is to <em>decode</em> those messages and uncover the truth.</p>
          <p>Common things criminals encrypt:</p>
          <ul>
            <li>Phone numbers and contact details</li>
            <li>Meeting locations and times</li>
            <li>Names of accomplices</li>
            <li>Financial records and account numbers</li>
          </ul>

          <h3>Your Decryption Software</h3>
          <p>The UAE Detective Bureau has equipped you with a <strong>Decryption Software</strong> terminal. It comes preloaded with several handy functions to crack common codes. Just type a command and hit <strong>Run</strong>!</p>

          <div class="tip">
            💡 <strong>TIP:</strong> You don't need to be a computer scientist to use these tools. If you can type a sentence, you can decrypt a clue!
          </div>
        `,
      },
      {
        id: 'other-tools',
        title: '🧰 Other Tools',
        icon: <Terminal className="w-5 h-5" />,
        content: `
          <h2>Other Decryption Tools</h2>
          <p>Beyond the Caesar cipher, your Decryption Software comes loaded with a few more tricks up its sleeve.</p>

          <h3>extract_numbers(text)</h3>
          <p>Pulls out all the digits hiding in corrupted or scrambled data. Perfect for when a phone number or ID is buried in garbage characters.</p>
          <pre><code>extract_numbers("B!5@8#9$1^2")
→ ["5", "8", "9", "1", "2"]</code></pre>
          <p>Once you have the numbers, you might want to piece them together into a phone number or Emirates ID.</p>

          <h3>base64_decode(text)</h3>
          <p>Base64 is a common encoding method — it turns data into a string of letters, numbers, and symbols like <code>+</code> and <code>/</code>. If you see a suspicious string that ends with <code>=</code> or <code>==</code>, it's probably Base64!</p>
          <pre><code>base64_decode("SGVsbG8gRGV0ZWN0aXZl")
→ "Hello Detective"</code></pre>

          <h3>reverse_string(text)</h3>
          <p>Sometimes the simplest tricks are the most effective. Criminals occasionally just write things backwards. Sneaky? Yes. Effective against a trained detective? Not a chance.</p>
          <pre><code>reverse_string("ecnedive terces")
→ "secret evidence"</code></pre>

          <h3>format_phone(number)</h3>
          <p>Takes a raw string of digits and formats it as a UAE phone number. Handy after you've extracted numbers from scrambled data.</p>
          <pre><code>format_phone("0501234567")
→ "+971 50 123 4567"</code></pre>

          <div class="tip">
            💡 <strong>TIP:</strong> These tools work great in combination! Try <code>extract_numbers</code> first, then <code>format_phone</code> on the result. Layer your tools like a good detective layers their theories.
          </div>
        `,
      }
    ];

    if (difficulty === 'medium' || difficulty === 'hard') {
      chapters.push({
        id: 'caesar-cipher',
        title: '🔄 Caesar Cipher',
        icon: <Key className="w-5 h-5" />,
        content: `
          <h2>The Caesar Cipher — Your Most Important Tool</h2>
          <p>This is the big one, detective. If there's one chapter you read cover-to-cover, make it this one.</p>

          <h3>What Is a Caesar Cipher?</h3>
          <p>A <strong>Caesar cipher</strong> is a <em>substitution cipher</em> — it replaces each letter in a message by shifting it a fixed number of positions in the alphabet. That's it. No fancy math, no quantum computing. Just sliding letters around.</p>

          <h3>Why "Caesar"?</h3>
          <p>It's named after <strong>Julius Caesar</strong>, who used it to send secret military messages around 58 BC. If it was good enough for conquering Gaul, it's good enough for catching criminals in Dubai. Even Julius Caesar could do it, and he didn't have a computer!</p>

          <h3>How It Works</h3>
          <p>Pick a <strong>shift number</strong>. Each letter moves that many positions forward in the alphabet.</p>
          <p>With a shift of <strong>3</strong>:</p>
          <pre><code>Original:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Encrypted: D E F G H I J K L M N O P Q R S T U V W X Y Z A B C</code></pre>
          <p>So <code>A → D</code>, <code>B → E</code>, <code>C → F</code>, and so on. The alphabet wraps around — <code>X → A</code>, <code>Y → B</code>, <code>Z → C</code>.</p>

          <h3>Decrypting (Negative Shifts)</h3>
          <p>To <em>decrypt</em>, you shift in the <strong>opposite direction</strong> — that means using a <strong>negative shift</strong>.</p>
          <p>With a shift of <strong>-3</strong>:</p>
          <pre><code>Encrypted: D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
Decrypted: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</code></pre>
          <p>So <code>D → A</code>, <code>E → B</code>, <code>F → C</code>. Going backwards!</p>
          <p>A shift of <strong>-3</strong> means <code>A → X</code>, <code>B → Y</code>, <code>C → Z</code> (wrapping backwards around the alphabet).</p>

          <h3>Example</h3>
          <p>You find the encoded message: <strong>"KHOOR"</strong></p>
          <p>Apply shift <strong>-3</strong> to each letter:</p>
          <pre><code>K → H  (K is 3 after H)
H → E  (H is 3 after E)
O → L  (O is 3 after L)
O → L
R → O  (R is 3 after O)

Result: "HELLO"</code></pre>
          <p>🎉 The secret message was <strong>"HELLO"</strong> all along!</p>

          <h3>Using It in the Decryption Software</h3>
          <p>In your terminal, use the <code>caesar_cipher</code> function:</p>
          <pre><code>caesar_cipher(text, shift)</code></pre>
          <ul>
            <li><code>text</code> — the encrypted message you want to decode</li>
            <li><code>shift</code> — the number of positions to move each letter (negative to decrypt)</li>
          </ul>
          <pre><code>caesar_cipher("Khoor", -3)
→ "Hello"

caesar_cipher("Zruog", -3)
→ "World"</code></pre>

          <h3>But What If I Don't Know the Shift?</h3>
          <p>Great question! There are only 25 possible shifts (1 through 25, since a shift of 26 gives you the same letter). Just try them all and look for the one that produces readable English words!</p>
          <pre><code>caesar_cipher("Khoor", -1)  → "Jgnnq"  ❌ Nope
caesar_cipher("Khoor", -2)  → "Ifmmp"  ❌ Nope
caesar_cipher("Khoor", -3)  → "Hello"  ✅ That's it!</code></pre>

          <div class="tip">
            💡 <strong>TIP:</strong> Try shifts from <strong>-25 to 25</strong> if you're stuck. When you see English words appear, you've cracked it! Look for common words like "the", "and", "is" to confirm you have the right shift.
          </div>
        `,
      });
    }

    if (difficulty === 'hard') {
      chapters.push({
        id: 'advanced-ciphers',
        title: '🛡️ Advanced Ciphers',
        icon: <Shield className="w-5 h-5" />,
        content: `
          <h2>Advanced Cipher Techniques</h2>
          <p>For the truly devious criminals, simple ciphers aren't enough. Here are some advanced techniques you might encounter.</p>

          <h3>Layered Encryption</h3>
          <p>Some criminals apply <em>multiple</em> encryption methods on the same message. For example, they might Caesar-shift a message and then Base64 encode the result.</p>
          <pre><code># Step 1: Decode the Base64 layer
base64_decode("S2hvru==")
→ "Khoor"

# Step 2: Crack the Caesar cipher
caesar_cipher("Khoor", -3)
→ "Hello"</code></pre>
          <p>Always try peeling back one layer at a time. If a decrypted result still looks like gibberish, there might be another layer underneath!</p>

          <h3>Combining Tools</h3>
          <p>The real power of your Decryption Software comes from chaining functions together:</p>
          <ul>
            <li><code>extract_numbers</code> → <code>format_phone</code> to recover phone numbers from corrupted data</li>
            <li><code>base64_decode</code> → <code>caesar_cipher</code> to peel back layered encryption</li>
            <li><code>reverse_string</code> → <code>caesar_cipher</code> for reversed-then-shifted messages</li>
          </ul>

          <h3>Frequency Analysis</h3>
          <p>In longer encrypted texts, the most common letter is likely <strong>E</strong> (the most common letter in English). Count letter frequencies to guess the shift!</p>

          <div class="tip">
            💡 <strong>TIP:</strong> Think like the criminal! What would be the simplest way to hide this information? Start with the easiest decryption methods before trying complex combinations.
          </div>
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
          <p>Look for encrypted messages in the evidence files. Try the Decryption Software on any text that looks scrambled or encoded. Cross-reference decoded results with suspect information from the SQL database.</p>
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
        id: 'what-is-sql',
        title: '📚 What is SQL?',
        icon: <BookOpen className="w-5 h-5" />,
        content: `
          <h2>What is SQL?</h2>
          <p><strong>SQL</strong> (Structured Query Language) is how we interrogate our databases — think of it as asking questions to a very organized filing cabinet. Instead of rifling through folders by hand, you write a query and the database instantly finds what you need.</p>

          <h3>Tables, Rows & Columns</h3>
          <p>A database is made up of <strong>tables</strong>. Each table is like a spreadsheet:</p>
          <ul>
            <li><strong>Columns</strong> are the categories (e.g., name, age, location)</li>
            <li><strong>Rows</strong> are the individual records (e.g., one row per suspect)</li>
          </ul>
          <p>For example, the <code>suspects</code> table might look like:</p>
          <pre><code>| name            | age | occupation    | emirates_id   |
|-----------------|-----|---------------|---------------|
| Ahmed Khalfan   | 42  | CEO           | 784-1990-1234 |
| Sara Al Maktoum | 35  | Scientist     | 784-1988-5678 |
| Raj Patel       | 51  | Ship Captain  | 784-1972-9012 |</code></pre>

          <h3>Your Detective Tables</h3>
          <p>The UAE Detective Bureau database includes tables like:</p>
          <ul>
            <li><code>suspects</code> — information on persons of interest</li>
            <li><code>vehicle_registry</code> — vehicle ownership records</li>
            <li><code>chemical_imports</code> — import records for chemicals</li>
            <li><code>fleet_logs</code> — shipping and fleet movement data</li>
            <li><code>corporate_registry</code> — business registration records</li>
          </ul>

          <div class="tip">
            💡 <strong>TIP:</strong> Not sure what tables are available? Type <code>SHOW TABLES</code> in the SQL terminal to see them all!
          </div>
        `,
      },
      {
        id: 'select-from',
        title: '🔍 SELECT & FROM',
        icon: <Search className="w-5 h-5" />,
        content: `
          <h2>SELECT & FROM — Asking Questions</h2>
          <p><code>SELECT</code> tells the database <em>what</em> you want. <code>FROM</code> tells it <em>where</em> to look. Simple as that!</p>

          <h3>Get Everything from a Table</h3>
          <p>The <code>*</code> means "give me all columns":</p>
          <pre><code>SELECT * FROM suspects</code></pre>
          <p>This returns every suspect with all their details. It's like dumping the entire folder on your desk.</p>

          <h3>Get Specific Columns</h3>
          <p>Don't need everything? Just ask for what you want:</p>
          <pre><code>SELECT name, age FROM suspects</code></pre>
          <p>This only returns names and ages — much cleaner when you're looking for something specific.</p>

          <h3>Useful Discovery Commands</h3>
          <p>Before you start querying, get the lay of the land:</p>
          <pre><code>SHOW TABLES</code></pre>
          <p>Lists all available tables in the database.</p>
          <pre><code>DESCRIBE suspects</code></pre>
          <p>Shows you what columns the <code>suspects</code> table has. Always do this first so you know what data is available!</p>

          <div class="tip">
            💡 <strong>TIP:</strong> Start every investigation with <code>SHOW TABLES</code> and then <code>DESCRIBE</code> each table. Know your data before you start digging!
          </div>
        `,
      },
      {
        id: 'where',
        title: '🎯 WHERE Clause',
        icon: <Filter className="w-5 h-5" />,
        content: `
          <h2>WHERE — Filtering the Evidence</h2>
          <p>The <code>WHERE</code> clause is your magnifying glass — it lets you zoom in on exactly the data you need.</p>

          <h3>Comparison Operators</h3>
          <p>Use these to compare values:</p>
          <pre><code>SELECT * FROM suspects WHERE age > 30
SELECT * FROM suspects WHERE age >= 40
SELECT * FROM suspects WHERE age < 25
SELECT * FROM suspects WHERE age != 35</code></pre>
          <ul>
            <li><code>&gt;</code> greater than</li>
            <li><code>&lt;</code> less than</li>
            <li><code>&gt;=</code> greater than or equal</li>
            <li><code>&lt;=</code> less than or equal</li>
            <li><code>=</code> equal to</li>
            <li><code>!=</code> not equal to</li>
          </ul>

          <h3>Text Matching</h3>
          <p>When matching text values, <strong>wrap them in quotes</strong>:</p>
          <pre><code>SELECT * FROM suspects WHERE name = 'Ahmed Khalfan'</code></pre>

          <h3>⚠️ Important: Quotes for Text!</h3>
          <p>String values <strong>need quotes</strong>! This is the #1 beginner mistake:</p>
          <pre><code>✅ WHERE name = 'Ahmed'
❌ WHERE name = Ahmed</code></pre>
          <p>Numbers don't need quotes, but text always does.</p>

          <h3>Pattern Matching with LIKE</h3>
          <p>The <code>%</code> symbol means "any characters" — perfect for partial matches:</p>
          <pre><code>SELECT * FROM suspects WHERE location LIKE '%Dubai%'</code></pre>
          <p>This finds anyone whose location contains "Dubai" anywhere in the text.</p>
          <pre><code>LIKE 'Dubai%'   → starts with "Dubai"
LIKE '%Dubai'   → ends with "Dubai"
LIKE '%Dubai%'  → contains "Dubai" anywhere</code></pre>

          <h3>Combining Conditions</h3>
          <p>Use <code>AND</code> to require multiple conditions, <code>OR</code> for either condition:</p>
          <pre><code>SELECT * FROM suspects WHERE age > 30 AND occupation = 'CEO'

SELECT * FROM chemical_imports WHERE chemical = 'Mercury' OR chemical = 'Lead'</code></pre>

          <div class="tip">
            💡 <strong>TIP:</strong> <code>AND</code> narrows your results (both must be true). <code>OR</code> widens them (either can be true). Think of AND as "pickier" and OR as "more open-minded."
          </div>
        `,
      }
    ];

    if (difficulty === 'medium' || difficulty === 'hard') {
      chapters.push({
        id: 'joins',
        title: '🔗 JOIN',
        icon: <Layers className="w-5 h-5" />,
        content: `
          <h2>JOIN — Connecting the Dots</h2>
          <p>This is where detective work gets <em>really</em> interesting. Sometimes the answer isn't in one table — you need to connect clues from different databases.</p>

          <h3>Why JOIN?</h3>
          <p>Imagine you found a suspicious vehicle plate number at the crime scene. The <code>vehicle_registry</code> table has plate numbers and Emirates IDs, but the <code>suspects</code> table has names and occupations. You need to <strong>join</strong> them together to find out WHO owns that vehicle.</p>

          <h3>The Syntax</h3>
          <pre><code>SELECT * FROM table1 JOIN table2 ON table1.column = table2.column</code></pre>
          <p>The <code>ON</code> clause tells the database <strong>how</strong> to connect the two tables — which column they have in common.</p>

          <h3>Example: Vehicle to Suspect</h3>
          <p>Both <code>vehicle_registry</code> and <code>suspects</code> have an <code>emirates_id</code> column. That's your connection!</p>
          <pre><code>SELECT * FROM vehicle_registry JOIN suspects ON vehicle_registry.emirates_id = suspects.emirates_id</code></pre>
          <p>This gives you every vehicle matched with its owner's full suspect information.</p>

          <h3>Adding WHERE to a JOIN</h3>
          <p>JOIN connects tables, WHERE filters the results. Use them together:</p>
          <pre><code>SELECT * FROM vehicle_registry
  JOIN suspects
  ON vehicle_registry.emirates_id = suspects.emirates_id
  WHERE vehicle_plate_id = 'B58912'</code></pre>
          <p>This finds the owner of vehicle plate B58912 by joining vehicle records with suspect data.</p>

          <h3>How to Think About It</h3>
          <ul>
            <li><code>ON</code> = <strong>HOW</strong> to connect the tables (the shared column)</li>
            <li><code>WHERE</code> = <strong>WHAT</strong> to filter for (your specific clue)</li>
          </ul>

          <div class="tip">
            💡 <strong>TIP:</strong> Use <code>DESCRIBE</code> on both tables first to find columns they share (like <code>emirates_id</code>). Those shared columns are your JOIN keys!
          </div>
        `,
      });
    }

    if (difficulty === 'hard') {
      chapters.push(
        {
          id: 'order-limit',
          title: '📊 ORDER BY & LIMIT',
          icon: <Database className="w-5 h-5" />,
          content: `
            <h2>ORDER BY & LIMIT — Organizing Your Results</h2>
            <p>When a query returns a lot of data, you need ways to sort through it efficiently.</p>

            <h3>ORDER BY</h3>
            <p>Sort your results by any column:</p>
            <pre><code>SELECT * FROM suspects ORDER BY age ASC</code></pre>
            <p><code>ASC</code> = ascending (smallest first, A→Z)</p>
            <pre><code>SELECT * FROM suspects ORDER BY age DESC</code></pre>
            <p><code>DESC</code> = descending (largest first, Z→A)</p>

            <p>You can sort by text columns too:</p>
            <pre><code>SELECT * FROM suspects ORDER BY name ASC</code></pre>

            <h3>LIMIT</h3>
            <p>Only want the first few results? Use <code>LIMIT</code>:</p>
            <pre><code>SELECT * FROM chemical_imports ORDER BY quantity DESC LIMIT 5</code></pre>
            <p>This shows the top 5 largest chemical imports — great for spotting unusual activity!</p>

            <div class="tip">
              💡 <strong>TIP:</strong> Combine ORDER BY and LIMIT to find extremes: the largest imports, the oldest suspects, or the most recent transactions.
            </div>
          `,
        },
        {
          id: 'pro-tips',
          title: '🏆 Pro Tips',
          icon: <Code className="w-5 h-5" />,
          content: `
            <h2>Pro Tips for the Expert Detective</h2>
            <p>You've mastered the basics. Here are some advanced techniques to crack the toughest cases.</p>

            <h3>Multi-Table Investigation Strategy</h3>
            <p>For complex cases, follow this workflow:</p>
            <ol>
              <li><code>SHOW TABLES</code> — see all available data sources</li>
              <li><code>DESCRIBE table_name</code> — understand each table's columns</li>
              <li><code>SELECT * FROM table_name LIMIT 5</code> — preview the data</li>
              <li>Look for <strong>shared columns</strong> between tables (your JOIN keys)</li>
              <li>Build your query step by step, adding JOINs and WHERE clauses</li>
            </ol>

            <h3>Common Game Tables & Connections</h3>
            <pre><code>suspects ←(emirates_id)→ vehicle_registry
suspects ←(emirates_id)→ corporate_registry
corporate_registry ←(company_name)→ chemical_imports
fleet_logs ←(vessel_name)→ ... other tables</code></pre>

            <h3>Debugging Queries</h3>
            <p>Query not working? Try these steps:</p>
            <ul>
              <li>Check spelling of table and column names (use <code>DESCRIBE</code>)</li>
              <li>Make sure text values are in quotes: <code>'like this'</code></li>
              <li>Start simple — get a basic <code>SELECT *</code> working first, then add complexity</li>
              <li>If a JOIN returns nothing, check that the <code>ON</code> columns actually have matching values</li>
            </ul>

            <div class="tip">
              💡 <strong>TIP:</strong> The best detectives start broad and narrow down. Begin with <code>SELECT * FROM table</code>, look at the data, then add WHERE clauses to zoom in on your suspect.
            </div>
          `,
        }
      );
    }

    if (currentCase) {
      chapters.push({
        id: 'case-notes',
        title: '📝 Case Specific Queries',
        icon: <ChevronRight className="w-5 h-5" />,
        content: `
          <h2>Queries for Case: ${currentCase.title}</h2>
          <p>Relevant Tables: <strong>suspects</strong>, <strong>vehicle_registry</strong>, <strong>chemical_imports</strong>, <strong>fleet_logs</strong>, <strong>corporate_registry</strong></p>
          <h3>Suggested Approach</h3>
          <pre><code># Step 1: See what tables are available
SHOW TABLES

# Step 2: Examine the suspects
SELECT * FROM suspects

# Step 3: Look for location-specific clues
SELECT * FROM suspects WHERE location LIKE '%${currentCase.location.split(',')[0]}%'</code></pre>
          <div class="tip">
            💡 <strong>TIP:</strong> Use <code>DESCRIBE</code> on each table to find columns you can JOIN on. Look for shared IDs like <code>emirates_id</code> to connect suspects to vehicles, companies, and more.
          </div>
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
            {isPython ? '🔐 Decryption Manual' : '🗄️ SQL Manual'}
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
