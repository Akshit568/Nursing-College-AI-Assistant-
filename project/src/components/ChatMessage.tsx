import React from 'react';
import { Message } from '../types';
import { Bot, User, GraduationCap, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const [copied, setCopied] = React.useState(false);
  const [liked, setLiked] = React.useState<boolean | null>(null);
  
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLike = () => {
    setLiked(liked === true ? null : true);
  };

  const handleDislike = () => {
    setLiked(liked === false ? null : false);
  };

  const formatMessage = (text: string) => {
    // Enhanced message formatting with better emoji and structure support
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n/g, '<br />');
  };
  
  return (
    <div className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'} mb-6 group`}>
      {isBot && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isBot ? 'order-2' : 'order-1'}`}>
        <div className={`rounded-2xl px-5 py-4 shadow-lg relative ${
          isBot 
            ? 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white'
        }`}>
          <div 
            className="whitespace-pre-line text-sm leading-relaxed [&_code]:bg-gray-100 [&_code]:dark:bg-gray-700 [&_code]:dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
          />
          
          {/* Message Actions for Bot Messages */}
          {isBot && (
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => copyToClipboard(message.text)}
                className={`p-1 transition-all duration-200 ${
                  copied 
                    ? 'text-green-600 dark:text-green-400 scale-110' 
                    : 'text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110'
                }`}
                title={copied ? "Copied!" : "Copy message"}
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={handleLike}
                className={`p-1 transition-all duration-200 ${
                  liked === true
                    ? 'text-green-600 dark:text-green-400 scale-110'
                    : 'text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:scale-110'
                }`}
                title="Helpful response"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={handleDislike}
                className={`p-1 transition-all duration-200 ${
                  liked === false
                    ? 'text-red-600 dark:text-red-400 scale-110'
                    : 'text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:scale-110'
                }`}
                title="Not helpful"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
              
              {/* Feedback Text */}
              {liked !== null && (
                <span className={`text-xs font-medium transition-all duration-200 ${
                  liked ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {liked ? 'Thanks for the feedback!' : 'We\'ll improve this'}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-2 px-2 flex items-center gap-2 ${isBot ? 'text-left' : 'text-right justify-end'}`}>
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isBot && (
            <span className="text-blue-600 dark:text-blue-400 font-medium">LiaPlus AI</span>
          )}
        </div>
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center order-2 shadow-lg">
          <User className="w-6 h-6 text-white" />
        </div>
      )}
    </div>
  );
};