'use client'

import { supabase } from '@/supabase/supabase'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  created_at: string
  title: string
  content: string
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchData = async () => {
    const { data: posts, error } = await supabase.from('posts').select('*')
    setPosts((posts as Post[]) ?? [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            {post.id} / {post.title}
          </Link>
        </li>
      ))}
      <Link href="/posts/new">글쓰기</Link>
    </ul>
  )
}
