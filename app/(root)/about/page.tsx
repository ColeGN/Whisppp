'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MessageSquare, Feather, Globe } from 'lucide-react'
import Image from 'next/image'

export default function Component() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true })
  const mainControls = useAnimation()

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', mouseMove)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible')
    }
  }, [isInView, mainControls])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-white overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-blue-200 rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              transition: { duration: 10, repeat: Infinity, repeatType: 'reverse' },
            }}
          />
        ))}
      </motion.div>

      <main className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome to Whispp
        </motion.h1>

        <motion.div
          ref={cardRef}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-12 shadow-2xl"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${mousePosition.x / 50}deg) rotateX(${-mousePosition.y / 50}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              className="w-48 h-48 rounded-full overflow-hidden"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="https://b.fssta.com/uploads/application/soccer/headshots/78918.png"
                alt="Cole Palmer"
                width={192}
                height={192}
                className="object-cover"
              />
            </motion.div>
            <div>
              <motion.h2
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Meet the Creator: Cole Palmer
              </motion.h2>
              <motion.p
                className="text-lg mb-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Visionary. Innovator. Champion of free expression. Cole Palmer is redefining social media with Whispp.
              </motion.p>
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button variant="outline" className="mr-4 border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-blue-900">
                  Learn More
                </Button>
                <Button className="bg-blue-400 text-blue-900 hover:bg-blue-300">Contact Cole</Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.section
          className="mb-12"
          initial="hidden"
          animate={mainControls}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25 } },
          }}
        >
          <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
          <p className="text-xl">
            To create a platform where freedom of expression thrives, empowering individuals to share their thoughts,
            ideas, and creativity without boundaries.
          </p>
        </motion.section>

        <motion.section
          className="mb-12"
          initial="hidden"
          animate={mainControls}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
          }}
        >
          <h3 className="text-3xl font-bold mb-4">Why Whispp?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-blue-800/50 p-6 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <MessageSquare className="w-12 h-12 mb-4 text-blue-300" />
              <h4 className="text-xl font-semibold mb-2">Unrestricted Expression</h4>
              <p>Post whatever you want, whenever you want. Your voice, your rules.</p>
            </motion.div>
            <motion.div
              className="bg-blue-800/50 p-6 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Feather className="w-12 h-12 mb-4 text-blue-300" />
              <h4 className="text-xl font-semibold mb-2">Creative Freedom</h4>
              <p>Let your imagination run wild. No content restrictions, just pure creativity.</p>
            </motion.div>
            <motion.div
              className="bg-blue-800/50 p-6 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <Globe className="w-12 h-12 mb-4 text-blue-300" />
              <h4 className="text-xl font-semibold mb-2">Global Community</h4>
              <p>Connect with like-minded individuals from around the world who value free expression.</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <h3 className="text-4xl font-bold mb-4">Join the Whispp Revolution</h3>
          <p className="text-xl mb-8">Be part of a platform that celebrates your unique voice. Express yourself freely on Whispp.</p>
          <Button size="lg" className="animate-pulse bg-blue-400 text-blue-900 hover:bg-blue-300">
            Get Started Now
          </Button>
        </motion.div>
      </main>
    </div>
  )
}