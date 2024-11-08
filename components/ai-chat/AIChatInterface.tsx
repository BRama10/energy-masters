// components/ai-chat/AIChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Send,
    Bot,
    User,
    Sparkles,
    X
} from 'lucide-react';

import { useChat } from 'ai/react';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

interface AIChatInterfaceProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AIChatInterface: React.FC<AIChatInterfaceProps> = ({
    isOpen,
    onClose
}) => {
    // const [messages, setMessages] = useState<Message[]>([
    //     {
    //         id: '1',
    //         content: "Hi! I'm your Energy Masters AI assistant. I can help you with the audit process and answer any questions you have about energy efficiency.",
    //         sender: 'ai',
    //         timestamp: new Date()
    //     }
    // ]);

    const { messages, input, handleSubmit, handleInputChange, isLoading } =
        useChat();

    // const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // const handleSend = async () => {
    //     if (!input.trim()) return;

    //     const newMessage: Message = {
    //         id: Date.now().toString(),
    //         content: input,
    //         sender: 'user',
    //         timestamp: new Date()
    //     };

    //     setMessages(prev => [...prev, newMessage]);
    //     setInput('');
    //     setIsTyping(true);

    //     // Simulate AI response
    //     setTimeout(() => {
    //         const aiResponse: Message = {
    //             id: (Date.now() + 1).toString(),
    //             content: "I'll help you with that! [AI response simulation]",
    //             sender: 'ai',
    //             timestamp: new Date()
    //         };
    //         setMessages(prev => [...prev, aiResponse]);
    //         setIsTyping(false);
    //     }, 1500);
    // };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="fixed inset-0 bg-background z-50 md:right-0 md:left-auto md:w-[400px]"
                >
                    {/* Header */}
                    <div className="border-b h-16 flex items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="font-semibold">Energy Masters AI</h2>
                                <p className="text-xs text-muted-foreground">Your audit assistant</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Messages Area */}
                    <ScrollArea className="h-[calc(100vh-8rem)] p-4" ref={scrollRef}>
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''
                                        }`}
                                >
                                    <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center shrink-0
                    ${message.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-primary/10'
                                        }
                  `}>
                                        {message.role === 'user'
                                            ? <User className="w-5 h-5" />
                                            : <Sparkles className="w-5 h-5 text-primary" />
                                        }
                                    </div>
                                    <div className={`
                    rounded-2xl p-3 max-w-[80%]
                    ${message.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                        }
                  `}>
                                        <p className="text-sm">{message.content}</p>
                                        <span className="text-xs opacity-70 mt-1 block">
                                            {/* {message.timestamp.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })} */}
                                            Placeholder
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-2"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="bg-muted rounded-2xl p-3">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
                        <form
                            // onSubmit={(e) => {
                            //     e.preventDefault();
                            //     handleSend();
                            // }}
                            onSubmit={handleSubmit}
                            className="flex gap-2"
                        >
                            <Input
                                value={input}
                                // onChange={(e) => setInput(e.target.value)}
                                onChange={handleInputChange}
                                placeholder="Ask anything about the audit process..."
                                className="flex-1"
                            />
                            <Button type="submit" size="icon">
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
