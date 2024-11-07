// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from 'js-cookie';
import { Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }

    Cookies.set('username', username, { expires: 7 });
    router.push('/');
    router.refresh();
  };

  return (
    <div className="h-[65dvh] flex flex-col bg-background">
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className="mb-6 flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-semibold">Energy Masters</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-2">
          <Input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => {
              setError('');
              setUsername(e.target.value);
            }}
            className="h-11"
            autoComplete="off"
            autoCapitalize="words"
            autoFocus
          />
          {error && (
            <motion.p 
              className="text-sm text-destructive px-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
          <Button type="submit" className="w-full h-11">
            Continue
          </Button>
        </form>
      </motion.div>

      {/* Footer */}
      <div className="text-center p-4 text-sm text-muted-foreground">
        v1.0.0
      </div>
    </div>
  );
}