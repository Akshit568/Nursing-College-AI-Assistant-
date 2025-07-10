import React, { useState } from 'react';
import { ConversationStep } from '../types';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

interface QuickRepliesProps {
  currentStep: ConversationStep;
  onReply: (reply: string) => void;
  disabled?: boolean;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({ currentStep, onReply, disabled = false }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getQuickReplies = (step: ConversationStep): string[] => {
    switch (step) {
      case 'initial':
        return ['Yes, interested', 'Tell me more', 'Not interested'];
      case 'eligibility_check':
        return ['Yes, had Biology', 'No Biology', 'What subjects needed?'];
      case 'program_details':
        return ['Yes, more info', 'Continue', 'What about fees?'];
      case 'fee_structure':
        return ['Continue', 'Scholarship info?', 'Hostel details?'];
      case 'hostel_facilities':
        return ['Continue', 'Location details?', 'Safety info?'];
      case 'location':
        return ['Yes, more about location', 'Continue', 'Transportation?'];
      case 'recognition':
        return ['Yes, tell more', 'Continue', 'What does this mean?'];
      case 'clinical_training':
        return ['Continue', 'Hospital details?', 'Training duration?'];
      case 'scholarships':
        return ['Continue', 'How to apply?', 'Eligibility criteria?'];
      case 'total_seats':
        return ['Continue', 'Selection process?', 'Application deadline?'];
      case 'admission_eligibility':
        return ['Document list?', 'Application process?', 'PNT exam info?'];
      case 'completed':
        return ['Admission help', 'Fee details', 'Career guidance', 'Document checklist'];
      default:
        return ['Yes', 'Continue', 'Tell me more'];
    }
  };

  const quickReplies = getQuickReplies(currentStep);

  if (quickReplies.length === 0 || disabled) {
    return null;
  }

  const handleReplyClick = (reply: string) => {
    onReply(reply);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
      {/* Toggle Header */}
      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-600">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span className="font-medium">Quick Replies</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">({quickReplies.length} options)</span>
          </div>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Quick Replies Content */}
      {isExpanded && (
        <div className="px-4 py-3">
          {/* Mobile: Horizontal scroll, Desktop: Grid */}
          <div className="block sm:hidden">
            <div className="overflow-x-auto">
              <div className="flex gap-2 pb-1">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleReplyClick(reply)}
                    className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full text-xs text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md font-medium whitespace-nowrap flex-shrink-0 transform hover:scale-105 active:scale-95"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleReplyClick(reply)}
                className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-xs text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md font-medium text-center transform hover:scale-105 active:scale-95"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Helper text */}
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Tap any option above or type your own response
            </p>
          </div>
        </div>
      )}
    </div>
  );
};