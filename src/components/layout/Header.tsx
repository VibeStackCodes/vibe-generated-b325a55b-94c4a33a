import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Menu, X, Download, HelpCircle, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeaderProps {
  onExport: () => void;
  onHelp: () => void;
  onSettings: () => void;
}

export const Header = React.memo<HeaderProps>(({ onExport, onHelp, onSettings }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">✓</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">MyTodo</h1>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onHelp}
            aria-label="Help"
          >
            <HelpCircle size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onExport}
            aria-label="Export data"
          >
            <Download size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSettings}
            aria-label="Settings"
          >
            <Settings size={18} />
          </Button>
        </div>

        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 p-4 space-y-2">
          <Button
            variant="ghost"
            onClick={() => {
              onHelp();
              setIsMenuOpen(false);
            }}
            className="w-full justify-start"
          >
            <HelpCircle size={18} className="mr-2" />
            Help
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              onExport();
              setIsMenuOpen(false);
            }}
            className="w-full justify-start"
          >
            <Download size={18} className="mr-2" />
            Export
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              onSettings();
              setIsMenuOpen(false);
            }}
            className="w-full justify-start"
          >
            <Settings size={18} className="mr-2" />
            Settings
          </Button>
        </div>
      )}
    </header>
  );
});

Header.displayName = 'Header';
