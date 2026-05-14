'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Sparkles } from 'lucide-react';
import styles from './ConsultantChat.module.css';

const ConsultantChat = ({ data }) => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: data 
        ? `I have analyzed "${data.idea}". How can I help you refine this business today?`
        : "Evaluation data pending. Once you evaluate an idea, I can help you with specific strategies."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !data) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          context: data
        }),
      });

      const result = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: result.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting to the intelligence server. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGrp}>
          <MessageSquare className={styles.icon} />
          <h2>Consultant Room</h2>
        </div>
        <p>Interactive strategic sparring based on your latest evaluation.</p>
      </div>

      <div className={`${styles.chatBox} glass`}>
        {data && (
          <div className={styles.contextBanner}>
            <Sparkles size={14} className={styles.bannerIcon} />
            <span>Consulting on: <strong>{data.idea}</strong> ({data.classification?.industry})</span>
          </div>
        )}

        <div className={styles.messages} ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`${styles.message} ${styles[m.role]}`}>
              <div className={styles.avatar}>
                {m.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={styles.content}>
                {m.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={`${styles.message} ${styles.assistant}`}>
              <div className={styles.avatar}><Bot size={16} /></div>
              <div className={styles.typing}>
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.suggestions}>
          <button onClick={() => setInput("What are the best marketing channels for this?")} disabled={!data}>
            Marketing
          </button>
          <button onClick={() => setInput("How should I price this for enterprise?")} disabled={!data}>
            Pricing
          </button>
          <button onClick={() => setInput("What would be a good MVP scope?")} disabled={!data}>
            MVP
          </button>
        </div>

        <form className={styles.inputArea} onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder={data ? "Ask follow-up..." : "Evaluate an idea first..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!data || isTyping}
          />
          <button type="submit" disabled={!data || isTyping || !input.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultantChat;
