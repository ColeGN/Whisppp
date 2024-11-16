'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Twitter, Linkedin, ChevronUp } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"


const socialIcons = [
  { Icon: Github, href: 'https://github.com/ColeGN', label: 'GitHub' },
  { Icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/gantogtokh-nyamrentsen-1a52ba2b9/', label: 'LinkedIn' },
]

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted feedback:', { email, feedback })
    toast({
      title: "Feedback Received!",
      description: "Thank you for your valuable feedback.",
    })
    setEmail('')
    setFeedback('')
  }

  return (
    <motion.footer 
      className="bg-gradient-to-b from-background to-secondary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.button
          className="w-full flex justify-center items-center py-2 text-primary"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                <div className="space-y-4">
                  <motion.h2 
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Whispp
                  </motion.h2>
                  <motion.p 
                    className="text-muted-foreground"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Empowering ideas through innovative code.
                  </motion.p>
                </div>

                <div className="space-y-4">
                  <motion.h3 
                    className="text-xl font-semibold"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Connect
                  </motion.h3>
                  <motion.div 
                    className="flex space-x-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {socialIcons.map(({ Icon, href, label }, index) => (
                      <motion.a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-primary hover:text-primary/80 transition-colors"
                        aria-label={label}
                      >
                        <Icon size={24} />
                      </motion.a>
                    ))}
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <motion.h3 
                    className="text-xl font-semibold"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Give us feedback
                  </motion.h3>
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Input 
                      type="email" 
                      placeholder="Your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Textarea 
                      placeholder="Your feedback" 
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">
                      Send Feedback
                    </Button>
                  </motion.form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="pt-8 mt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>&copy; {new Date().getFullYear()} Whispp. All rights reserved.</p>
          <p>Crafted with passion by You</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}