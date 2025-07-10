import React from 'react';
import { GraduationCap, RefreshCw, Shield, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface ChatHeaderProps {
  onReset: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onReset, onBack, showBackButton = false }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Back to Landing Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="p-2 bg-white/20 rounded-full">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Nursing College Assistant</h1>
            <div className="flex items-center gap-2 text-sm text-blue-100 dark:text-blue-200">
              <Shield className="w-4 h-4" />
              <span>Powered by LiaPlus AI</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={onReset}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            title="Reset Chat"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};