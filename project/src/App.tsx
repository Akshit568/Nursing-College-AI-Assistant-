import React, { useState } from 'react';
import { ChatContainer } from './components/ChatContainer';
import { LandingPage } from './components/LandingPage';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [showChat, setShowChat] = useState(false);

  const handleBackToLanding = () => {
    setShowChat(false);
  };

  return (
    <ThemeProvider>
      <div className="h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {showChat ? (
          <ChatContainer onBack={handleBackToLanding} />
        ) : (
          <LandingPage onStartChat={() => setShowChat(true)} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;