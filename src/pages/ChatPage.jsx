// src/pages/ChatPage.jsx
import React, { useState, useRef, useEffect } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // List of random bot replies
  const botReplies = [
    "Got it, we'll check this out",
    "Understood, we're on it",
    "Message received, reviewing now",
    "Noted, we'll handle it",
    "Thanks, we'll take a look",
    "Roger that, investigating now",
    "Copy that, we're looking into it",
    "Acknowledged, we'll get back to you",
    "Received, our team is on it",
    "Understood, we'll review this shortly"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to get random bot reply
  const getRandomReply = () => {
    const randomIndex = Math.floor(Math.random() * botReplies.length);
    return botReplies[randomIndex];
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsBotTyping(true);

    // Simulate bot typing delay with random reply
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: getRandomReply(),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsBotTyping(false);
    }, 800 + Math.random() * 800); // Random delay between 0.8-1.6 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1f] via-purple-900/20 to-cyan-900/10 p-4">
      <div className="max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            COSMIC CHAT
          </h1>
          <p className="text-white/70 text-lg">Connect with World of Chest support</p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <div className="flex items-center gap-2 text-cyan-300 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Online • Automated Support
            </div>
            <button
              onClick={clearChat}
              className="px-3 py-1 text-xs bg-white/10 border border-white/20 rounded-lg text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300"
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_30px_rgba(91,45,252,0.3)]">
          
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-pulse">💬</div>
                <h3 className="text-xl font-bold text-cyan-300 mb-2">Welcome to Cosmic Chat!</h3>
                <p className="text-white/70 mb-4">Send us your questions, feedback, or suggestions.</p>
                <div className="max-w-md mx-auto bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-purple-300 font-semibold mb-2">💡 How it works:</h4>
                  <ul className="text-white/60 text-sm space-y-1 text-left">
                    <li>• Type any message and press Enter</li>
                    <li>• Our cosmic support will respond instantly</li>
                    <li>• Each reply is uniquely generated</li>
                    <li>• We're here to help 24/7</li>
                  </ul>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md rounded-2xl p-4 border backdrop-blur-sm transition-all duration-300 transform hover:scale-105 ${
                      message.isUser
                        ? 'bg-gradient-to-br from-purple-500/40 to-cyan-400/40 border-cyan-400/60 text-white shadow-[0_0_20px_rgba(28,210,255,0.4)] rounded-br-none'
                        : 'bg-gradient-to-br from-gray-800/40 to-gray-700/40 border-purple-400/40 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {!message.isUser && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-glow">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                          {message.text}
                        </p>
                        <div className={`text-xs mt-2 flex items-center gap-1 ${
                          message.isUser ? 'text-cyan-300/80' : 'text-purple-300/80'
                        }`}>
                          <span>{message.timestamp}</span>
                          {message.isUser && (
                            <span className="text-green-400">✓</span>
                          )}
                        </div>
                      </div>
                      {message.isUser && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-glow">
                          <span className="text-white text-xs font-bold">You</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Bot Typing Indicator */}
            {isBotTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="max-w-xs rounded-2xl p-4 border border-purple-400/30 bg-gray-800/40 backdrop-blur-sm rounded-bl-none shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-glow">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-white/60 text-xs">Cosmic Support is typing...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 p-4 bg-white/5 backdrop-blur-lg">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 resize-none focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(28,210,255,0.3)] transition-all duration-300 backdrop-blur-sm"
                  rows="1"
                  style={{
                    minHeight: '50px',
                    maxHeight: '120px'
                  }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                <div className="absolute right-3 bottom-3 text-white/40 text-xs flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Enter</kbd>
                  <span>to send</span>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={inputText.trim() === '' || isBotTyping}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-500 hover:to-cyan-400 hover:shadow-[0_0_20px_rgba(28,210,255,0.5)] transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 min-w-[80px] justify-center"
              >
                {isBotTyping ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Send</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
            <div className="text-cyan-400 text-lg mb-2 group-hover:scale-110 transition-transform duration-300">🎯</div>
            <div className="text-white font-semibold">Instant Support</div>
            <div className="text-white/70 text-sm">Always here to assist you</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-400/30 transition-all duration-300 group">
            <div className="text-purple-400 text-lg mb-2 group-hover:scale-110 transition-transform duration-300">⚡</div>
            <div className="text-white font-semibold">Quick Responses</div>
            <div className="text-white/70 text-sm">Lightning-fast replies</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group">
            <div className="text-yellow-400 text-lg mb-2 group-hover:scale-110 transition-transform duration-300">🌌</div>
            <div className="text-white font-semibold">Cosmic AI</div>
            <div className="text-white/70 text-sm">Powered by advanced technology</div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatPage;