'use client'

import React from 'react'
import { EyeIcon, ArrowUpRight } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate, cn } from '@/lib/utils'
import { Author, Stories } from '@/sanity/types'

export type StoriesTypeCard = Omit<Stories, 'author'> & { author?: Author }

const StoriesCard = ({ post }: { post: StoriesTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post

  return (
    <motion.li
      className="group relative overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
      
      <Image
        src={image || '/placeholder.svg'}
        alt={title || 'Untitled'}
        width={400}
        height={250}
        className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
          >
            {category}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center bg-red-600 gap-2 bg-background/80 text-foreground px-3 py-1 rounded-full"
          >
            <EyeIcon className="w-4 h-4" />
            <span className="text-sm font-medium ">{views}</span>
          </motion.div>
        </div>

        <div className="space-y-2">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white line-clamp-2"
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-200 line-clamp-2"
          >
            {description}
          </motion.p>
        </div>

        <div className="flex justify-between items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2"
          >
            <Image
              src={author?.image || '/default-avatar.png'}
              alt={author?.name || 'Author'}
              width={40}
              height={40}
              className="rounded-full border-2 border-white"
            />
            <div>
              <p className="text-sm font-medium text-white">{author?.name}</p>
              <p className="text-xs text-gray-300">{formatDate(_createdAt)}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              asChild
              variant="secondary"
              className="rounded-full group"
            >
              <Link href={`/stories/${_id}`}>
                Read More
                <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.li>
  )
}

export const StoriesCardSkeleton = () => (
  <>
    {[0, 1, 2].map((index: number) => (
      <motion.li
        key={cn("skeleton", index)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative overflow-hidden rounded-2xl bg-card shadow-lg"
      >
        <Skeleton className="w-full h-[250px]" />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
            </div>
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
        </div>
      </motion.li>
    ))}
  </>
)

export default StoriesCard