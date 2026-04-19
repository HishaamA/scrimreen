import { useState } from 'react';
import { Globe, Home, RefreshCw, Search, ArrowLeft, ArrowRight } from 'lucide-react';

const RETRO_PAGES = {
  home: {
    title: 'UAEPD Enviro-crimes Division - Home',
    content: `
      <div class="retro-page">
        <center>
          <h1>🕵️ UAEPD: ENVIRO-CRIMES DIVISION 🕵️</h1>
          <hr>
          <marquee>Welcome to the official UAEPD Environmental Crimes Investigation Portal - Protecting UAE's Environment Since 1995</marquee>
          <hr>
        </center>
        
        <h2>🔍 Quick Links:</h2>
        <ul>
          <li><a href="about">🏛️ About UAEPD</a></li>
          <li><a href="cases">📋 Solved Cases Archive</a></li>
          <li><a href="blogs">📝 Detective Blogs</a></li>
          <li><a href="forensics">🔬 Forensics Lab Reports</a></li>
          <li><a href="suspects">👥 Suspect Registry</a></li>
          <li><a href="help">❓ Detective Handbook</a></li>
        </ul>
        
        <hr>
        <center>
          <p><blink>⚠️ CLASSIFIED INFORMATION - AUTHORIZED PERSONNEL ONLY ⚠️</blink></p>
          <p>Last Updated: March 30, 2026 | Visitors: 000428</p>
        </center>
      </div>
    `,
  },
  about: {
    title: 'About UAEPD',
    content: `
      <div class="retro-page">
        <h1>🏛️ ABOUT UAEPD ENVIRO-CRIMES DIVISION</h1>
        <hr>
        
        <h2>Our Mission</h2>
        <p>The United Arab Emirates Police Department (UAEPD) Enviro-Crimes Division is dedicated to protecting the UAE's precious environment through advanced detective work, cutting-edge technology, and unwavering commitment to justice.</p>
        
        <h2>History</h2>
        <p><b>1995:</b> Division established by Chief Inspector Khalid Al-Mansouri<br>
        <b>2003:</b> Implemented CATCHtech system for digital investigations<br>
        <b>2015:</b> Expanded to cover all seven emirates<br>
        <b>2026:</b> Over 10,000 environmental crimes solved!</p>
        
        <h2>Our Team</h2>
        <ul>
          <li>🎖️ Chief: Commissioner Ahmed Al-Rashid</li>
          <li>👮 Lead Detective: Officer Sarah Mitchell</li>
          <li>🔬 Forensics Chief: Dr. Hassan Al-Zaabi</li>
          <li>💻 Tech Specialist: Marina Popov</li>
          <li>🤖 AI Assistant: Officer Chip (v2.0)</li>
        </ul>
        
        <h2>Awards & Recognition</h2>
        <p>🏆 2024 UAE Environmental Excellence Award<br>
        🏆 2025 Gulf Region Police Innovation Prize<br>
        🏆 2026 International Crime Prevention Certificate</p>
        
        <hr>
        <p><i>"Together, we keep the UAE clean and green!" - Chief Commissioner</i></p>
        <p><a href="home">← Back to Home</a></p>
      </div>
    `,
  },
  cases: {
    title: 'Solved Cases Archive',
    content: `
      <div class="retro-page">
        <h1>📋 SOLVED CASES ARCHIVE</h1>
        <hr>
        
        <h2>Recent Victories:</h2>
        
        <table border="1" cellpadding="5" cellspacing="0" width="100%">
          <tr bgcolor="#008080">
            <th>Case ID</th>
            <th>Title</th>
            <th>Date Solved</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>ENV-001</td>
            <td>The E11 Plastic Peril</td>
            <td>2026-03-29</td>
            <td bgcolor="#90EE90">SOLVED</td>
          </tr>
          <tr>
            <td>ENV-002</td>
            <td>The Great Haq al Laila Candy Heist</td>
            <td>2026-03-26</td>
            <td bgcolor="#90EE90">SOLVED</td>
          </tr>
          <tr>
            <td>ENV-003</td>
            <td>The Palm Jumeirah Ding-Dong-Ditch Crisis</td>
            <td>2026-03-25</td>
            <td bgcolor="#90EE90">SOLVED</td>
          </tr>
          <tr>
            <td>ENV-004</td>
            <td>The Dubai Mall Ice Cream Spillage</td>
            <td>2026-03-25</td>
            <td bgcolor="#90EE90">SOLVED</td>
          </tr>
          <tr>
            <td>ENV-005</td>
            <td>The Marina Walk Pigeon Feeding Fiasco</td>
            <td>2026-03-20</td>
            <td bgcolor="#90EE90">SOLVED</td>
          </tr>
        </table>
        
        <h2>🎖️ Hall of Fame Detectives:</h2>
        <ul>
          <li>🥇 Detective Simreen Siraj - 47 cases solved</li>
          <li>🥈 Detective Hishaam Abdul - 42 cases solved</li>
          <li>🥉 Detective Sarah Mitchell - 38 cases solved</li>
        </ul>
        
        <hr>
        <center>
          <p><b>Note:</b> Case details are classified. Access requires Level 3 clearance.</p>
        </center>
        
        <p><a href="home">← Back to Home</a></p>
      </div>
    `,
  },
  blogs: {
    title: 'Detective Blogs',
    content: `
      <div class="retro-page">
        <h1>📝 DETECTIVE BLOGS & JOURNALS</h1>
        <hr>
        
        <h2>Latest Entries:</h2>
        
        <div style="background: #fffacd; border: 2px solid #ffd700; padding: 10px; margin: 10px 0;">
          <h3>🔍 "The Art of Interrogation" - by Det. Simreen Siraj</h3>
          <p><i>Posted: March 28, 2026</i></p>
          <p>After 47 solved cases, I've learned that the key to a successful interrogation isn't just asking the right questions—it's listening to what suspects DON'T say. Today's case involved cross-referencing vehicle registry data with GPS coordinates. The Python skills really paid off!</p>
          <p><b>Pro Tip:</b> Always check the timestamps. Criminals lie, but data doesn't.</p>
        </div>
        
        <div style="background: #e6f3ff; border: 2px solid #4682b4; padding: 10px; margin: 10px 0;">
          <h3>💻 "SQL Queries That Changed My Career" - by Det. Hishaam Abdul</h3>
          <p><i>Posted: March 25, 2026</i></p>
          <p>Who knew that learning SQL would make me a better detective? My 42nd case was cracked using a simple JOIN query between the suspects and vehicle_registry tables. The perp thought they were clever using their cousin's car, but the emirates_id match gave them away!</p>
          <p><b>Remember:</b> SELECT * FROM clues WHERE overlooked = TRUE</p>
        </div>
        
        <div style="background: #f0fff0; border: 2px solid #228b22; padding: 10px; margin: 10px 0;">
          <h3>🌍 "Environmental Justice Matters" - by Det. Sarah Mitchell</h3>
          <p><i>Posted: March 22, 2026</i></p>
          <p>Every plastic bag improperly disposed, every illegal bird feeding—they all add up. Our work in the Enviro-Crimes Division isn't just about catching criminals; it's about protecting the UAE's natural beauty for future generations. Proud to be part of this team!</p>
        </div>
        
        <div style="background: #fff0f5; border: 2px solid #ff69b4; padding: 10px; margin: 10px 0;">
          <h3>🤖 "Working with Officer Chip" - by Multiple Detectives</h3>
          <p><i>Posted: March 20, 2026</i></p>
          <p>Our AI assistant has been invaluable! Though Chip only gives 3 hints per case (to keep us sharp), those hints have saved countless investigation hours. Some say Chip has an attitude, but I think it's personality! 😄</p>
        </div>
        
        <hr>
        <p><b>Want to contribute?</b> Contact the PR department at press@uaepd.ae</p>
        <p><a href="home">← Back to Home</a></p>
      </div>
    `,
  },
  forensics: {
    title: 'Forensics Lab',
    content: `
      <div class="retro-page">
        <h1>🔬 FORENSICS LABORATORY</h1>
        <hr>
        
        <h2>Available Analysis Tools:</h2>
        <ul>
          <li>🧬 DNA Matching System</li>
          <li>👆 Fingerprint Database (AFIS)</li>
          <li>📹 Video Enhancement Suite</li>
          <li>💻 Digital Forensics Toolkit</li>
          <li>🔍 Trace Evidence Analysis</li>
        </ul>
        
        <hr>
        <center>
          <p><b>TIP:</b> Use Python queries to cross-reference forensic data with suspect information!</p>
        </center>
        
        <p><a href="home">← Back to Home</a></p>
      </div>
    `,
  },
  suspects: {
    title: 'Suspect Registry',
    content: `
      <div class="retro-page">
        <h1>👥 SUSPECT REGISTRY SYSTEM</h1>
        <hr>
        
        <p><b>Access Level:</b> Detective</p>
        <p><b>Database Status:</b> <font color="green">● ONLINE</font></p>
        
        <h2>Search Options:</h2>
        <ul>
          <li>Search by Name</li>
          <li>Search by Age Range</li>
          <li>Search by Occupation</li>
          <li>Search by Location</li>
          <li>Advanced SQL Query</li>
        </ul>
        
        <hr>
        <p><i>Remember: Use the SQL Terminal to run advanced queries!</i></p>
        <p>Example: <code>SELECT * FROM suspects WHERE age > 40</code></p>
        
        <p><a href="home">← Back to Home</a></p>
      </div>
    `,
  },
  help: {
    title: 'Detective Handbook',
    content: `
      <div class="retro-page">
        <h1>❓ DETECTIVE HANDBOOK</h1>
        <hr>
        
        <h2>Getting Started:</h2>
        <ol>
          <li>Select a case from the Home Screen</li>
          <li>Read the case briefing carefully</li>
          <li>Use Python/SQL queries to investigate</li>
          <li>Analyze evidence and suspects</li>
          <li>Accuse the culprit when ready!</li>
        </ol>
        
        <h2>SQL Query Examples:</h2>
        <pre>
-- Find suspects with motives
SELECT * FROM suspects WHERE motive IS NOT NULL

-- Find suspects by location
SELECT * FROM suspects WHERE location LIKE '%Marina%'

-- Cross-reference with vehicle data
SELECT s.name, v.plate_number 
FROM suspects s 
JOIN vehicle_registry v 
ON s.emirates_id = v.emirates_id
        </pre>
        
        <hr>
        <p><b>Need Help?</b> Talk to Officer Chip, your AI assistant!</p>
        
        <p><a href="home">← Back to Home</a></p>
      </div>
    `,
  },
};

