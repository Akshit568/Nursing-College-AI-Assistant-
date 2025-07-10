export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatState {
  currentStep: ConversationStep;
  userResponses: Record<string, string>;
  isCompleted: boolean;
}

export type ConversationStep = 
  | 'initial'
  | 'eligibility_check'
  | 'program_details'
  | 'fee_structure'
  | 'hostel_facilities'
  | 'location'
  | 'recognition'
  | 'clinical_training'
  | 'scholarships'
  | 'total_seats'
  | 'admission_eligibility'
  | 'completed';