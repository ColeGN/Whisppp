import React from 'react'
import { Suspense } from 'react'
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from 'next/link'
import { ArrowLeft, Calendar} from 'lucide-react'
import markdownit from "markdown-it"
import { client } from "@/sanity/lib/client"
import { PLAYLIST_BY_SLUG_QUERY, STORIES_BY_ID_QUERY } from "@/sanity/lib/queries"
import { formatDate } from '@/lib/utils'
import View from '@/app/components/View'
import { Skeleton } from '@/components/ui/skeleton'
import StoriesCard, { StoriesTypeCard } from '@/app/components/StoriesCard'

const md = markdownit()

export const revalidate = 3600 // Revalidate every hour

async function getStory(id: string) {
  return await client.fetch(STORIES_BY_ID_QUERY, { id })
}

async function getEditorPicks() {
  const result = await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks-new' })
  return result?.select || []
}

export default async function Page({ params }: { params: { id: string } }) {
  const [post, editorPicks] = await Promise.all([
    getStory(params.id),
    getEditorPicks()
  ])

  if (!post) {
    notFound()
  }

  const parsedContent = md.render(post?.pitch || "")

  return (
    <>
      <section className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-white hover:underline mb-4">
            <ArrowLeft className="mr-2" /> Back to Stories
          </Link>
          <p className="text-sm font-medium mb-2">
            <Calendar className="inline mr-2" />
            {formatDate(post._createdAt)}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl opacity-90">{post.description}</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Image
              src={post.image || '/placeholder.svg'}
              alt="Story thumbnail"
              width={800}
              height={600}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          <div className="flex items-center justify-between mb-8">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex items-center space-x-4"
            >
              <Image
                src={post.author?.image || '/default-avatar.png'}
                alt={`Avatar of ${post.author?.name || 'Author'}`}
                width={64}
                height={64}
                className="rounded-full shadow-md"
              />
              <div>
                <p className="text-xl font-semibold">{post.author?.name || 'Anonymous'}</p>
                <p className="text-gray-600">@{post.author?.username || 'anonymous'}</p>
              </div>
            </Link>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">{post.category}</span>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-4">Pitch Details</h3>
            {parsedContent ? (
              <article
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="text-gray-600 italic">No details provided</p>
            )}
          </div>

          <hr className="my-12 border-t border-gray-200" />

          {editorPicks.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Editor Picks</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {editorPicks.map((post: StoriesTypeCard, i: number) => (
                  <StoriesCard key={i} post={post} />
                ))}
              </div>
            </div>
          )}

          <Suspense fallback={<Skeleton className="h-10 w-full mt-8" />}>
            <View id={params.id} />
          </Suspense>
        </div>
      </section>
    </>
  )
}