import { useEffect, useRef, useState } from 'react';
import { WindowState } from '../types/game';

interface Window95Props {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onRestore?: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onDragStart: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  isMinimizing?: boolean;
}

export function Window95({
  window,
  onClose,
  onMinimize,
  onRestore,
  onMaximize,
  onFocus,
  onDragStart,
  children,
  showCloseButton = true,
  isMinimizing = false
}: Window95Props) {
  if (window.isMinimized && !isMinimizing) return null;

  const style: React.CSSProperties = window.isMaximized
    ? { top: 0, left: 0, width: '100%', height: '100%' }
    : {
        top: window.position.y,
        left: window.position.x,
        width: window.size.width,
        height: window.size.height
      };

  return (
    <div
      className={`window-95 fixed flex flex-col ${isMinimizing ? 'animate-swish-minimize' : ''}`}
      style={{ ...style, zIndex: window.zIndex }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div className="window-95-titlebar" onMouseDown={onDragStart}>
        <span className="text-sm">{window.title}</span>
        <div className="flex gap-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="window-95-button w-6 h-5 flex items-center justify-center p-0 text-black font-bold"
            title="Minimize"
          >
            <span className="text-base leading-none mb-1">─</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="window-95-button w-6 h-5 flex items-center justify-center p-0 text-black font-bold"
            title="Maximize"
          >
            <span className="text-sm leading-none">□</span>
          </button>
          {showCloseButton && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="window-95-button w-6 h-5 flex items-center justify-center p-0 text-black font-bold"
              title="Close"
            >
              <span className="text-base leading-none">×</span>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto window-95-scrollbar bg-white">
        {children}
      </div>
    </div>
  );
}