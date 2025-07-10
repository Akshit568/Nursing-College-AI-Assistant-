import { useState, useCallback } from 'react';
import { Message, ChatState, ConversationStep } from '../types';
import { conversationData } from '../data/conversationData';

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: conversationData.initial.question,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const [chatState, setChatState] = useState<ChatState>({
    currentStep: 'initial',
    userResponses: {},
    isCompleted: false
  });

  const [isTyping, setIsTyping] = useState(false);

  // Enhanced positive response detection
  const isPositiveResponse = (response: string): boolean => {
    const cleanResponse = response.toLowerCase().trim();
    
    const exactPositives = [
      // Hindi variations
      'haan', 'han', 'haa', 'ha', 'ji haan', 'ji han', 'bilkul', 'zaroor', 'accha',
      'theek hai', 'sahi hai', 'batao', 'bataiye', 'sunao', 'sunaiye',
      // English variations
      'yes', 'y', 'yeah', 'yep', 'yup', 'sure', 'okay', 'ok', 'alright', 'right',
      'absolutely', 'definitely', 'of course', 'certainly', 'correct',
      // Action words
      'tell me', 'tell me more', 'more', 'continue', 'go ahead', 'proceed', 'next',
      'interested', 'want to know', 'would like', 'please'
    ];

    if (exactPositives.includes(cleanResponse)) {
      return true;
    }

    const positivePatterns = [
      'tell me more', 'want to know', 'interested in', 'please tell', 'go ahead',
      'continue with', 'yes please', 'sure continue', 'haan batao', 'yes tell me',
      'i want', 'i would like', 'can you tell', 'let me know', 'i need'
    ];

    return positivePatterns.some(pattern => cleanResponse.includes(pattern));
  };

  // Enhanced negative response detection
  const isNegativeResponse = (response: string): boolean => {
    const cleanResponse = response.toLowerCase().trim();
    
    const exactNegatives = [
      'nahi', 'nhi', 'na', 'nahin', 'bilkul nahi', 'no', 'nope', 'nah', 
      'not really', 'not interested', 'not now', 'maybe later', 'stop'
    ];

    if (exactNegatives.includes(cleanResponse)) {
      return true;
    }

    const negativePatterns = [
      'no thank', 'not interested', 'nahi chahiye', 'not looking', 
      'don\'t want', 'not suitable', 'not for me', 'maybe later'
    ];

    return negativePatterns.some(pattern => cleanResponse.includes(pattern));
  };

  // Check if user mentions Biology
  const hasBiologyMention = (response: string): boolean => {
    const cleanResponse = response.toLowerCase();
    return cleanResponse.includes('biology') || 
           cleanResponse.includes('bio') ||
           cleanResponse.includes('science') ||
           isPositiveResponse(response);
  };

  // Check if user mentions other subjects
  const hasOtherSubjects = (response: string): boolean => {
    const cleanResponse = response.toLowerCase();
    const otherSubjects = ['physics', 'chemistry', 'math', 'maths', 'mathematics', 'commerce', 'arts', 'history', 'geography'];
    return otherSubjects.some(subject => cleanResponse.includes(subject)) && !cleanResponse.includes('biology');
  };

  // NEW: Detect specific topic questions
  const detectSpecificTopic = (response: string): string | null => {
    const cleanResponse = response.toLowerCase();
    
    // Scholarship related keywords
    if (cleanResponse.includes('scholarship') || 
        cleanResponse.includes('financial aid') || 
        cleanResponse.includes('financial help') ||
        cleanResponse.includes('scholarship') ||
        cleanResponse.includes('government scholarship') ||
        cleanResponse.includes('labour scholarship')) {
      return 'scholarships';
    }
    
    // Fee related keywords
    if (cleanResponse.includes('fee') || 
        cleanResponse.includes('fees') || 
        cleanResponse.includes('cost') ||
        cleanResponse.includes('payment') ||
        cleanResponse.includes('installment') ||
        cleanResponse.includes('tuition') ||
        cleanResponse.includes('money') ||
        cleanResponse.includes('price')) {
      return 'fee_structure';
    }
    
    // Hostel related keywords
    if (cleanResponse.includes('hostel') || 
        cleanResponse.includes('accommodation') || 
        cleanResponse.includes('stay') ||
        cleanResponse.includes('room') ||
        cleanResponse.includes('facility') ||
        cleanResponse.includes('facilities')) {
      return 'hostel_facilities';
    }
    
    // Location related keywords
    if (cleanResponse.includes('location') || 
        cleanResponse.includes('address') || 
        cleanResponse.includes('where') ||
        cleanResponse.includes('delhi') ||
        cleanResponse.includes('area') ||
        cleanResponse.includes('place')) {
      return 'location';
    }
    
    // Eligibility related keywords
    if (cleanResponse.includes('eligibility') || 
        cleanResponse.includes('requirement') || 
        cleanResponse.includes('criteria') ||
        cleanResponse.includes('qualification') ||
        cleanResponse.includes('age limit') ||
        cleanResponse.includes('pnt exam')) {
      return 'admission_eligibility';
    }
    
    // Program details keywords
    if (cleanResponse.includes('program') || 
        cleanResponse.includes('course') || 
        cleanResponse.includes('curriculum') ||
        cleanResponse.includes('duration') ||
        cleanResponse.includes('b.sc nursing') ||
        cleanResponse.includes('nursing program')) {
      return 'program_details';
    }
    
    // Clinical training keywords
    if (cleanResponse.includes('clinical') || 
        cleanResponse.includes('training') || 
        cleanResponse.includes('hospital') ||
        cleanResponse.includes('practical') ||
        cleanResponse.includes('internship')) {
      return 'clinical_training';
    }
    
    // Recognition keywords
    if (cleanResponse.includes('recognition') || 
        cleanResponse.includes('accreditation') || 
        cleanResponse.includes('inc') ||
        cleanResponse.includes('approved') ||
        cleanResponse.includes('valid')) {
      return 'recognition';
    }
    
    // Seats keywords
    if (cleanResponse.includes('seats') || 
        cleanResponse.includes('admission') || 
        cleanResponse.includes('vacancy') ||
        cleanResponse.includes('available') ||
        cleanResponse.includes('total seats')) {
      return 'total_seats';
    }
    
    return null;
  };

  // NEW: Get specific topic response
  const getSpecificTopicResponse = (topic: string): string => {
    switch (topic) {
      case 'scholarships':
        return "Here are the scholarship opportunities available:\n\n**Available Scholarships:**\n• **Government Post-Matric Scholarship:** ₹18,000 - ₹23,000 annually\n• **Labour Ministry Scholarships:** ₹40,000 - ₹48,000 annually (for those with Labour Registration)\n\n**How to Apply:**\n• Apply through respective government portals\n• Submit required documents\n• Meet eligibility criteria\n• Scholarships are processed after admission confirmation\n\nThese scholarships can significantly reduce your financial burden and make quality nursing education more accessible.\n\nWould you like to know more about the application process or other aspects of our program?";
      
      case 'fee_structure':
        return "Here's our complete fee structure:\n\n**Annual Fee Breakdown:**\n• **Tuition Fee:** ₹60,000\n• **Bus Fee:** ₹10,000\n• **Total Annual Fees:** ₹70,000\n\n**Payment Schedule (3 Installments):**\n• **1st Installment:** ₹30,000 (due at admission time)\n• **2nd Installment:** ₹20,000 (due after first semester)\n• **3rd Installment:** ₹20,000 (due after second semester)\n\n**Additional Information:**\n• No hidden charges\n• Flexible payment options available\n• Scholarship deductions applied after confirmation\n• Fee structure is fixed for the entire program duration\n\nThis flexible payment structure makes it easier for families to manage the fees. Would you like to know about scholarship opportunities to reduce these costs?";
      
      case 'hostel_facilities':
        return "Our college provides excellent hostel facilities:\n\n**Hostel Facilities:**\n• **24x7 water and electricity** supply\n• **CCTV surveillance** for complete security\n• **Warden available on-site** for student support and safety\n• Safe and comfortable living environment\n• Clean and hygienic accommodation\n• Study areas and common rooms\n\n**Safety Features:**\n• Round-the-clock security\n• Restricted entry system\n• Emergency contact systems\n• Regular health and safety checks\n\n**Additional Amenities:**\n• Mess facility with nutritious meals\n• Wi-Fi connectivity\n• Laundry facilities\n• Recreation areas\n\nWould you like to know more about hostel fees or other facilities?";
      
      case 'location':
        return "Our college is strategically located in **Delhi**, providing excellent opportunities:\n\n**Location Benefits:**\n• Access to major hospitals for clinical training\n• Better job opportunities in Delhi NCR\n• Well-connected transportation network\n• Safe and student-friendly environment\n• Proximity to healthcare institutions\n\n**Transportation:**\n• Bus facility available (₹10,000 annual fee)\n• Metro connectivity nearby\n• Easy access from different parts of Delhi\n• Safe transportation for students\n\n**Nearby Facilities:**\n• Major hospitals for practical training\n• Libraries and educational resources\n• Shopping and recreational areas\n• Banking and postal services\n\nWould you like specific address details or information about transportation options?";
      
      case 'admission_eligibility':
        return "Here are the complete eligibility criteria for admission:\n\n**Admission Requirements:**\n• **Biology in 12th grade** (mandatory requirement)\n• **PNT Exam** must be passed (Pre-Nursing Test)\n• **Age limit:** 17 to 35 years\n• Completion of 12th grade from recognized board\n• Medical fitness certificate required\n\n**Important Notes:**\n• Biology is absolutely essential - no exceptions\n• PNT exam is conducted by state nursing councils\n• Age is calculated as on admission date\n• All documents must be original and verified\n• Minimum percentage requirements as per state guidelines\n\n**Required Documents:**\n• 12th grade marksheet and certificate\n• PNT exam scorecard\n• Birth certificate for age proof\n• Medical fitness certificate\n• Character certificate\n• Migration certificate (if applicable)\n\nWould you like help with the application process or document preparation?";
      
      case 'program_details':
        return "Here's detailed information about our B.Sc Nursing Program:\n\n**Program Overview:**\n• **Duration:** 4 years full-time degree program\n• **Recognition:** Indian Nursing Council (INC) approved\n• **Training:** Comprehensive theoretical and practical education\n• **Clinical Experience:** Hands-on training with real patients\n• **Career Preparation:** Complete preparation for nursing profession\n\n**Curriculum Highlights:**\n• Anatomy and Physiology\n• Nursing Fundamentals\n• Medical-Surgical Nursing\n• Community Health Nursing\n• Psychiatric Nursing\n• Pediatric Nursing\n• Obstetric and Gynecological Nursing\n\n**Practical Training:**\n• Hospital rotations in multiple specialties\n• Real patient care experience\n• Supervised clinical practice\n• Modern simulation labs\n\nWould you like more details about specific subjects or career opportunities after graduation?";
      
      case 'clinical_training':
        return "Our students receive comprehensive clinical training at multiple healthcare facilities:\n\n**Clinical Training Locations:**\n• **District Hospital, Backundpur**\n• **Community Health Centers**\n• **Regional Hospital, Chartha**\n• **Ranchi Neurosurgery and Allied Science Hospital, Ranchi, Jharkhand**\n\n**Training Features:**\n• Hands-on experience with real patients\n• Supervision by qualified nursing staff\n• Exposure to different medical specialties\n• Emergency care training\n• Community health programs\n\n**Training Duration:**\n• Clinical rotations throughout the 4-year program\n• Intensive training in final year\n• Minimum required clinical hours as per INC guidelines\n• Practical examinations and assessments\n\nThis diverse training exposure ensures our students are well-prepared for various healthcare settings. Would you like to know more about specific training modules?";
      
      case 'recognition':
        return "Our college maintains the highest standards of nursing education:\n\n**Official Recognition:**\n• **Indian Nursing Council (INC), Delhi** - Fully approved and recognized\n• This ensures your degree is valid across India\n• Meets all national standards for nursing education\n• Graduates are eligible for nursing registration\n\n**What This Means for You:**\n• Your degree will be recognized nationwide\n• Eligible for government nursing jobs\n• Can pursue higher studies (M.Sc Nursing)\n• International recognition for overseas opportunities\n• Professional nursing license eligibility\n\n**Quality Assurance:**\n• Regular inspections by INC\n• Curriculum as per national standards\n• Qualified faculty as per INC norms\n• Proper infrastructure and facilities\n\nThis recognition is crucial for your career prospects and further studies. Would you like to know more about career opportunities after graduation?";
      
      case 'total_seats':
        return "**Seat Availability:**\n\nWe have a **total of 60 seats** available in our Nursing program.\n\n**Benefits of Limited Intake:**\n• Quality education with personal attention\n• Better student-faculty ratio (1:10)\n• Enhanced learning experience\n• Focused career guidance\n• More clinical training opportunities\n\n**Selection Process:**\n• Merit-based selection\n• PNT exam scores considered\n• 12th grade marks evaluation\n• Document verification\n• Medical fitness assessment\n\n**Application Timeline:**\n• Early application recommended\n• Limited seats fill up quickly\n• First-come-first-serve basis (after meeting eligibility)\n• Waiting list maintained if needed\n\nDue to limited seats, I recommend applying as soon as possible. Would you like help with the application process?";
      
      default:
        return "I'd be happy to help you with information about our nursing program. Could you please specify what you'd like to know about?";
    }
  };

  const addMessage = useCallback((text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const simulateTyping = useCallback((callback: () => void, delay: number = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  }, []);

  const handleUserResponse = useCallback((response: string) => {
    if (!response.trim()) return;
    
    addMessage(response, 'user');

    // NEW: Check for specific topic questions first
    const specificTopic = detectSpecificTopic(response);
    if (specificTopic) {
      simulateTyping(() => {
        const topicResponse = getSpecificTopicResponse(specificTopic);
        addMessage(topicResponse, 'bot');
      });
      return;
    }

    // Handle negative responses
    if (isNegativeResponse(response)) {
      simulateTyping(() => {
        addMessage("Thank you for your time. If you change your mind about nursing education, feel free to come back anytime. We're here to help!", 'bot');
        setChatState(prev => ({ ...prev, isCompleted: true }));
      });
      return;
    }

    // Handle conversation flow based on current step
    const currentStepData = conversationData[chatState.currentStep];
    let nextStep = currentStepData.nextStep as ConversationStep;
    let nextMessage = '';

    // Special handling for eligibility check
    if (chatState.currentStep === 'eligibility_check') {
      if (hasOtherSubjects(response)) {
        simulateTyping(() => {
          addMessage("B.Sc Nursing mein admission ke liye Biology avashyak hai.\n\nUnfortunately, Biology is a mandatory requirement for nursing admission as per Indian Nursing Council guidelines. Without Biology in 12th grade, admission to B.Sc Nursing is not possible.", 'bot');
          setChatState(prev => ({ ...prev, isCompleted: true }));
        });
        return;
      }
      
      if (!hasBiologyMention(response) && isNegativeResponse(response)) {
        simulateTyping(() => {
          addMessage("B.Sc Nursing mein admission ke liye Biology avashyak hai.\n\nSince you didn't study Biology in 12th grade, you're not eligible for B.Sc Nursing admission. Biology is mandatory as per Indian Nursing Council regulations.", 'bot');
          setChatState(prev => ({ ...prev, isCompleted: true }));
        });
        return;
      }
    }

    // Continue with structured conversation flow
    if (isPositiveResponse(response) || chatState.currentStep === 'initial') {
      if (nextStep && nextStep !== 'completed') {
        nextMessage = conversationData[nextStep].question;
        
        simulateTyping(() => {
          addMessage(nextMessage, 'bot');
          setChatState(prev => ({
            ...prev,
            currentStep: nextStep,
            userResponses: { ...prev.userResponses, [chatState.currentStep]: response },
            isCompleted: false
          }));
        });
      } else {
        // End of structured flow
        nextMessage = "Thank you for your interest in our B.Sc Nursing program! \n\nI've covered all the essential information about:\n• Admission requirements\n• Program details\n• Fee structure\n• Facilities and training\n• Scholarships and opportunities\n\nIf you have any specific questions or need clarification on any topic, please feel free to ask. I'm here to help you with your nursing education journey!\n\n**You can ask me about:**\n• Scholarship details\n• Fee structure\n• Hostel facilities\n• Location information\n• Eligibility criteria\n• Clinical training\n• Career opportunities";
        
        simulateTyping(() => {
          addMessage(nextMessage, 'bot');
          setChatState(prev => ({
            ...prev,
            userResponses: { ...prev.userResponses, [chatState.currentStep]: response },
            isCompleted: false
          }));
        });
      }
    } else {
      // Handle unclear responses with helpful suggestions
      simulateTyping(() => {
        const clarificationMessage = "I want to make sure I provide you with the right information. You can:\n\n• Ask specific questions like \"Tell me about scholarships\" or \"What are the fees?\"\n• Respond with \"Yes\" or \"Haan\" to continue with the program overview\n• Respond with \"No\" or \"Nahi\" if not interested\n\n**Popular Questions:**\n• Scholarship and financial aid\n• Fee structure and payment options\n• Hostel facilities and accommodation\n• Location and transportation\n• Eligibility criteria and requirements\n\nWhat would you like to know more about?";
        
        addMessage(clarificationMessage, 'bot');
      });
    }
  }, [chatState.currentStep, addMessage, simulateTyping]);

  const resetChat = useCallback(() => {
    setMessages([
      {
        id: '1',
        text: conversationData.initial.question,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    setChatState({
      currentStep: 'initial',
      userResponses: {},
      isCompleted: false
    });
  }, []);

  return {
    messages,
    chatState,
    isTyping,
    handleUserResponse,
    resetChat
  };
};