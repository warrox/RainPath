import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Plus, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-rainpath-gray-900 border-b border-rainpath-gray-200 dark:border-rainpath-gray-700 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link to="/cases" className="flex items-center">
            <img
              src="/68cbc19cc9ac250c4b7913d1_7e4b0bd60a4b3daf8967ed60b9a3c31f_RainPath logo copy.svg"
              alt="RainPath"
              className="h-10 w-auto"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Button asChild>
              <Link to="/create-case">
                <Plus className="h-4 w-4" />
                New Case
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
