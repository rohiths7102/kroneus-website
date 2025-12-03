'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        text: 'Hi! I\'m the KRONEUS Assistant. We build advanced protection systems for agentic AI and autonomous intelligence. How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
    },
]

const QUICK_REPLIES = [
    'Tell me about KRONEUS',
    'What is SELA?',
    'Request a demo',
    'Which industries do you serve?',
]

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const getAutoResponse = (message: string): string => {
        const lowerMessage = message.toLowerCase()

        // KRONEUS company info
        if (lowerMessage.includes('kroneus') || lowerMessage.includes('company') || lowerMessage.includes('about you')) {
            return "KRONEUS is a research-driven security organization building advanced protection systems for agentic AI and next-generation digital infrastructure. We combine cybersecurity engineering, policy-driven control, and intelligent threat analysis to create resilient defense technology for the future threat landscape. Our mission: ensure autonomous and AI-enabled systems operate safely in real environments."
        }

        // SELA product info
        if (lowerMessage.includes('sela') || lowerMessage.includes('product') || lowerMessage.includes('flagship')) {
            return "SELA is our AI-native security layer designed to evaluate and enforce behavioral policies in real time. It identifies unsafe actions, blocks malicious sequences, scores intent, and provides dynamic guardrails that keep autonomous systems aligned with organizational rules. SELA features: Real-Time Policy Enforcement, ML Threat Detection, Blockchain Auditing, and 6-layer defense architecture."
        }

        // How it works
        if (lowerMessage.includes('how') && lowerMessage.includes('work')) {
            return "SELA operates as a security gateway between AI agents and enterprise systems, validating every action through 6 security layers: Input Validation → Behavioral Analysis → Policy Enforcement → Threat Detection → Action Filtering → Audit Logging. Each layer can block threats in <50ms without impacting performance. Want to see it in action?"
        }

        // Industries
        if (lowerMessage.includes('industry') || lowerMessage.includes('industries') || lowerMessage.includes('use case')) {
            return "We serve 4 key industries: 🏦 Banking (fraud detection, compliance), 🛒 Retail (dynamic pricing protection, inventory security), 🚗 Autonomous Vehicles (fleet command security, safety-critical operations), and 🏢 Enterprise IT (helpdesk automation, HR processes). Each has unique security challenges we address."
        }

        // Vision/Mission
        if (lowerMessage.includes('vision') || lowerMessage.includes('mission') || lowerMessage.includes('goal')) {
            return "Our vision is to shape the security frameworks that protect the next intelligence era. As AI grows more capable, risks grow with it. KRONEUS develops protection tools that safeguard decision engines, AI models, and high-value applications from manipulation, fraud, exploitation, and emerging adversarial behavior."
        }

        // Demo request
        if (lowerMessage.includes('demo') || lowerMessage.includes('contact') || lowerMessage.includes('interested') || lowerMessage.includes('yes')) {
            return "NAVIGATE_TO_CONTACT_FORM" // Special flag to trigger navigation
        }

        // Pricing
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
            return "Our pricing is customized based on your deployment scale and specific security requirements. We offer flexible plans for enterprises of all sizes. Would you like to discuss your needs with our team?"
        }

        // Thanks
        if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
            return "You're welcome! Feel free to ask anything about KRONEUS, SELA, or our approach to securing autonomous AI systems."
        }

        return "I'd be happy to help! Ask me about KRONEUS, SELA's features, which industries we serve, our mission, or schedule a demo. What interests you most?"
    }

    const sendMessage = (text: string) => {
        if (!text.trim()) return

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: text.trim(),
            sender: 'user',
            timestamp: new Date(),
        }
        setMessages(prev => [...prev, userMessage])
        setInputValue('')

        // Simulate bot typing
        setIsTyping(true)
        setTimeout(() => {
            const responseText = getAutoResponse(text)

            // Check if this is a navigation request
            if (responseText === "NAVIGATE_TO_CONTACT_FORM") {
                const botResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "Great! I'll take you to our contact form where you can schedule a demo. One moment...",
                    sender: 'bot',
                    timestamp: new Date(),
                }
                setMessages(prev => [...prev, botResponse])
                setIsTyping(false)

                // Navigate to contact form with offset and close chatbot
                setTimeout(() => {
                    const contactSection = document.querySelector('#contact-form')
                    if (contactSection) {
                        const elementPosition = contactSection.getBoundingClientRect().top
                        const offsetPosition = elementPosition + window.pageYOffset - 100
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                    }
                    // Close chatbot after navigation
                    setTimeout(() => setIsOpen(false), 1500)
                }, 1000)
            } else {
                // Normal response
                const botResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: responseText,
                    sender: 'bot',
                    timestamp: new Date(),
                }
                setMessages(prev => [...prev, botResponse])
                setIsTyping(false)
            }
        }, 1000 + Math.random() * 1000) // Random delay 1-2s
    }

    const handleQuickReply = (reply: string) => {
        sendMessage(reply)
    }

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-blue rounded-full shadow-glow-lg hover:shadow-glow-xl transition-shadow duration-300 flex items-center justify-center group"
                        aria-label="Open chat"
                    >
                        <ChatBubbleLeftRightIcon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-h-[80vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-500 to-accent-blue p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">SELA Assistant</h3>
                                    <p className="text-white/80 text-xs">Powered by AI</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                                aria-label="Close chat"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.sender === 'user'
                                            ? 'bg-gradient-to-br from-primary-500 to-accent-blue text-white'
                                            : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'}`}>
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl px-4 py-2 border border-slate-200 dark:border-slate-700">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length <= 2 && (
                            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Quick replies:</p>
                                <div className="flex flex-wrap gap-2">
                                    {QUICK_REPLIES.map((reply) => (
                                        <button
                                            key={reply}
                                            onClick={() => handleQuickReply(reply)}
                                            className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-full transition-colors border border-slate-200 dark:border-slate-700"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                sendMessage(inputValue)
                            }}
                            className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
                        >
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-blue rounded-full flex items-center justify-center hover:shadow-glow transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Send message"
                                >
                                    <PaperAirplaneIcon className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
