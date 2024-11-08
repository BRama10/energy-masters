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
    X,
    Mic,
    MicOff
} from 'lucide-react';

import { useChat } from 'ai/react';

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
    const { messages, input, handleSubmit, handleInputChange, isLoading } = useChat();
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleMicrophoneClick = () => {
        setIsListening(!isListening);
        // Placeholder for actual STT implementation
        if (!isListening) {
            // Simulate recording starting
            console.log('Started listening...');
            // After 3 seconds, simulate getting some text
            setTimeout(() => {
                const simulatedText = 'This is a simulated speech-to-text result.';
                handleInputChange({ target: { value: simulatedText } } as React.ChangeEvent<HTMLInputElement>);
                setIsListening(false);
            }, 3000);
        } else {
            // Simulate stopping the recording
            console.log('Stopped listening');
        }
    };

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
                                    className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
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
                                        <Markdown 
                                            className="text-sm" 
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                p: ({ children, ...props }) => <p className="mb-4 last:mb-0" {...props}>{children}</p>,
                                                br: ({ ...props }) => <br {...props} />,
                                                ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
                                                li: ({ children }) => <li className="mb-2">{children}</li>,
                                                h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
                                                h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
                                                h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
                                                blockquote: ({ children }) => (
                                                    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
                                                ),
                                            }}
                                        >
                                            {message.content}
                                        </Markdown>
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
                            onSubmit={handleSubmit}
                            className="flex gap-2"
                        >
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Ask anything about the audit process..."
                                className="flex-1"
                            />
                            <Button 
                                type="button"
                                size="icon"
                                variant={isListening ? "destructive" : "secondary"}
                                onClick={handleMicrophoneClick}
                            >
                                {isListening ? (
                                    <MicOff className="w-4 h-4" />
                                ) : (
                                    <Mic className="w-4 h-4" />
                                )}
                            </Button>
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

export default AIChatInterface;