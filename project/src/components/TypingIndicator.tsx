import React from 'react';
import { GraduationCap, Heart } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  const typingMessages = [
    "LiaPlus AI is thinking...",
    "Preparing your answer...",
    "Getting the best info for you...",
    "Almost ready with details...",
    "Crafting a helpful response..."
  ];

  const [currentMessage] = React.useState(
    typingMessages[Math.floor(Math.random() * typingMessages.length)]
  );

  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg animate-pulse">
        <GraduationCap className="w-6 h-6 text-white" />
      </div>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 shadow-lg max-w-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{currentMessage}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          Powered by LiaPlus AI
        </div>
      </div>
    </div>
  );
};