'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UserIcon, Youtube } from 'lucide-react'

type BlogPost = {
  id: string
  title: string
  type: 'text' | 'youtube'
  content: string
  excerpt?: string
  youtubeId?: string
  author: {
    name: string
    avatar: string
  }
  date: string
  color: string
}

const BlogPost = ({ post, isExpanded, onToggle }: { post: BlogPost; isExpanded: boolean; onToggle: () => void }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden relative group hover:shadow-lg transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
          </CardHeader>
          <CardContent>
            {post.type === 'youtube' && post.youtubeId ? (
              <div className="aspect-video mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${post.youtubeId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            ) : (
              <motion.div
                initial={false}
                animate={{ height: isExpanded ? 'auto' : '3em' }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p>{post.content}</p>
              </motion.div>
            )}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback><UserIcon className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{post.author.name}</span>
              </div>
              <Button onClick={onToggle} variant="outline" className="group">
                {post.type === 'youtube' ? <Youtube className="mr-2 h-4 w-4" /> : null}
                <span className="relative overflow-hidden">
                  <motion.span
                    initial={false}
                    animate={{ y: isExpanded ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    Read More
                  </motion.span>
                  <motion.span
                    initial={false}
                    animate={{ y: isExpanded ? '0%' : '-100%' }}
                    transition={{ duration: 0.3 }}
                    className="inline-block absolute left-0"
                  >
                    Read Less
                  </motion.span>
                </span>
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}

export default function BlogComponent({ posts = [] }: { posts?: BlogPost[] }) {
  const [expandedPost, setExpandedPost] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedPost(expandedPost === id ? null : id)
  }

  return (
    <div className="container mx-auto py-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Amazing Blog
      </motion.h1>
      <motion.div 
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <AnimatePresence>
          {posts.map((post) => (
            <BlogPost
              key={post.id}
              post={post}
              isExpanded={expandedPost === post.id}
              onToggle={() => toggleExpand(post.id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

