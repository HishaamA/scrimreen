import { useState, useRef, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, Trash2, Bold, Italic, Underline, Type } from 'lucide-react';

interface NotePage {
  id: number;
  title: string;
  content: string;
}

export function Notepad() {
  // Load from localStorage on mount
  const [pages, setPages] = useState<NotePage[]>(() => {
    const saved = localStorage.getItem('notepad_pages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [{ id: 1, title: 'Page 1', content: '' }];
      }
    }
    return [{ id: 1, title: 'Page 1', content: '' }];
  });
  const [currentPageIndex, setCurrentPageIndex] = useState(() => {
    const saved = localStorage.getItem('notepad_current_page');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffff00');
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const currentPage = pages[currentPageIndex];

  // Save to localStorage whenever pages change
  useEffect(() => {
    localStorage.setItem('notepad_pages', JSON.stringify(pages));
  }, [pages]);

  // Save current page index
  useEffect(() => {
    localStorage.setItem('notepad_current_page', currentPageIndex.toString());
  }, [currentPageIndex]);

  // Load content only when page changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = currentPage.content;
      // Move cursor to end after setting content
      setTimeout(() => {
        if (!editorRef.current) return;
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
        editorRef.current.focus();
      }, 0);
    }
  }, [currentPageIndex, currentPage.id]);

  const addNewPage = () => {
    const newPage: NotePage = {
      id: Date.now(),
      title: `Page ${pages.length + 1}`,
      content: ''
    };
    setPages([...pages, newPage]);
    setCurrentPageIndex(pages.length);
  };

  const deletePage = () => {
    if (pages.length === 1) return; // Don't delete last page
    const newPages = pages.filter((_, index) => index !== currentPageIndex);
    setPages(newPages);
    setCurrentPageIndex(Math.max(0, currentPageIndex - 1));
  };

  const updateContent = () => {
    if (!editorRef.current) return;
    const newPages = [...pages];
    newPages[currentPageIndex].content = editorRef.current.innerHTML;
    setPages(newPages);
  };

  const updateTitle = (title: string) => {
    const newPages = [...pages];
    newPages[currentPageIndex].title = title;
    setPages(newPages);
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const applyStyle = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertHighlight = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.backgroundColor = backgroundColor;
    span.style.padding = '2px 4px';
    
    try {
      range.surroundContents(span);
    } catch (e) {
      // If can't surround (complex selection), use execCommand
      applyStyle('backColor', backgroundColor);
    }
    editorRef.current?.focus();
  };

  const applyTextColor = () => {
    applyStyle('foreColor', textColor);
  };

  const changeFontSize = (size: string) => {
    // Use actual pixel sizes instead of HTML font size values
    const pixelSizes: { [key: string]: string } = {
      '1': '10px',
      '2': '13px',
      '3': '16px',
      '4': '20px',
      '5': '24px',
      '6': '32px',
      '7': '48px'
    };
    
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontSize = pixelSizes[size] || '16px';
      try {
        range.surroundContents(span);
      } catch (e) {
        console.error('Could not apply font size');
      }
    }
    editorRef.current?.focus();
  };

  // Handle content changes properly
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newPages = [...pages];
    newPages[currentPageIndex].content = e.currentTarget.innerHTML;
    setPages(newPages);
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Toolbar */}
      <div className="window-95-panel p-2 flex items-center gap-2 flex-wrap border-b-2 border-[#808080]">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r-2 border-[#808080] pr-2">
          <button
            onClick={() => applyStyle('bold')}
            className="window-95-button p-1.5"
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyStyle('italic')}
            className="window-95-button p-1.5"
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyStyle('underline')}
            className="window-95-button p-1.5"
            title="Underline (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>

        {/* Text Color */}
        <div className="flex items-center gap-1 border-r-2 border-[#808080] pr-2">
          <Type className="w-4 h-4" />
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-8 h-6 cursor-pointer border border-[#808080]"
            title="Text Color"
          />
          <button
            onClick={applyTextColor}
            className="window-95-button px-2 py-1 text-xs"
          >
            Apply Color
          </button>
        </div>

        {/* Highlight */}
        <div className="flex items-center gap-1 border-r-2 border-[#808080] pr-2">
          <span className="text-xs font-bold">Highlight:</span>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-8 h-6 cursor-pointer border border-[#808080]"
            title="Highlight Color"
          />
          <button
            onClick={insertHighlight}
            className="window-95-button px-2 py-1 text-xs"
          >
            Highlight
          </button>
        </div>

        {/* Font Size */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold">Size:</span>
          <select
            onChange={(e) => changeFontSize(e.target.value)}
            className="border-2 border-[#808080] px-1 py-0.5 bg-white text-xs"
            defaultValue="3"
          >
            <option value="1">Tiny</option>
            <option value="2">Small</option>
            <option value="3">Normal</option>
            <option value="4">Large</option>
            <option value="5">X-Large</option>
            <option value="6">XX-Large</option>
            <option value="7">Huge</option>
          </select>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="window-95-panel p-2 flex items-center justify-between border-b-2 border-[#808080]">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPageIndex === 0}
            className="window-95-button p-1.5 disabled:opacity-50"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold">Page:</span>
            <input
              type="text"
              value={currentPage.title}
              onChange={(e) => updateTitle(e.target.value)}
              className="border-2 border-[#808080] px-2 py-1 w-24 text-xs bg-white"
            />
            <span className="text-xs text-gray-600">
              ({currentPageIndex + 1} of {pages.length})
            </span>
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPageIndex === pages.length - 1}
            className="window-95-button p-1.5 disabled:opacity-50"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={addNewPage}
            className="window-95-button px-2 py-1 text-xs flex items-center gap-1 bg-green-100"
          >
            <Plus className="w-3 h-3" />
            New Page
          </button>
          <button
            onClick={deletePage}
            disabled={pages.length === 1}
            className="window-95-button px-2 py-1 text-xs flex items-center gap-1 bg-red-100 disabled:opacity-50"
            title="Delete Page"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Text Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="flex-1 p-4 overflow-auto bg-white border-2 border-[#808080] m-2 focus:outline-none font-mono text-sm leading-relaxed"
        style={{ minHeight: '200px', direction: 'ltr' }}
        spellCheck={false}
      />

      {/* Status Bar */}
      <div className="window-95-panel px-3 py-1 border-t-2 border-[#808080] text-xs text-gray-600 flex justify-between">
        <span>Detective Notes - Page {currentPageIndex + 1}</span>
        <span>{pages.length} page{pages.length !== 1 ? 's' : ''} total</span>
      </div>
    </div>
  );
}