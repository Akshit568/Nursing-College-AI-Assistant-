export const conversationData = {
  initial: {
    question: "**Namaste! Welcome to Nursing College Delhi!**\n\nI'm your LiaPlus AI assistant, here to help you with our B.Sc Nursing program.\n\nAre you interested in admission to our Nursing College?",
    nextStep: 'eligibility_check'
  },
  eligibility_check: {
    question: "Great! To proceed with the admission process, I need to check your eligibility.\n\nDid you study **Biology** in your 12th grade? This is mandatory for B.Sc Nursing admission.",
    nextStep: 'program_details',
    biologyRequired: "B.Sc Nursing mein admission ke liye Biology avashyak hai."
  },
  program_details: {
    question: "Perfect! Let me tell you about our B.Sc Nursing Program.\n\n**Program Overview:**\n• **Duration:** 4 years full-time degree program\n• **Recognition:** Indian Nursing Council (INC) approved\n• **Training:** Comprehensive theoretical and practical education\n• **Clinical Experience:** Hands-on training with real patients\n• **Career Preparation:** Complete preparation for nursing profession\n\nWould you like more detailed information about the program structure and curriculum?",
    nextStep: 'fee_structure'
  },
  fee_structure: {
    question: "Here's our complete fee structure:\n\n**Annual Fee Breakdown:**\n• **Tuition Fee:** ₹60,000\n• **Bus Fee:** ₹10,000\n• **Total Annual Fees:** ₹70,000\n\n**Payment Schedule (3 Installments):**\n• **1st Installment:** ₹30,000 (due at admission time)\n• **2nd Installment:** ₹20,000 (due after first semester)\n• **3rd Installment:** ₹20,000 (due after second semester)\n\nThis flexible payment structure makes it easier for families to manage the fees. Would you like to know about our hostel and training facilities?",
    nextStep: 'hostel_facilities'
  },
  hostel_facilities: {
    question: "Our college provides excellent facilities for students:\n\n**Hostel Facilities:**\n• **24x7 water and electricity** supply\n• **CCTV surveillance** for complete security\n• **Warden available on-site** for student support and safety\n• Safe and comfortable living environment\n\n**Training Facilities:**\n• **Hospital training included** in the program\n• Students work with **real patients** during training\n• Practical experience in actual healthcare settings\n• Supervised clinical practice\n\nWould you like to know more about our college location?",
    nextStep: 'location'
  },
  location: {
    question: "Our college is strategically located in **Delhi**, providing excellent opportunities for nursing students.\n\n**Location Benefits:**\n• Access to major hospitals for clinical training\n• Better job opportunities in Delhi NCR\n• Well-connected transportation network\n• Safe and student-friendly environment\n\nWould you like to know more about the location or surrounding area?",
    nextStep: 'recognition'
  },
  recognition: {
    question: "Our college maintains the highest standards of nursing education:\n\n**Official Recognition:**\n• **Indian Nursing Council (INC), Delhi** - Fully approved and recognized\n• This ensures your degree is valid across India\n• Meets all national standards for nursing education\n• Graduates are eligible for nursing registration\n\nThis recognition is crucial for your career prospects and further studies. Would you like to know more about this recognition?",
    nextStep: 'clinical_training'
  },
  clinical_training: {
    question: "Our students receive comprehensive clinical training at multiple healthcare facilities:\n\n**Clinical Training Locations:**\n• **District Hospital, Backundpur**\n• **Community Health Centers**\n• **Regional Hospital, Chartha**\n• **Ranchi Neurosurgery and Allied Science Hospital, Ranchi, Jharkhand**\n\nThis diverse training exposure ensures our students are well-prepared for various healthcare settings and gain practical experience in different medical specialties.\n\nWould you like to know about scholarship opportunities?",
    nextStep: 'scholarships'
  },
  scholarships: {
    question: "We offer various scholarship opportunities to support deserving students:\n\n**Available Scholarships:**\n• **Government Post-Matric Scholarship:** ₹18,000 - ₹23,000 annually\n• **Labour Ministry Scholarships:** ₹40,000 - ₹48,000 annually (for those with Labour Registration)\n\nThese scholarships can significantly reduce your financial burden and make quality nursing education more accessible.\n\nWould you like to know about seat availability?",
    nextStep: 'total_seats'
  },
  total_seats: {
    question: "**Seat Availability:**\n\nWe have a **total of 60 seats** available in our Nursing program.\n\nThis limited intake ensures:\n• Quality education with personal attention\n• Better student-faculty ratio\n• Enhanced learning experience\n• Focused career guidance\n\nDue to limited seats, early application is recommended. Would you like to know about the complete eligibility criteria for admission?",
    nextStep: 'admission_eligibility'
  },
  admission_eligibility: {
    question: "Here are the complete eligibility criteria for admission:\n\n**Admission Requirements:**\n• **Biology in 12th grade** (mandatory requirement)\n• **PNT Exam** must be passed (Pre-Nursing Test)\n• **Age limit:** 17 to 35 years\n• Completion of 12th grade from recognized board\n• Medical fitness certificate required\n\n**Important Notes:**\n• Biology is absolutely essential - no exceptions\n• PNT exam is conducted by state nursing councils\n• Age is calculated as on admission date\n• All documents must be original and verified\n\nNeed help with something else?\n• \"I'm confused about the process\"\n• \"Help me understand nursing career\"\n• \"What documents do I need?\"\n\n**Required Topics for the Conversation Flow:**\n\n**1. Initial Admission Interest:**\n• The assistant should start by asking if the user is interested in admission to the Nursing College.\n• If the user responds positively, the assistant should continue to ask about the user's eligibility (whether they studied Biology in 12th grade).\n• If the user mentions a subject other than Biology, the assistant should inform them: \"B.Sc Nursing mein admission ke liye Biology avashyak hai.\"\n\n**2. Eligibility Check:**\n• If the user has taken Biology in 12th grade, the assistant should move forward with offering details on the B.Sc Nursing program.\n• If the user hasn't studied Biology, the assistant should inform them that Biology is a mandatory requirement for the program.\n\n**3. Program Details:**\n• The assistant should briefly describe the B.Sc Nursing Program and mention that the program is full-time.\n• The assistant should also ask the user if they want more information about the program.\n\n**4. Fee Structure:**\nThe assistant should provide a detailed fee breakdown:\n• Tuition Fee: ₹60,000 INR\n• Bus Fee: ₹10,000 INR\n• Total Annual Fees: ₹70,000 INR\nThe assistant should explain that the total fees are divided into 3 installments:\n• 1st Installment: ₹30,000 (due at the time of admission)\n• 2nd Installment: ₹20,000 (due after the first semester)\n• 3rd Installment: ₹20,000 (due after the second semester)\n\n**5. Hostel and Training Facilities:**\nThe assistant should describe the hostel facilities:\n• 24x7 water and electricity\n• CCTV surveillance for security\n• Warden available on-site\nThe assistant should also mention that hospital training is included, with students working with real patients during their training.\n\n**6. College Location:**\n• The assistant should inform the user that the college is located in Delhi\n• The assistant should ask if the user would like to know more about the location or surrounding area.\n\n**7. Recognition and Accreditation:**\nThe assistant should explain that the college is recognized by:\n• Indian Nursing Council (INC) (Delhi)\nThe assistant should check if the user wants to know more about this.\n\n**8. Clinical Training Locations:**\nThe assistant should inform the user about the locations for clinical training, which include:\n• District Hospital (Backundpur)\n• Community Health Centers\n• Regional Hospital (Chartha)\n• Ranchi Neurosurgery and Allied Science Hospital (Ranchi, Jharkhand)\n\n**9. Scholarship Options:**\nThe assistant should briefly describe the available scholarships:\n• Government Post-Matric Scholarship (₹18k-₹23k)\n• Labour Ministry Scholarships (₹40k-₹48k) for those with Labour Registration\n\n**10. Total Seats Available:**\nThe assistant should inform the user that there are a total of 60 seats available in the Nursing program.\n\n**11. Eligibility for Admission:**\nThe assistant should explain the eligibility criteria for admission:\n• Biology in 12th grade\n• PNT Exam (must be passed)\n• Age: 17 to 35 years\n\nEach topic should be covered one by one in each chat interaction.",
    nextStep: 'completed'
  }
};