export function WebBrowser() {
  const [currentPage, setCurrentPage] = useState('home');
  const [urlInput, setUrlInput] = useState('detective.uae/home');
  const [history, setHistory] = useState<string[]>(['home']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigateTo = (page: string) => {
    const newHistory = [...history.slice(0, historyIndex + 1), page];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPage(page);
    setUrlInput(`detective.uae/${page}`);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPage(history[newIndex]);
      setUrlInput(`detective.uae/${history[newIndex]}`);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPage(history[newIndex]);
      setUrlInput(`detective.uae/${history[newIndex]}`);
    }
  };

  const refresh = () => {
    setCurrentPage(currentPage);
  };

  const pageData = RETRO_PAGES[currentPage as keyof typeof RETRO_PAGES] || RETRO_PAGES.home;

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Browser Toolbar */}
      <div className="flex flex-col gap-1 p-2 bg-[#c0c0c0] border-b-2 border-[#808080]">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={goBack}
            disabled={historyIndex === 0}
            className="window-95-button p-1 disabled:opacity-50"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goForward}
            disabled={historyIndex === history.length - 1}
            className="window-95-button p-1 disabled:opacity-50"
            title="Forward"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={refresh} className="window-95-button p-1" title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={() => navigateTo('home')} className="window-95-button p-1" title="Home">
            <Home className="w-4 h-4" />
          </button>

          <div className="flex-1 flex items-center gap-1 ml-2">
            <Globe className="w-4 h-4" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 window-95-input px-2 py-1 text-sm"
              readOnly
            />
            <button className="window-95-button px-2 py-1">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 overflow-auto bg-white p-4">
        <style>{`
          .retro-page {
            font-family: 'Courier New', monospace;
          }
          .retro-page h1 {
            color: #000080;
            background: linear-gradient(to right, #c0c0c0, #ffffff);
            padding: 10px;
            border: 2px solid #808080;
          }
          .retro-page h2 {
            color: #008080;
            border-bottom: 2px solid #008080;
            padding-bottom: 5px;
          }
          .retro-page a {
            color: #0000ff;
            text-decoration: underline;
            cursor: pointer;
          }
          .retro-page a:hover {
            color: #ff00ff;
          }
          .retro-page hr {
            border: 1px solid #808080;
          }
          .retro-page table {
            border-collapse: collapse;
            background: #ffffff;
          }
          .retro-page th {
            background: #008080;
            color: white;
            padding: 5px;
          }
          .retro-page code {
            background: #ffffcc;
            padding: 2px 4px;
            border: 1px solid #808080;
          }
          .retro-page pre {
            background: #000000;
            color: #00ff00;
            padding: 10px;
            overflow-x: auto;
          }
          @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          blink {
            animation: blink 1s infinite;
          }
        `}</style>
        <div
          dangerouslySetInnerHTML={{ __html: pageData.content }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A') {
              e.preventDefault();
              const href = target.getAttribute('href');
              if (href) {
                navigateTo(href);
              }
            }
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#c0c0c0] border-t-2 border-white px-2 flex items-center text-xs">
        <div className="flex-1">Page loaded</div>
        <div className="border-l-2 border-[#808080] pl-2">Internet Connection: Secure</div>
      </div>
    </div>
  );
}