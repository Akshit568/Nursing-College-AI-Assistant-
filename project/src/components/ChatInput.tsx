import React, { useState, KeyboardEvent } from 'react';
import { Send, Mic, Sparkles, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [showQuickQuestions, setShowQuickQuestions] = useState(false);
  const [showPopularQuestions, setShowPopularQuestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!disabled) {
      onSendMessage(suggestion);
      setShowQuickQuestions(false);
      setShowPopularQuestions(false);
    }
  };

  // Essential quick questions
  const quickQuestions = [
    "Admission requirements?",
    "Fee structure?",
    "Scholarships available?",
    "Career opportunities?"
  ];

  // Popular detailed questions
  const popularQuestions = [
    "I scored 85% in 12th, can I get admission?",
    "What are the fees and payment options?",
    "Tell me about scholarships and financial aid",
    "Where is the college located in Delhi?",
    "Is hostel facility available?",
    "What are the career opportunities after B.Sc Nursing?"
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
      {/* Quick Questions Toggle */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
        <button
          onClick={() => setShowQuickQuestions(!showQuickQuestions)}
          className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>Quick Questions</span>
          {showQuickQuestions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Quick Questions Dropdown */}
      {showQuickQuestions && (
        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-b border-gray-100 dark:border-gray-600">
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(question)}
                disabled={disabled}
                className="text-xs px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Questions Toggle */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
        <button
          onClick={() => setShowPopularQuestions(!showPopularQuestions)}
          className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Popular Questions</span>
          {showPopularQuestions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Popular Questions Dropdown */}
      {showPopularQuestions && (
        <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 border-b border-gray-100 dark:border-gray-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {popularQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(question)}
                disabled={disabled}
                className="text-xs px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:text-purple-700 dark:hover:text-purple-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md text-left transform hover:scale-105 active:scale-95"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3 p-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about admissions, fees, scholarships... (Hindi/English both welcome!)"
            disabled={disabled}
            className="w-full px-5 py-4 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors duration-300"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={disabled}
            title="Voice input (coming soon)"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white rounded-full hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          title="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
      
      <div className="px-4 pb-2 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          I understand both Hindi and English! Ask me anything about nursing education.
        </p>
      </div>
    </div>
  );
};