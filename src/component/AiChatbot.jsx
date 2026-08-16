import React, { useState, useEffect, useRef, useContext } from 'react';
import { IoClose, IoSend, IoSparkles, IoMic, IoTrashOutline } from 'react-icons/io5';
import { RiRobot2Line } from 'react-icons/ri';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import aiLogo from '../assets/ai.png';
import openSound from '../assets/open.mp3';

function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '👋 Hi there! I am **OneCart AI**, your 24/7 shopping assistant. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  const { serverUrl } = useContext(authDataContext) || {};
  const { setShowSearch } = useContext(shopDataContext) || {};
  const navigate = useNavigate();

  const quickPrompts = [
    '👗 Show Women Collection',
    '👕 Men Topwear',
    '🚚 Shipping & Delivery',
    '💳 Payment Options',
    '📦 Track My Order'
  ];

  // Auto scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  const toggleChat = () => {
    if (!isOpen) {
      try {
        const audio = new Audio(openSound);
        audio.play().catch(() => {});
      } catch (e) {}
    }
    setIsOpen(prev => !prev);
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg = {
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const baseUrl = serverUrl || 'http://localhost:8000';
      const historyPayload = messages.slice(-6).map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await axios.post(`${baseUrl}/api/ai/chat`, {
        message: text.trim(),
        history: historyPayload
      }, { withCredentials: true });

      const replyText = res.data?.reply || "I am here to help you navigate OneCart!";
      
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Sorry, I ran into a connection error. Please try asking again!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (promptText) => {
    const cleanText = promptText.replace(/^[^\w\s]+/, '').trim();
    
    // Check if voice/shortcut navigation is triggered
    const lower = cleanText.toLowerCase();
    if (lower.includes('women') || lower.includes('men') || lower.includes('collection')) {
      if (setShowSearch) setShowSearch(true);
      navigate('/collection');
    } else if (lower.includes('order')) {
      navigate('/order');
    }

    handleSendMessage(cleanText);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Brave.');
      return;
    }

    if (isListening) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      setIsListening(true);

      recognition.onstart = () => {
        toast.info('🎙️ Listening... Speak into your mic now!', { autoClose: 2000 });
      };

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        if (transcript && transcript.trim()) {
          setInputMessage(transcript);
          handleSendMessage(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        console.log("Speech recognition error:", event.error);
        if (event.error === 'no-speech') {
          toast.warning('No speech heard. Speak immediately after clicking the mic!');
        } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          toast.error('Microphone access is blocked! Click the lock icon in your browser address bar to allow microphone access.');
        } else if (event.error === 'audio-capture') {
          toast.error('No microphone hardware detected on your device.');
        } else if (event.error === 'aborted') {
          // Silent on abort
        } else {
          toast.error(`Voice error (${event.error}). Please try again.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
      console.log("Voice start error:", err);
      toast.error("Could not access microphone.");
    }
  };

  const clearChat = () => {
    setMessages([
      {
        sender: 'ai',
        text: 'Conversation reset. How else can I assist you?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to render bold text or simple markdown formatting
  const renderFormattedText = (content) => {
    if (!content) return null;
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Bold text replacement **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className={idx > 0 ? 'mt-1' : ''}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-semibold text-[#00d2fc]">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed lg:bottom-[25px] md:bottom-[35px] bottom-[75px] right-[25px] z-50 flex items-center gap-2">
        {!isOpen && (
          <div className="hidden sm:flex bg-[#0c2025]/90 border border-[#00d2fc]/40 text-xs px-3 py-1.5 rounded-full text-white shadow-lg animate-pulse items-center gap-1.5">
            <IoSparkles className="text-[#00d2fc]" />
            <span>Need Help? Ask AI</span>
          </div>
        )}
        <button
          onClick={toggleChat}
          className="relative group w-[60px] h-[60px] rounded-full bg-gradient-to-r from-[#00d2fc] to-[#6060f5] flex items-center justify-center shadow-[0_0_25px_rgba(0,210,252,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Toggle AI Support Assistant"
        >
          {isOpen ? (
            <IoClose className="w-7 h-7 text-white" />
          ) : (
            <img
              src={aiLogo}
              alt="AI Assistant"
              className="w-11 h-11 object-contain drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            />
          )}
          <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-[#141414] rounded-full"></span>
        </button>
      </div>

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="fixed lg:bottom-[95px] md:bottom-[105px] bottom-[140px] right-[15px] sm:right-[25px] z-50 w-[92vw] sm:w-[390px] h-[520px] max-h-[75vh] bg-[#0c2025]/95 backdrop-blur-xl border border-[#00d2fc]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-white transition-all duration-300">
          
          {/* Header */}
          <div className="w-full bg-gradient-to-r from-[#141414] via-[#0c2025] to-[#141414] border-b border-[#96969635] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-full bg-[#00d2fc]/20 border border-[#00d2fc] flex items-center justify-center">
                <RiRobot2Line className="w-6 h-6 text-[#00d2fc]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-wide text-white">OneCart AI</h3>
                  <span className="text-[10px] bg-[#00d2fc]/20 text-[#00d2fc] px-1.5 py-0.5 rounded font-mono font-semibold">24/7 LIVE</span>
                </div>
                <p className="text-[11px] text-gray-400">Shopping & Support Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Clear Chat"
                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <IoTrashOutline className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel / Bar */}
          <div className="w-full px-3 py-2 bg-[#141414]/60 border-b border-[#96969620] flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(prompt)}
                className="whitespace-nowrap text-[11px] bg-[#00d2fc]/10 hover:bg-[#00d2fc]/30 border border-[#00d2fc]/30 text-gray-200 hover:text-white px-2.5 py-1 rounded-full transition-all cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] text-xs md:text-sm px-3.5 py-2.5 rounded-2xl shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#00d2fc]/30 to-[#6060f5]/40 text-white rounded-tr-none border border-[#00d2fc]/40'
                      : 'bg-slate-800/90 text-gray-100 rounded-tl-none border border-slate-700'
                  }`}
                >
                  {renderFormattedText(msg.text)}
                </div>
                <span className="text-[9px] text-gray-500 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400 bg-slate-800/80 px-3.5 py-2 rounded-2xl rounded-tl-none border border-slate-700 w-max">
                <RiRobot2Line className="w-4 h-4 text-[#00d2fc] animate-spin" />
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#00d2fc] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#00d2fc] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#00d2fc] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-[#141414]/90 border-t border-[#96969635]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-[#0c2025] border border-[#00d2fc]/30 rounded-xl px-3 py-1.5 focus-within:border-[#00d2fc] transition-colors"
            >
              <input
                type="text"
                placeholder="Ask OneCart AI anything..."
                className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />

              <button
                type="button"
                onClick={handleVoiceInput}
                title="Voice Search"
                className={`p-1.5 rounded-lg transition-all ${
                  isListening ? 'bg-red-500 text-white animate-ping' : 'text-gray-400 hover:text-[#00d2fc]'
                }`}
              >
                <IoMic className="w-4 h-4" />
              </button>

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 rounded-lg bg-[#00d2fc] text-black hover:bg-[#6060f5] hover:text-white disabled:opacity-40 disabled:hover:bg-[#00d2fc] disabled:hover:text-black transition-all cursor-pointer"
              >
                <IoSend className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}

export default AiChatbot;
