import BlogComponent from "./BlogComp"

const blogPosts = [
  {
    id: '1',
    title: 'The Future of AI in Journalism',
    type: 'text',
    content: 'Artificial Intelligence is revolutionizing the way we consume and produce news...',
    excerpt: 'AI is changing journalism. Here\'s how...',
    author: {
      name: 'Alex Johnson',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    date: '2023-06-01',
    color: '#ff6b6b'
  },
  {
    id: '2',
    title: 'Breaking: Global Climate Summit Highlights',
    type: 'youtube',
    content: '',
    youtubeId: 'dQw4w9WgXcQ',
    author: {
      name: 'Sarah Lee',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    date: '2023-06-02',
    color: '#4ecdc4'
  },
  {
    id: '3',
    title: 'Tech Giants Face New Regulations',
    type: 'text',
    content: 'In a landmark decision, world leaders have agreed on a new framework...',
    excerpt: 'New global tech regulations are coming...',
    author: {
      name: 'Mike Brown',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    date: '2023-06-03',
    color: '#45aaf2'
  },
  // ... more posts
]

export default function BlogPage() {
  return <BlogComponent posts={blogPosts} />
}
}